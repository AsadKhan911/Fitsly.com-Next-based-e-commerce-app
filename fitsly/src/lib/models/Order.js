import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId : {
        type: String,
        require: true
    },
    products : [
        {
            productId : {type:String},
            quantity : {type:Number , default: 1}
        }
    ],
    address: {type:String , require:true},
    amount : {type:String , require:true},
    status: {type:String , default:'Pending' , require:true}
} , {timestamps: true})

export default mongoose.model("Order" , OrderSchema)