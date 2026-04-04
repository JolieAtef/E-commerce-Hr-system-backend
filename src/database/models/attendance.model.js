// checkin 

import mongoose, { modelNames } from "mongoose";

const attendanceSchema = mongoose.Schema({
    stuff:{
        type:mongoose.Types.ObjectId,
        ref:"users"
    },
    days:[{
        checkIn:{
            type:Date,
            required:true
        },
        checkOut:{
            type:Date
        },
        totalHours:{
            type:Number
        }
     }
    ]

})


export const attendanceModel = mongoose.model("attendance", attendanceSchema)