import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    },
    items:[{
        product:{
            type:mongoose.Types.ObjectId,
            ref:"products",
            required:true
        },
        quantity:{
            type:Number,
        },
        price:{
            type:Number,
        }
    }],
    totalPrice:{
        type:Number,
        required:true
    }
})


export const cartModel = mongoose.model("carts", cartSchema)