"use client"
import DesignComponent from '@/components/DesignComponent';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import React, { useState } from 'react'

const Dashboard = () => {

  const [activenav,setactivenav] = useState(1);

  return (
    <div className='flex flex-col w-full p-8 bg-[#101010] text-white min-h-screen'>
        
        <Navbar />
        
        <div className='mt-10 flex w-full justify-between'>
          <div className='flex space-x-10'>
            <span className={"border-blue-400 pb-3 cursor-pointer ease-in-out " + (activenav === 1 ? "border-b":"")} onClick={() => setactivenav(1)}>New Designs</span>
            <span className={"border-blue-400 pb-3 cursor-pointer ease-in-out " + (activenav === 2 ? "border-b":"")} onClick={() => setactivenav(2)}>Your Designs</span>
          </div>
          <div>
            <Link href="/add-new-design"><button className="rounded-full px-10 py-2 bg-[#1A67DC]">Add Design</button></Link>
          </div>
        </div>

        <DesignComponent />
    </div>
  )
}

export default Dashboard
