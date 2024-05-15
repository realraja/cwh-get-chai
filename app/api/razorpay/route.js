import Payment from "@/models/Payment";
import connectDB from "../auth/[...nextauth]/db/connectDB"
import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import User from "@/models/User";


export const POST = async(req)=>{
    await connectDB();
    let data = await req.formData();
    data = Object.fromEntries(data);
    // console.log(data,'rajesh--->',data.razorpay_order_id);
    
    let p = await Payment.findOne({oId: data.razorpay_order_id});
    if(!p){
        return NextResponse.json({succes:false, message:'Order Id not found'});
    }

    let user = await User.findOne({username:p.toUser})
    //Verify payment
    let verified = validatePaymentVerification({"order_id": data.razorpay_order_id,
    "payment_id": data.razorpay_payment_id},data.razorpay_signature,user.razorPaySecret);

    if(verified){
        const updatePayment = await Payment.findOneAndUpdate({oId: data.razorpay_order_id},{done: true},{new:true});
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/${updatePayment.toUser}?payment_done=true`);
    }
    else{
        return NextResponse.json({succes:false,message: 'payment verification failed'});
    }
}