"use client"
import Navbar from '@/components/Navbar'
import ProfileDialog from '@/components/ProfileDialog'
import { useAppContext } from '@/contexts/Provider'
import React, { useEffect, useState } from 'react'

const UsersPage = () => {

    const {getloggedinuser, getuserdetails, getpicpreview} = useAppContext()
    const [UserDetails,setUserDetails] = useState({})
    const [profileimage,setprofileimage] = useState(false);
    const [UserId,setUserId] = useState("")
    const [imagePreview,setimagePreview] = useState("")

    useEffect(() => {
        getcurruser()
    },[])

    const getcurruser = async() => {
        let user = await getloggedinuser()
        let userid = user.$id
        setUserId(userid)
        // get user info from appwrite
        let userdetails = await getuserdetails(userid)
        setUserDetails({...userdetails})
        if(userdetails?.profilepic){
            handleimagepreview(userdetails?.profilepic)
        }
    }

    const handleimagepreview = async(fileId) => {
        const url = await getpicpreview(fileId)
        setimagePreview(url)
      }

  return (
    <div className='flex flex-col w-full p-8 bg-[#101010] text-white min-h-screen'>
        <Navbar />

        <div className='flex space-x-6 mx-auto my-28 items-center'>
            <div className='w-32 h-32 rounded-full bg-white'>
                {imagePreview ? <img src={imagePreview} className='w-full h-full object-cover object-center rounded-full' /> : <></>}
            </div>
            <div className='flex flex-col space-y-3'>
                <h2>{UserDetails?.name}</h2>
                <span className='text-gray-400 text-sm'>{UserDetails?.email}</span>
                <p className='text-gray-400'>{UserDetails?.bio}</p>
                <span className='text-sm cursor-pointer' onClick={() => setprofileimage(true)}>Edit Profile</span>
            </div>
        </div>  
        <div className='flex flex-col space-y-3 mx-32'>
            <h1 className='text-md font-semibold'>Work</h1>
            <div className='flex'>
                <span className='text-sm'>no designs yet</span>
            </div>
        </div>

        <ProfileDialog profileimage={profileimage} setprofileimage={setprofileimage} UserDetails = {UserDetails} userId = {UserId} getCurrUser = {getcurruser}  />
    </div>
  )
}

export default UsersPage