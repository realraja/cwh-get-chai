"use client"
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

const page = () => {
    const { data: session } = useSession()
    if(!session) {
      const router = useRouter();
      router.push('/login');
    }
  return (
    <div>
      <h1>dashbord</h1>
    </div>
  )
}

export default page
