"use client"
import React, {createContext, useContext} from 'react'
import { ID, Client, Account, Databases, Storage } from 'appwrite'
import { useRouter } from 'next/navigation'

const AppContext = createContext(null)

const Provider = ({children}) => {

    const router = useRouter();

    // initialize appwrite sdk
    const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // your api endpoint
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID) // your project id

    const account = new Account(client)
    const database = new Databases(client)
    const storage = new Storage(client)

    // login
    const login = async(email, password) => {
        try{
            const response = await account.createEmailPasswordSession(
                email,password
            );
            alert("You are logged in successfully");
            router.push("/dashboard")
        }catch(err){
            alert(err)
        }
    }

    // signup
    const signup = async(name, email, password) => {
        try{
            const response  = await account.create(ID.unique(), email,password,name)
            let id = response.$id
            await createuser(id,name,email)
            alert("Your account was created successfully")
            router.push("/login")
        }
        catch(err){
            alert(err)
        }
    }

    // create user document
    const createuser = async(id, fullname, email, bio = "", profilepic = "") => {
        try{
            const response = await database.createDocument(
                process.env.NEXT_PUBLIC_DATABASE_ID,
                process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
                id,
                {
                    name: fullname,
                    bio: bio,
                    profilepic: profilepic,
                    email: email 
                }
                )
        }catch(err){
            alert(err)
        }
    }

    const getloggedinuser = async() => {
        try{
            const user = await account.get()
            return user
        }catch(err){
            return null
        }
    }

    const getuserdetails = async(id) => {
        try{
            // try to fetch user details from users collection
            const user = await database.getDocument(
                process.env.NEXT_PUBLIC_DATABASE_ID,
                process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
                id
            )
            return user
        }catch(err){
            alert(err)
        }
    }

    // store profile picture file in appwrite bucket 
    const storepic = async(file) => {
        try{
            const response = await storage.createFile(
                process.env.NEXT_PUBLIC_BUCKET_ID,
                ID.unique(),
                file
            )
            return response.$id
        }
        catch(err){
            alert(err)
        }
    }

    //store records in user collection
    const updateuser = async(id, name, email, bio, profilepic) => {
        try{
          await database.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID,process.env.NEXT_PUBLIC_USER_COLLECTION_ID, id, {
            name: name,
            bio: bio,
            profilepic: profilepic,
            email: email 
         })  
        }catch(err){
            alert("ddd")
        }
    }

    // get profile preview
    const getpicpreview = async(fileId) => {
        try{
            const response = await storage.getFilePreview(process.env.NEXT_PUBLIC_BUCKET_ID, fileId)
            return response.href
        }catch(err){
            alert(err)
        }
    }

    // store design in design collection
    const createdesign = async(pictureid, title, description, userid) => {
        try{
            const response = await database.createDocument(
                process.env.NEXT_PUBLIC_DATABASE_ID,
                process.env.NEXT_PUBLIC_DESIGN_COLLECTION_ID,
                ID.unique(),
                {
                    designpic: pictureid,
                    title: title,
                    description: description,
                    userid: userid
                }
            )
        }catch(err){
            alert(err)
        }
    }

    const exposedvalues = {
        signup,
        login,
        getloggedinuser,
        getuserdetails,
        storepic,
        updateuser,
        getpicpreview,
        createdesign,
    }

  return (
        <AppContext.Provider value={exposedvalues}>{children}</AppContext.Provider>
  )
}

export default Provider

export const useAppContext = () => useContext(AppContext)