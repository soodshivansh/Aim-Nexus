"use client"
import Link from 'next/link';
import React, { useState } from 'react'

const Dashboard = () => {

  const [activenav,setactivenav] = useState(1);

  return (
    <div className='flex flex-col w-full p-8 bg-[#101010] text-white min-h-screen'>
        
        <div className='flex justify-between items-center'>
          <Link href="/dashboard"><div className='flex space-x-4 items-center max-h-10'>
              <img className='w-10 filter brightness-0 invert' src='/assets/logo.svg' alt='logo' />
              <span className='font-semibold'>Dribble</span>
          </div></Link>
          <div className='rounded-full w-10 h-10 flex justify-center items-center text-black text-xl font-bold bg-white'>S</div>
        </div>
        
        <div className='mt-10 flex w-full justify-between'>
          <div className='flex space-x-10'>
            <span className={"border-blue-400 pb-3 cursor-pointer ease-in-out " + (activenav === 1 ? "border-b":"")} onClick={() => setactivenav(1)}>New Designs</span>
            <span className={"border-blue-400 pb-3 cursor-pointer ease-in-out " + (activenav === 2 ? "border-b":"")} onClick={() => setactivenav(2)}>Your Designs</span>
          </div>
          <div>
            <button className="rounded-full px-10 py-2 bg-[#1A67DC]">Add Design</button>
          </div>
        </div>
    </div>
  )
}

export default Dashboard