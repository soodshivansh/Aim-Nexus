"use client"
import Navbar from '@/components/Navbar'
import { useAppContext } from '@/contexts/Provider'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const AddDesign = () => {
  const [imagePreview, setImagePreview] = useState("")
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { createdesign, storepic, getloggedinuser } = useAppContext()
  const router = useRouter()

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      setImagePreview(fileReader.result)
    }

    fileReader.readAsDataURL(file);
  }
  
  const publish = async () => { 
    if (!title || !description || !imagePreview) {
      alert("All fields are mandatory")
      return;
    }
    setLoading(true)
    
    // Store design pic and get its id
    let fileToSave = document.getElementById("designpic").files[0];
    let id = await storepic(fileToSave)
    
    // Store the design document in design collection
    let user = await getloggedinuser()
    let userId = user.$id
    await createdesign(id, title, description, userId)

    setLoading(false)
    router.push("/dashboard")
  }

  return (
    <div className='min-h-screen bg-[#101010] text-white p-10 space-y-10'>
      <Navbar />
      
      <div className='flex justify-between w-full px-10'>
        <Link href="/dashboard">
          <button className='bg-[#4f4f4f] rounded-full px-8 py-2'>Cancel</button>
        </Link>
        <button className='bg-[#4f4f4f] rounded-full px-8 py-2' onClick={publish}>
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>

      <div className='w-full flex flex-col space-y-8'>
        <div className='relative w-full border border-dashed border-gray-200 rounded-lg h-96 flex flex-col justify-center items-center '>
          {imagePreview && (
            <img src={imagePreview} className='w-full h-full object-cover' />
          )} 
          {!imagePreview && (
            <>
              <img src='assets/image 2.png' alt='imagelogo' className='h-32' />
              <span className='mt-6 text-sm text-gray-300'>Upload photo of your design here</span>
            </>
          )}
          <input type='file' className='opacity-0 w-full h-full absolute' onChange={handleFileChange} id='designpic' />
        </div>
          {imagePreview && (
            <span className='text-right text-[#2fbeff] cursor-pointer' onClick={() => setImagePreview("")}>Clear</span>
            )}

        <div className='flex flex-col space-y-4'>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type='text' className='border bg-transparent border-gray-600 rounded p-2' placeholder='Enter title for you design' />
        </div>

        <div className='flex flex-col space-y-4'>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} type='text' className='border bg-transparent border-gray-600 rounded p-2' placeholder='Enter description' rows="5" />
        </div>
      </div>
    </div>
  )
}

export default AddDesign
