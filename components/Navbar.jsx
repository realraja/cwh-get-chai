"use client"
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [dropdown,setDropdown] = useState(false);
  const { data: session } = useSession()
  // if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }

  return (
    <nav className="min-h-[7vh] bg-gray-900 px-2 text-white flex justify-between items-center">
      <Link href={'/'} className="flex items-center justify-center gap-2 mx-2 cursor-pointer">
        <span><Image width={10} height={10}  className="h-10 w-auto" src="/writing-cat.gif" alt="logo" /></span>
        <p className="text-2xl font-bold">Get Your Notes</p>
      </Link>

      <div className="flex items-center gap-5 mx-2 relative">
      {/* <Link href={'/'}><button type="button" className="font-bold">Home</button></Link>
      <button type="button" className="font-bold">Projects</button>
      <button type="button" className="font-bold">About Us</button> */}

      {session && <>
      
<button onClick={()=> setDropdown(!dropdown)} onBlur={()=> setTimeout(() => {setDropdown(false)}, 250)} id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-800" type="button">Welcome {session.user.email} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

{/* <!-- Dropdown menu --> */}
<div id="dropdownInformation"  className={`z-10 ${dropdown?'': 'hidden'} absolute top-16 sm:top-12 left-6  sm:left-20 divide-y  rounded-lg shadow w-44 bg-gray-700 divide-gray-600`}>
    <div className="px-4 py-3 text-sm  text-white">
      <div>Username:</div>
      <div className="font-medium truncate">{session.user.email}</div>
    </div>
    <ul className="py-2 text-sm  text-gray-200" aria-labelledby="dropdownInformationButton">
      <li>
        <Link href="/dashbord" className="block px-4 py-2  hover:bg-gray-600 hover:text-white">Dashboard</Link>
      </li>
      <li>
        <Link href={`${session.user.name}`} className="block px-4 py-2  hover:bg-gray-600 hover:text-white">Profile</Link>
      </li>
      <li>
        <Link href="/about" className="block px-4 py-2  hover:bg-gray-600 hover:text-white">About Us</Link>
      </li>
    </ul>
    <div className="py-2">
      <button onClick={() => signOut()} className="block px-4 py-2 text-sm   hover:bg-gray-600 text-gray-200 hover:text-white">Sign out</button>
    </div>
</div>
</>}

      {!session && <Link href={'/login'}>
      <button type="button" className="text-white bg-gradient-to-br from-purple-800 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none  focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Login</button>
      </Link>}
      </div>
    </nav>
  );
};

export default Navbar;
