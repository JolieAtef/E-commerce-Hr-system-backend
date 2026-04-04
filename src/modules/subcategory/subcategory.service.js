import { categoryModel } from "../../database/models/category.model.js"
import { subCategoryModel } from "../../database/models/subcategory.model.js"


export const createSubCategory = async (req , res)=>{
    let {name , category}= req.body
    let existedCategory = await categoryModel.findById(category)
    if(!existedCategory){
        return res.json({message:"category not found"})
    }
    let addedSubcategory = await subCategoryModel.insertMany({name , category})
    if(addedSubcategory){
        res.json({message:"subcategory added successfully", addedSubcategory})
    }else{
        res.json({message:"something went wrong"})
    }
}


export const updateSubCategory = async (req ,res ) =>{
    let {id} = req.params
    let {name , category}= req.body
    let existedCategory = await categoryModel.findById(category)
    if(!existedCategory){
        return res.json({message:"category not found"})
    }
    let updatedSubcategory = await subCategoryModel.findByIdAndUpdate(id , {name , category}, {new:true})
    if(updatedSubcategory){
        res.json({message:"subcategory updated successfully", addedSubcategory})
    }else{
        res.json({message:"something went wrong"})
    }
}


export const softDeleteSubCategory= async(req , res)=>{
    let {id}= req.params
    let deletedSubCategory = await subCategoryModel.findByIdAndUpdate(id , {isDeleted:true , deletedAt: Date.now()} , {new : true})
    if(deletedSubCategory){
         res.json({message:"subcategory deleted successfully"})
    }else{
        res.json({message:"something went wrong"})
    }
}

export const getSubcategoryDetails = async(req ,res)=>{
    let{id}= req.params
    let subcategory = await subCategoryModel.findById(id)
    if(subcategory){
        res.json({message:"Subcategory details", subcategory})
    }else{
        res.json({message:"subcategory not found"})
    }
}











export const getSubcategoriesByCategory = async(req ,res)=>{
    let {id}=req.params
    let subCategories = await subCategoryModel.find({category:id , isDeleted:false})
    if(subCategories.length==0){
        res.json({message:"category hasn't subcategories yet"})
    }else{
        res.json({message:"subcategories of this category",subCategories})
    }
 }