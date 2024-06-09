'use client';
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { PulseLoader  } from 'react-spinners';
import Script from 'next/script';
import { getAllPayments, getProfile, initiate } from '../api/actions/useractions';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';

const Username = ({params}) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState(''); 
  const [amount, setAmount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [allPayments, setAllPayments] = useState([]);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(()=>{
    const setUserPayment = async() =>{
      const a = await getProfile(params.username);
      const b = await getAllPayments(params.username);
      setProfileData(a);
      setAllPayments(b);
      // console.log(a,b);
    }
    document.title = `Support ${params.username} - Get me Notes`;
    setUserPayment();
    if(searchParams.get('payment_done') == 'true'){
      
      toast.success('Thanks : Payment Done Successfully');
      router.push(`/${params.username}`);
    }
  },[params.username,searchParams,router]);

 

  const { data: session } = useSession()
  // if(session) {
  //   const router = useRouter();
  //   router.push('/dashbord')
  // }

 
  
  const payButton = async() => {
      
      

    try {
      setLoading(true);
      let a = await initiate(amount*100,params.username,name,message);
      let orderId = a.id;
      console.log(a);

      var options = {
        "key": profileData?.razorPayId, // Enter the Key ID generated from the Dashboard
        "amount": amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Get me notes", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": `/api/razorpay`,
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com",
            "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
      var rzp1 = new Razorpay(options);
      await rzp1.open();
      
    
      
    } catch (error) {
      
    toast.error('User Has Incorrect RazorPay Id and Secret');
      // console.log('error: ' + error)
    }
    
   
    setLoading(false);
  }
  if(!profileData){
    return notFound(); 
  }

  return (
    <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
    <div className='p-4'>      
      <div className="flex justify-center  items-center gap-10">
            <img  src={profileData?.profilePic} alt="Profile Image" className="w-32 h-32 rounded-full object-cover mb-4" />
            <div>
            <h1 className="text-2xl font-bold mb-2">{profileData?.username}</h1>
            {/* <h1 className="text-2xl font-bold mb-2">{session?.user.email.split('@')[0]}</h1> */}
            <p>{session?.user.email}</p>
            <p className='text-sm text-gray-300'>{profileData?.name} is collected ₹{allPayments?.filter((i)=> i.done).reduce((a,b)=> a+b.amount,0)/100} by {allPayments.length} payments and failed ₹{allPayments?.filter((i)=> !i.done).reduce((a,b)=> a+b.amount,0)/100}</p>
            </div>
        </div>
        <div className="h-1 my-5 bg-white opacity-10"></div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-5  my-3">
          <div className="w-[80%] sm:w-[40%] bg-gray-900 h-[50vh] overflow-auto rounded-md p-5 flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Suppoters</h1>

            {
              allPayments.map((i,v) =>{
               return i.done && <p key={v} className="flex items-center gap-4"><Image height={6} width={6}  className="rounded-full h-auto w-6 object-contain"  src="/profile.gif" alt="profile pic" /> <span className="text-green-400">₹{i.amount/100}</span> donated {`[${i.date[3]}-${i.date[4]}-${i.date[5]}]`} by {i.name} with massage:{i.message}</p>
              })
              
            }
            {
              allPayments.map((i,v) =>{ 
               return !i.done && <p key={v} className="flex items-center gap-4"><Image height={6} width={6}  className="rounded-full h-auto w-6 object-contain"  src="/profile.gif" alt="profile pic" /> <span className="text-red-400">₹{i.amount/100}</span>failed {`[${i.date[3]}-${i.date[4]}-${i.date[5]}]`} by {i.name} with massage: {i.message}</p>
              })
              
            }
             
            
          </div>
          <div className="min-w-[80%] sm:min-w-[40%] bg-gray-900 sm:min-h-[50vh] rounded-md p-5 flex flex-col gap-4">
            <h1 className="text-2xl font-bold">Make a payment</h1>
            <input value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder="Enter Name" className="w-[95%] bg-gray-700 px-2 py-1 rounded text-lg focus:outline-none" />
            <input value={message} onChange={(e)=> setMessage(e.target.value)} type="text" placeholder="Enter Message" className="w-[95%] bg-gray-700 px-2 py-1 rounded text-lg focus:outline-none" />
            <input value={amount} onChange={(e)=> setAmount(e.target.value)} type="number" placeholder="Enter Amount" className="w-[95%] bg-gray-700 px-2 py-1 rounded text-lg focus:outline-none" />
            <div className="flex gap-3 max-w-[95%] flex-wrap justify-start">
              <button onClick={()=>setAmount(100)} className="bg-gray-600 text-green-600 py-0.5 px-2 rounded-sm">₹100</button>
              <button onClick={()=>setAmount(200)} className="bg-gray-600 text-green-500 py-0.5 px-2 rounded-sm">₹200</button>
              <button onClick={()=>setAmount(500)} className="bg-gray-600 text-green-400 py-0.5 px-2 rounded-sm">₹500</button>
              <button onClick={()=>setAmount(1000)} className="bg-gray-600 text-green-300 py-0.5 px-2 rounded-sm">₹1000</button>
            </div>
            <button disabled={name.length<3 || amount<1 || amount>200000} onClick={payButton} type="button" className="disabled:opacity-50 w-[95%] disabled text-white bg-gradient-to-br from-purple-800 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2 text-center ">{loading?<PulseLoader size={12} color="#51f919" />:'Pay Now'}</button>
          </div>
        </div>

    </div></>
  )
}

export default Username
