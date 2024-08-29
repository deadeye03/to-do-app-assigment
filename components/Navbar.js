import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
function Navbar() {
  return (
    <Link href={process.env.NEXT_PUBLIC_API_URL} className='w-full bg-slate-100 bg-opacity-30  flex  items-center gap-2'>
      <Image className='ml-12 sm:ml-4'  src="/img/to-do-logos.png" height={50} width={50} priority alt="logo"></Image>
      <span className='text-black font-bold text-3xl'>TODO</span>
    </Link>
  )
}

export default Navbar
