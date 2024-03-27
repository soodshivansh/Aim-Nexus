"use client"
import React, {createContext, useContext} from 'react'
import { ID, Client, Account } from 'appwrite'

const AppContext = createContext(null)

const Provider = ({children}) => {

    // initialize appwrite sdk
    const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // your api endpoint
    .setProject("6602d8918ac2e7cc2500") // your project id

    const account = new Account(client)

    // login
    const login = async(email, password) => {
        try{
            const response = await account.createEmailPasswordSession(
                email,password
            );
            alert("You are logged in successfully");
        }catch(err){
            alert(err)
        }
    }

    // signup
    const signup = async(name, email, password) => {
        try{
            const response  = await account.create(ID.unique(), email,password,name)
            alert("Your account was created successfully")
        }
        catch(err){
            alert("Something went wrong")
        }
    }

    const exposedvalues = {
        signup,
        login,
    }

  return (
        <AppContext.Provider value={exposedvalues}>{children}</AppContext.Provider>
  )
}

export default Provider

export const useAppContext = () => useContext(AppContext)