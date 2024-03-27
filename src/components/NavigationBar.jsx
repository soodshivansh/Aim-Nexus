import Link from 'next/link'
import React from 'react'

export default function NavigationBar() {
  return (
    <div className='flex justify-between items-center w-full'>
        <Link href="/"><div className='flex space-x-4 items-center max-h-10'>
            <img className='w-10 filter brightness-0 invert' src='/assets/logo.svg' alt='logo' />
            <span className='font-semibold'>Dribble</span>
        </div></Link>
        <div className='flex space-x-10 items-center'>
            <Link href="/signup"><button className='cursor-pointer'>Sign up</button></Link>
            <Link href="/login"><button className='bg-[#444444] px-10 py-2 cursor-pointer rounded-full'>Log in</button></Link>
        </div>
    </div>
  )
}
