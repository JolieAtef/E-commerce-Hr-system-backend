import mongoose from "mongoose";


const deductionSchema = mongoose.Schema({
    staff:{
        type:mongoose.Types.ObjectId,
        ref:"users",
        required:true
    },
    month:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }, 
    reason:{
        type:String,
        required:true
    },
    date:{
       type:Date,
       required:true
    }

})

export const deductionModel = mongoose.model("deductions",deductionSchema)


