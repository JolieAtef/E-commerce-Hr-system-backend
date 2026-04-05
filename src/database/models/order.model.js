import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
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
    totalAmount:{
        type:Number,
        required:true
    },
    paymentMethod:{
        type:String,
        enum:['cod', 'card'],
        required:true
    },
    paymentStatus:{
        type:String,
        enum:['pending', 'paid', 'failed'],
        required:true
    },
    orderStatus:{
        type:String,
        enum:['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        required:true
    },
    shippingAddress:{
        street:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        }
    }
},{
    timestamps:true
})


export const orderModel = mongoose.model("orders", orderSchema)
