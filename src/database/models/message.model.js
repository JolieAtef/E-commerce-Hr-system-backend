import mongoose from "mongoose";


const messageSchema = mongoose.Schema({
   type:{
    type:String,
    enum:['offer' , 'announcement'],
    required:true
   },
   title:{
    type:String,
    required:true
   }, 
   message:{
    type:String,
    required:true
   },
   discountCode:{
    type:String
   },
   expiresAt:{
     type:Date,
     required:true
   }
},{
    timestamps:true
})


export const messageModel = mongoose.model("messages" , messageSchema)