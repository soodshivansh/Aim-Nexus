import { useAppContext } from '@/contexts/Provider'
import { HeartIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const DesignComponent = ({finalrecords, userrecords}) => {

  return (
    <div className='flex flex-col justify-center grow'>
      {finalrecords.length === 0 ? <span>No designs yet</span> : 
      <div className='w-[400px] grid grid-col-3 gap-10'>
        {finalrecords.map((item,index) => (
        <div key={index} className='flex flex-col space-y-3 w-full h-[200px]'>
          <DesignImageComponent imageId = {item["designpic"]} />
          <div className='flex justify-between'>
            <div>
              <span>{userrecords[item?.userid]?.["name"]}</span>
            </div>
            <div className='flex space-x-1'>
              <HeartIcon className='w-4' />
              <span>0</span>
            </div>
          </div>
        </div>
        ))}
      </div> }
    </div>
  )
}

const DesignImageComponent = ({imageId}) => {
  const [pic,setpic] = useState("")
  const {getpicpreview} = useAppContext()

  useEffect(() => {
    findpicurl(imageId)
  },[])

  const findpicurl = async(imageId) => {
    const url = await getpicpreview(imageId)
    setpic(url)
  }

  return <img src={pic} />
}

export default DesignComponent
