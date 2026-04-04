import { subCategoryModel } from "../../database/models/subcategory.model.js"



export const filterDeletedSubCategories = async (req ,res ,next)=>{
    let {id}= req.params
    let subcategory = await subCategoryModel.findById(id)
    if(!subcategory){
        return res.json({message:"subcategory not found"})
    }
    if(category.isDeleted){
        return res.json({message:"subcategory is deleted"})
    }
    next()
}