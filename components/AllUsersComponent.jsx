"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { getAllUsers } from '@/app/api/actions/useractions';


const AllUsersComponent = () => {
    const [userData, setUserData] = useState([]);
// console.log(userData);

const fetctUsers = async() =>{
    const user = await getAllUsers();
    setUserData(user);
}
    useEffect(()=>{
        fetctUsers();
    },[]);
  return (
    <>
      <div className="h-1 bg-white opacity-10"></div>
      <div className=" min-h-[50vh] flex flex-col sm:flex-row my-5 gap-3 justify-around items-center">
    {userData.map((i,j)=>{ 
        return i.name && i.profilePic &&  <div key={j} className="flex flex-col justify-center items-center bg-gray-700 py-8 px-3 rounded">
          <img  className="w-28 h-28 rounded-full object-cover bg-pink-50" src={i.profilePic} alt="coin Image" />
          <h2 className="font-bold scale-105">{i.name}</h2>
          <p className="my-3">{i.email}</p>
          <Link href={`/${i.username}`}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-800 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none  focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Pay Him
          </button>
          </Link>
        </div>
        
      
    })}
    </div>
    </>
  )
}

export default AllUsersComponent
