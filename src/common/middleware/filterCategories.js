import { categoryModel } from "../../database/models/category.model.js"


export const filterDeletedCategories = async (req ,res ,next)=>{
    let {id}= req.params
    let category = await categoryModel.findById(id)
    if(!category){
        return res.json({message:"category not found"})
    }
    if(category.isDeleted){
        return res.json({message:"category is deleted"})
    }
    next()
}