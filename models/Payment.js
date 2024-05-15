import mongoose from "mongoose";

const {Schema,model} = mongoose;

const PaymentSchema = new Schema({
    name: {type: String, required: true},
    toUser : {type: String, required: true},
    oId : {type: String, required: true},
    message : {type : String},
    amount: {type: Number, required: true},
    done: {type: Boolean , default: false},
    updatedAt: {type: Date, default: Date.now},
    createdAt: {type: Date, default: Date.now},
    date:[],
})

export default mongoose.models.Payment ||  model("Payment",PaymentSchema);