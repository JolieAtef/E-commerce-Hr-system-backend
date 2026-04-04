
import mongoose from "mongoose"

const stuffSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId, 
        ref:"users"
    },
    dailySalary:{
        type:Number,
        required:true
    },
    joinDate:{
        type:Date
    },
    department:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true
    },
    monthlyReports:[{
        month:{
            type:String,    //2024-4
            required:true
        },
        totalDaysWorked:{
            type:Number,
            required:true
        },
        totalDeductions:{
            type:Number,
            required:true
        },
        finalSalary:{
            type:Number,
            required:true
        },
        isPaid:{
            type:Boolean,
            required:true 
        },
        paidAt:{
            type:Boolean,
            required:true 
        }      
    }]

})

export const stuffModel = mongoose.model("stuff", stuffSchema)