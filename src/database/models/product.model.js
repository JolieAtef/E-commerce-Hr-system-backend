// name: String (required),
// description: String,
// price: Number (required, min: 0),
// stock: Number (required, min: 0),
// category: ObjectId (ref: Category),
// subcategory: ObjectId (ref: Subcategory),
// images: [String],
// isDeleted: Boolean,
// deletedAt: Date,
// autoDeletedAt: Date



import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"category",
        required:true
    },
    subcategory:{
        type:mongoose.Types.ObjectId,
        ref:"subcategory",
        required:true
    },
    images:{
        type:[String]
    },
    isDeleted:{
        type:Boolean,
        required:true,
        default:false
    },
    deletedAt:{
        type:Date,
    },
    autoDeletedAt:{
        type:Date,
    }
})

export const productModel = mongoose.model("products", productSchema)