"use client"
import DesignComponent from '@/components/DesignComponent';
import Navbar from '@/components/Navbar';
import { useAppContext } from '@/contexts/Provider';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {

  const [activenav,setactivenav] = useState(1);
  const [loading,setloading] = useState(false);
  const [finalrecords,setfinalrecords] = useState([]);
  const [userrecords,setuserrecords] = useState({});

  const {fetchdesignsfromcoll, getloggedinuser, fetchusers} = useAppContext()

  useEffect(() => {
    fetchdesigns()
  },[])

  const fetchdesigns = async() => {
    setloading(true);

    const records = await fetchdesignsfromcoll()
    const finalRecords1 = records?.documents ?? []

    let userIds = new Set()

    finalRecords1.forEach((item) => {
      let userid = item?.userid
      userIds.add(userid)
    })
    console.log(userIds)
    userIds = [...userIds]

    console.log(userIds)
    createuserrecordsobject(userIds) 
    console.log(records)
    setfinalrecords(finalRecords1)
    setloading(false);
  }

  // const getuserdesigns = async() => {
  //   setloading(true);

  //   let user = await getloggedinuser()
  //   let userid = user.$id

  //   const records = await fetchdesignsfromcoll(userid)
  //   const finalRecords1 = records?.documents ?? []
 
  //   let userIds = new Set()

  //   finalRecords1.forEach((item) => {
  //     let userid = item?.userid
  //     userIds.add(userid)
  //   })
  //   userIds = [...userIds]

  //   createuserrecordsobject(userIds) 
  //   setfinalrecords(finalRecords1)
  //   setloading(false);
  // }

  const createuserrecordsobject = async(userIds) => {
    const records = await fetchusers(userIds)

    let obj = {}

    records.documents.forEach((item) => obj[item.$id] = item)
    console.log(obj)
    setuserrecords(obj)
  }

  return (
    <div className='flex flex-col w-full p-8 bg-[#101010] text-white min-h-screen'>
        
        <Navbar />
        
        <div className='mt-10 flex w-full justify-between'>
          <div className='flex space-x-10'>
            <span className={"border-blue-400 pb-3 cursor-pointer ease-in-out " + (activenav === 1 ? "border-b":"")} onClick={() => {setactivenav(1)}}>New Designs</span>
            <span className={"border-blue-400 pb-3 cursor-pointer ease-in-out " + (activenav === 2 ? "border-b":"")} onClick={() => {setactivenav(2)}}>Your Designs</span>
          </div>
          <div>
            <Link href="/add-new-design"><button className="rounded-full px-10 py-2 bg-[#1A67DC]">Add Design</button></Link>
          </div>
        </div>

        <div className='flex flex-col mt-10'>
          {loading ? "Loading..." : <DesignComponent finalrecords = {finalrecords} userrecords = {userrecords} />}
        </div>
    </div>
  )
}

export default Dashboard
