import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        required:true,
        default:false
    },
    deletedAt:{
        type:Date,
    }
})

categorySchema.virtual("subCategories",{ref:"subcategories" , localField :"_id" , foreignField:"category"})

export const categoryModel = mongoose.model("categories", categorySchema)