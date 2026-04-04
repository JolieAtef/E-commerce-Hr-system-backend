import mongoose from "mongoose";


const subcategorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"categories",
        required:true
    },
    isDeleted:{
        type:Boolean,
        required:true,
        default:false
    },
    deletedAt:{
        type:Date,
    },
})


export const subCategoryModel = mongoose.model("subcategories",subcategorySchema)