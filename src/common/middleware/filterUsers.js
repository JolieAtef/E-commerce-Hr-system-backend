import { userModel } from "../../database/models/user.model.js"



export const filterDeletedUsers= async (req , res ,next )=>{
    let user = await userModel.findById(req.user.id)
    if(!user){
        return res.json({message:"user not found"})
    }
    if(user.isDeleted){
        return res.json({message:"user is Deleted"})
    }
    next()
}