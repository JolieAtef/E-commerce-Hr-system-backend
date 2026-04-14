import { imageKit } from "../../common/middleware/multer.js";
import { userModel } from "../../database/models/user.model.js"



export const getProfile = async(req ,res)=>{
    let user = await userModel.findById(req.user.id)
    if(user){
        res.json({message:"User Profile", user})
    }else{
        res.json({message:"user not found"})
    }
}


export const updateProfile = async (req ,res)=>{
    let {name , email , phone , address } = req.body
    let avatar =""
    if(req.file){
        avatar= await imageKit.upload({
            file: req.file.buffer,          
            fileName:`${Date.now()}_${req.file.originalname}`,
            folder: "e-commerce_users",              
        })
    }
    let updatedUser = await userModel.findByIdAndUpdate(req.user.id , {name , email , phone , address , avatar:avatar.url }, {new:true})
    if(updatedUser){
        res.json({message:"user updated successfully", updatedUser})
    }else{
        res.json({message:"user not found"})
    }
}


export const softDeletedProfile = async (req , res)=>{
    let user = await userModel.findById(req.user.id)
    if(!user){
        return res.json({message:"user not found"})
    }
    if(user.isDeleted){
        return res.json({message:"user already deleted"})
    }
    let deletedUser = await userModel.findByIdAndUpdate( req.user.id , {isDeleted:true , deletedAt:Date.now()}, {new :true})
    if(deletedUser){
        res.json({message:"user deleted successfully"})
    }else{
        res.json({message:"something went wrong"})
    }
}

export const uploadAvatar = async(req , res)=>{
    let avatar=""
    if(req.file){
        console.log(req.file.originalname)
        avatar= await imageKit.upload({
            file: req.file.buffer,          
            fileName:`${Date.now()}_${req.file.originalname}`,
            folder: "e-commerce_users",              
        })

    }
    let updatedUser = await userModel.findByIdAndUpdate(req.user.id , {avatar:avatar.url}, {new:true})
    if(updatedUser){
        res.json({message:"profile image added successfully", updatedUser})
    }else{
        res.json({message:"user not found"})
    }

}