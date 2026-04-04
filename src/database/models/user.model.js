import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    isVerify:{
        type:Boolean,
        required:true,
        default:false
    },
    isDeleted:{
        type:Boolean,
        required:true,
        default:false
    },
    deletedAt:{
        type:Date,
    },
    role:{
        type:String,
        enum:["admin", "stuff","user"],
        default:"user"
    },
    avatar:{
        type:String
    }
},{
    timestamps:true
})

export const userModel = mongoose.model("uses", userSchema)