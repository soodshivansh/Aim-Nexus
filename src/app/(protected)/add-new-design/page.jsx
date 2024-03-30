"use client"
import Navbar from '@/components/Navbar'
import { useAppContext } from '@/contexts/Provider'
import Link from 'next/link'
import React, { useState } from 'react'

const AddDesign = () => {

  const [imagePreview,setimagePreview] = useState("")
  const[title,settitle] = useState("");
  const[description,setdescription] = useState("");

  const {createdesign, } = useAppContext()

  const handlefilechange = (e) => {
    const file = e.target.files[0];

    console.log(file)

    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      setimagePreview(fileReader.result)
    }

    fileReader.readAsDataURL(file);
  }

  return (
    <div className='min-h-screen bg-[#101010] text-white p-10 space-y-10'>
      <Navbar />
      
      <div className='flex justify-between w-full px-10'>
        <Link href="/dashboard"><button className='bg-[#4f4f4f] rounded-full px-8 py-2'>Cancel</button></Link>
        <button className='bg-[#4f4f4f] rounded-full px-8 py-2'>Publish</button>
      </div>

      <div className='w-full flex flex-col space-y-8'>

{ imagePreview ?
        <img src={imagePreview} />
        :
        <>
        <div className='relative w-full border border-dashed border-gray-200 rounded-lg h-96 flex flex-col justify-center items-center '>
          <img src='assets/image 2.png' alt='imagelogo' className='h-32' />
          <span className='mt-6 text-sm text-gray-300'>Upload photo of your design here</span>
          <input type='file' className='opacity-0 w-full h-full absolute' onChange={handlefilechange} />
        </div>
        </>
}
        {imagePreview ? <span className='text-right text-[#2fbeff] cursor-pointer' onClick={() => setimagePreview("")}>Clear</span> : <></>}

        <div className='flex flex-col space-y-4'>
          <label>Title</label>
          <input value={title} onChange={(e) => settitle(e.target.value)} type='text' className='border bg-transparent border-gray-600 rounded p-2' placeholder='Enter title for you design' />
        </div>

        <div className='flex flex-col space-y-4'>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setdescription(e.target.value)} type='text' className='border bg-transparent border-gray-600 rounded p-2' placeholder='Enter description' rows="5" />
        </div>

      </div>


    </div>
  )
}

export default AddDesign
