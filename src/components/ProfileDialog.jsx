import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"  
import {Pencil} from "lucide-react"
import { useAppContext } from '@/contexts/Provider'

const ProfileDialog = ({profileimage, setprofileimage, UserDetails, userId, getCurrUser}) => {
  
    const [imagePreview,setimagePreview] = useState("")
    const [Loading,setLoading] = useState(false)
    const {storepic, updateuser, getpicpreview} = useAppContext()
    const [name,setname] = useState(UserDetails?.name)
    const [email,setemail] = useState(UserDetails?.email)
    const [bio,setbio] = useState(UserDetails?.bio)

    useEffect(() => {
      if(setprofileimage){
        setname(UserDetails?.name)
        setemail(UserDetails?.email)
        setbio(UserDetails?.bio)
        if(UserDetails?.profilepic){
          handleimagepreview(UserDetails?.profilepic)
        }
      }else{
        setname("")
        setemail("")
        setbio("")
      }
    },[profileimage])

    const handleimagepreview = async(fileId) => {
      const url = await getpicpreview(fileId)
      setimagePreview(url)
    }

    const handlefilechange = (e) => {
        const file = e.target.files[0];
        
        const fileReader = new FileReader();
    
        fileReader.onloadend = () => {
          setimagePreview(fileReader.result)
        }
    
        fileReader.readAsDataURL(file);
      }

    const handlesaveprofile = async() => {
      if(!name){
        alert("Name is mandatory")
        return;
      }
      setLoading(true);
      let profilepicfile = document.getElementById("profilepicid").files[0]
      let profileid = UserDetails?.profilepic ?? "";
      if(profilepicfile){
        profileid = await storepic(profilepicfile)
      }
      await updateuser(userId, name, email, bio, profileid)
      setLoading(false);
      await getCurrUser()
      setprofileimage(false)
    }
    
    return (
    <Dialog open = {profileimage} onOpenChange={setprofileimage}>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
                Modify below fileds to update your profile
            </DialogDescription>
            <div className='flex flex-col space-x-6 mx-auto my-10 items-center'>
            <div className='w-32 hover:bg-gray-500 border bg-gray-200 h-32 rounded-full mt-5 flex justify-center items-center relative'>
                <input type='file' className='opacity-0 absolute left-0 top-0 h-full w-full'
                 onChange={handlefilechange} id='profilepicid'/>
                <Pencil />
                {imagePreview ? <img src={imagePreview} className='w-full h-full object-cover object-center rounded-full' /> : <></>}
            </div>
            <div className='flex flex-col space-y-3 w-full grow mt-5'>
                <label className='text-xs font-bold'>Name</label>
                <input className='border p-2 rounded' type='text' onChange={(e) => setname(e.target.value)} value={name} />
                <input className='border p-2 rounded' disabled type='text' value={email} />
                <textarea className='border p-2 rounded' onChange={(e) => setbio(e.target.value)} value={bio}></textarea>
                <button className='bg-gray-900 p-2 text-white' onClick={handlesaveprofile}>{Loading ? "Saving...":"Save"}</button>
            </div>
        </div> 
        </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default ProfileDialog
