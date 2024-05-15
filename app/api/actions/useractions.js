"use server";
import User from "@/models/User";
import connectDB from "../auth/[...nextauth]/db/connectDB";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";

export const updateProfile = async (data, oldUsername) => {
  await connectDB();
  const allData = Object.fromEntries(data);

  if (allData.username !== oldUsername) {
    const checkUsername = await User.findOne({ username: allData.username });
    if (checkUsername) {
      return { error: "username already used by another user." };
    }
    await User.updateOne({ email: allData.email }, allData);
    await Payment.updateMany({toUser: oldUsername},{toUser: allData.username})
  }else{

      await User.updateOne({ email: allData.email }, allData);
  }

};

export const getProfile = async (username) => {
  await connectDB();
  const profile = await User.findOne({ username });
  const userProfile = profile?.toObject({ flettenObjectIds: true });
  return userProfile;
};

export const initiate = async (amount, to_username, name , message) => {
  await connectDB();
  let user = await User.findOne({username: to_username});
  var instance = new Razorpay({
    key_id: user.razorPayId,
    key_secret: user.razorPaySecret,
  });

//   instance.orders.create({
//     amount: 50000,
//     currency: "INR",
//     receipt: "receipt#1",
//     notes: {
//       key1: "value3",
//       key2: "value2",
//     },
//   });

  let options = {
    amount: Number.parseInt(amount),
    currency: 'INR',
  }

  let a = await instance.orders.create(options)

  await Payment.create({
    oId: a.id,
    amount: amount,
    toUser: to_username,
    name: name,
    message: message,
    date:[new Date().getSeconds(),new Date().getMinutes(),new Date().getHours(),new Date().getDate(),new Date().getMonth()+1,new Date().getFullYear()]
  });

  return a;
};

export const getAllPayments = async(username) =>{
    await connectDB();
    const payments = await Payment.find({toUser: username}).sort( { $natural: -1 } );
    return payments;
}


export const getAllUsers = async() =>{
    await connectDB();
    const users = await User.find({});
    return users;
}