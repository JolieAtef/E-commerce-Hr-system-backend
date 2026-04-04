import { imageKit } from "../../common/middleware/multer.js"
import { categoryModel } from "../../database/models/category.model.js"
import { productModel } from "../../database/models/product.model.js"
import { subCategoryModel } from "../../database/models/subcategory.model.js"



export const addProduct = async(req ,res)=>{
    let{name,description, price,stock,category,subcategory} = req.body
    let existedCategory = await categoryModel.findById(category)
    if(!existedCategory){
        return res.json({message:"category not found"})
    }

    let existedSubcategory = await subCategoryModel.findById(subcategory)
    if(!existedSubcategory){
            return res.json({message:"subcategory not found"})
    }

    let images =[]
    if(req.files){
      images = await Promise.all(
        req.files.map(async(file)=>{
            const image = await imageKit.upload({
                file: file.buffer,          
                fileName:`${Date.now()}_${req.file.originalname}`,
                folder: "e-commerce_products",  
            })
           return image.url
         })
       )
     }

     let addedProduct = await productModel.insertMany({name,description, price,stock,category,subcategory,images})
     if(addedProduct){
        res.jon({message:"product added successfully", addedProduct})
     }else{
        res.json({message:"something went wrong"})
     }
}

export const updateProduct = async(req , res)=>{
    let{id} = req.params
    let{name,description, price,category,subcategory} = req.body
    let existedProduct = await productModel.findById(id)
    if(!existedProduct){
        return res.json({message:"Product not found"})
    }
    let existedCategory = await categoryModel.findById(category)
    if(!existedCategory){
        return res.json({message:"category not found"})
    }

    let existedSubcategory = await subCategoryModel.findById(subcategory)
    if(!existedSubcategory){
            return res.json({message:"subcategory not found"})
    }

    let images =[]
    if(req.files){
      images = await Promise.all(
        req.files.map(async(file)=>{
            const image = await imageKit.upload({
                file: file.buffer,          
                fileName:`${Date.now()}_${req.file.originalname}`,
                folder: "e-commerce_products",  
            })
           return image.url
         })
       )
     }

     let updatedProduct = await productModel.findByIdAndUpdate(id ,{name,description, price ,category,subcategory,images}, {new :true})
     if(updatedProduct){
        res.jon({message:"product updated successfully", updatedProduct})
     }else{
        res.json({message:"something went wrong"})
     }
}


export const softDeleteProduct= async(req , res)=>{
    let {id}= req.params
    let product = await productModel.findById(id)
    if(!product){
       return res.json({message:"product not found"})
    }
    if(product.isDeleted){
       return res.json({message:"product is already deleted"})
    }
    let deletedProduct = await productModel.findByIdAndUpdate(id , {isDeleted:true , deletedAt: Date.now()} , {new : true})
    if(deletedProduct){
         res.json({message:"Product deleted successfully"})
    }else{
        res.json({message:"something went wrong"})
    }
}

export const updateStokeQuantity =async(req , res)=>{
      let {id}= req.params
      let{stoke}= req.body
      let product = await productModel.findById(id)
      if(!product){
       return  res.json({message:"product not found"})
      }
      let updatedProduct 
      if(stoke>0){
         updatedProduct = await productModel.findByIdAndUpdate(id , {stoke , isDeleted:false }, {new :true})
      }else{
         updatedProduct = await productModel.findByIdAndUpdate(id , {stoke , isDeleted:true , deletedAt:Date.now() } ,{new :true} )
      }

      if(updateProduct){
        res.jon({message:"product updated successfully", updatedProduct})
      }else{
        res.json({message:"something went wrong"})
      }
}


export const getActiveProducts = async(req ,res)=>{
    ///
    // let {page , limit , minPrice , maxPrice , sort}= req.query
    let products = await productModel.find({isDeleted:false})
    if(products.length==0){
        res.json({message:"no products found"})
    }else{  
        res.json({message:"products data", products})
    }
}

export const getProductDetails = async (req ,res )=>{
    let {id} = req.params
    let product = await productModel.findById(id)
    if(!product){
       return res.json({message:"product not found"})
    }
    if(product.isDeleted){
       return  res.json({message:"product is already deleted"})
    }
    if(product){
        res.json({message:"product data", product})
    }else{
        res.json({message:"something went wrong"})
    }
   
}

export const getCategoryProducts = async(req , res)=>{
    let {categoryId}= req.params
    ///
    // let {page , limit , minPrice , maxPrice , sort}= req.query

    let category = await categoryModel.findById(categoryId)
    if(!category){
       return  res.json({message:"category not found"})
    }
    let products = await productModel.find({category:categoryId , isDeleted:false})
    if(products.length==0){
        res.json({message:"no products found"})
    }else{
        res.json({message:"product of category",products})
    }
}

export const getSubcategoryProducts=async (req ,res)=>{
    let {subcategoryId} = req.params
    ///
    // let {page , limit , minPrice , maxPrice , sort}= req.query
    let subcategory = await subCategoryModel.findById(subcategoryId)
    if(!subcategory){
        return res.json({message:"subcategory not found"})
    }
    let products = await productModel.find({subcategory:subcategoryId , isDeleted:false})
    if(products.length==0){
        res.json({message:"no products found"})
    }else{
        res.json({message:"product of category",products})
    }
}




