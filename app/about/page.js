import AllUsersComponent from '@/components/AllUsersComponent'
import React from 'react'

const page = () => {
  return (
    <div className='p-2'>
        <div className="flex justify-center items-center min-h-[20vh] container">
        <h1 className="text-2xl font-bold">Our top Payment Users.</h1>
      </div>
      <AllUsersComponent />
    </div>
  )
}

export default page


export const metadata = {
    title: "About For GET NOTES",
    description: "this website for learning about development with CWH!",
  };