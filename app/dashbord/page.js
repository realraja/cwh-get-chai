"use client"
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { PulseLoader  } from 'react-spinners';
import { getProfile, updateProfile } from "../api/actions/useractions";
import { toast } from "react-toastify";

const Page = () => {
  const [form, setForm] = useState({});
  const [oldForm, setOldForm] = useState({});
  const [loading, setLoading] = useState(false);
    const { data: session } = useSession()
    const router = useRouter();
    
    useEffect(()=>{
      const getData = async() =>{
        let data = await getProfile(session.user.name);
        setForm(data);
        setOldForm(data);
        // console.log(form);
      }
      document.title = "Dashbord - Get me Notes"
      if(!session) {
        router.push('/login');
      }
      else{
        getData();
      }
      
    },[router,session])
   

    const handleSubmit = async(e) => {
      setLoading(true);
      // console.log(e,form);
      const a = await updateProfile(e,session.user.name);
      
    toast.success('Data Updated Successfully');
      setLoading(false);
      // console.log(a);
  }

  
  return (
    <div className="flex flex-col items-center justify-center p-5 gap-5">
        <h1 className="text-3xl text-center font-bold">Welcome to our dashbord</h1>

        <form className="w-[80%] md:w-[40%] flex flex-col" action={handleSubmit}>
          
        <label>Name</label>
        <input type="text" value={form.name?form.name:''} name="name" onChange={(e)=> setForm({...form,[e.target.name]:e.target.value})} className="bg-gray-700 px-1.5 py-0.5 rounded focus:outline-none mb-3"  />
        <label>Email</label>
        <input type="text" value={session?.user.email} onChange={(e)=> setForm({...form,[e.target.name]:e.target.value})} name="email" className="bg-gray-700 px-1.5 py-0.5 rounded focus:outline-none mb-3"  />
        <label>Username</label>
        <input type="text" value={form.username?form.username.trim():''} name="username" onChange={(e)=> setForm({...form,[e.target.name]:e.target.value})} className="bg-gray-700 px-1.5 py-0.5 rounded focus:outline-none mb-3"  />
        <label>Profile Picture</label>
        <input type="text" value={form.profilePic?form.profilePic:''} name="profilePic" onChange={(e)=> setForm({...form,[e.target.name]:e.target.value})} className="bg-gray-700 px-1.5 py-0.5 rounded focus:outline-none mb-3"  />
        <label>RozerPay Id</label>
        <input type="text" value={form.razorPayId?form.razorPayId:''} name="razorPayId" onChange={(e)=> setForm({...form,[e.target.name]:e.target.value})} className="bg-gray-700 px-1.5 py-0.5 rounded focus:outline-none mb-3"  />
        <label>RozerPay Secret</label>
        <input type="text" value={form.razorPaySecret?form.razorPaySecret:''} name="razorPaySecret" onChange={(e)=> setForm({...form,[e.target.name]:e.target.value})} className="bg-gray-700 px-1.5 py-0.5 rounded focus:outline-none mb-3"  />

        

        <button disabled={form.username?.length<5 || !form.name || oldForm == form}  type="submit" className="disabled:opacity-50 disabled text-white bg-gradient-to-br from-purple-800 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2 my-2 text-center ">{loading?<PulseLoader size={12} color="#51f919" />:'Save'}</button>
        </form>

    </div>
  )
}

export default Page
