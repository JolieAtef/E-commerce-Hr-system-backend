import { imageKit } from "../../common/middleware/multer.js"
import { categoryModel } from "../../database/models/category.model.js"



export const createCategory = async(req , res)=>{
    let {name} = req.body
    let image =""
    if(req.file){
        image=await imageKit.upload({
            file: req.file.buffer,          
            fileName:`${Date.now()}_${req.file.originalname}`,
            folder: "e-commerce_categories",  
        })
    }
    let addedCategory = await categoryModel.insertMany({name , image})
    if(addedCategory){
        res.json({message:"category added successfully",addedCategory})
    }else{
        res.json({message:"something went wrong"})
    }
}

export const updateCategory = async(req , res)=>{
    let {id} = req.params
    let {name} = req.body
    let image =""
    if(req.file){
        image=await imageKit.upload({
            file: req.file.buffer,          
            fileName:`${Date.now()}_${req.file.originalname}`,
            folder: "e-commerce_categories",  
        })
    }
    let updatedCategory = await categoryModel.findByIdAndUpdate(id , {name , image}, {new:true})
    if(updatedCategory){
        res.json({message:"category updated successfully",updatedCategory})
    }else{
        res.json({message:"something went wrong"})
    }
}

export const softDeleteCategory= async(req , res)=>{
    let {id}= req.params
    let deletedCategory = await categoryModel.findByIdAndUpdate(id , {isDeleted:true , deletedAt: Date.now()} , {new : true})
    if(deletedCategory){
         res.json({message:"category deleted successfully"})
    }else{
        res.json({message:"something went wrong"})
    }
}

export const getAllCategories = async (req ,res)=>{
    let categories = await categoryModel.find().populate("subCategories")
    if(categories.length == 0){
        res.json({message:"no categories found"})
    }else{
        res.json({message:"categories data",categories})
    }
}

export const getActiveCategories = async (req , res)=>{
    let categories = await categoryModel.find({isDeleted:false})
    if(categories.length == 0){
        res.json({message:"no categories found"})
    }else{
        res.json({message:"categories data",categories})
    }
}


