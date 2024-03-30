"use client"
import { useAppContext } from '@/contexts/Provider'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Navbar = () => {

    const {getloggedinuser, getuserdetails, getpicpreview} = useAppContext()
    const [imagePreview, setimagePreview] = useState("")
    const [userdetails, setuserdetails] = useState({})

    useEffect(() => {
        getcurruser()
    },[])

    const getcurruser = async() => {
        let user = await getloggedinuser()
        let userid = user.$id
        // get user info from appwrite
        let userdetails = await getuserdetails(userid)
        if(userdetails?.profilepic){
            handleimagepreview(userdetails?.profilepic)
        }
        setuserdetails(userdetails)
    }

    const handleimagepreview = async(fileId) => {
        const url = await getpicpreview(fileId)
        setimagePreview(url)
    }

  return (
      <div className='flex justify-between items-center'>
          <Link href="/dashboard"><div className='flex space-x-4 items-center max-h-10'>
              <img className='w-10 filter brightness-0 invert' src='/assets/logo.svg' alt='logo' />
              <span className='font-semibold'>Dribble</span>
          </div></Link>
          <Link href="/profile">
          <div className='cursor-pointer rounded-full w-10 h-10 flex justify-center items-center text-black text-xl font-bold bg-white'>
            {imagePreview ? <img src={imagePreview} className='w-full h-full object-cover object-center rounded-full' /> : <></>}
          </div>
          </Link>
      </div>
  )
}

export default Navbar
