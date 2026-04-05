 

import mongoose, { modelNames } from "mongoose";

const attendanceSchema = mongoose.Schema({
    stuff:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:true
    },
    days:[{
        dayDate:{
           type:String, 
        },
        checkIn:{
            type:Date,
        },
        checkOut:{
            type:Date
        },
        totalHours:{
            type:Number
        },
        late:{
            type:Boolean,
            default:false
        },
        absent:{
            type:Boolean,
            default:true
        }
     }
    ]

})


export const attendanceModel = mongoose.model("attendance", attendanceSchema)