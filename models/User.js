import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {type : String},
    email: {type : String, required: true},
    username: {type : String, required: true},
    profilePic: {type : String},
    razorPayId: {type : String},
    razorPaySecret: {type : String},
    updatedAt: {type : Date, default: Date.now},
    createdAt: {type : Date, default: Date.now},
    date:[],
})

export default mongoose.models.User || model("User", UserSchema );