
import mongoose from "mongoose"

const staffSchema = mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId, 
        ref:"users"
    },
    dailySalary:{
        type:Number,
        required:true
    },
    joinDate:{
        type:Date,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true,
        default:true
    },
    monthlyReports:[{
        month:{
            type:String,    //2024-4
        },
        totalDaysWorked:{
            type:Number,
           
        },
        totalDeductions:{
            type:Number,
            default: 0
        },
        finalSalary:{
            type:Number,
            
        },
        isPaid:{
            type:Boolean,
           
        },
        paidAt:{
            type:Boolean,
            
        }      
    }]

})

export const staffModel = mongoose.model("staff", staffSchema)