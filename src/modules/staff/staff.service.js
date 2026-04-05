import { staffModel } from "../../database/models/staff.model.js"
import { userModel } from "../../database/models/user.model.js"



export const addStaff  = async(req , res)=>{
    let {user ,dailySalary , joinDate , department}= req.body
    let existedUser = await userModel.findById(user)
    if(!existedUser){
        return res.json({message:"user not found"})
    }
    let addedStaff = await staffModel.insertMany({user ,dailySalary , joinDate , department})
    if(addedStaff){
        res.json({message:"staff member added successfully", addedStaff})
    }else{
        res.json({message:"something went wrong"})
    }
}

export const getAllStaff= async(req , res)=>{
    let staff = await staffModel.find()
    if(staff.length == 0){
        res.json({message:"no staff found"})
    }else{
        res.json({message:"staff data", staff})
    }
}

export const getStaffDetails = async(req , res)=>{
    let {id}= req.params
    let staff = await staffModel.findById(id)
    if(staff){
        res.json({message:"staff member data", staff})
    }else{
        res.json({message:"staff member not found"})
    }
}

export const updateStaff = async (req , res)=>{
    let {id}= req.params
    let {dailySalary , joinDate , department }= req.body
    let updatedStaff = await staffModel.findByIdAndUpdate(id , {dailySalary , joinDate , department } , {new :true})
    if(updatedStaff){
        res.json({message:"staff updated successfully", updatedStaff})
    }else{
        res.json({message:"staff member not found"})
    }
}

export const softDeleteStaff = async(req , res)=>{
    let {id}= req.params
    let staff = await staffModel.findById(id)
    if(!staff){
       return  res.json({message:"staff member not found"})
    }
    if(!staff.isActive){
         return res.json({message:"staff member is already deleted"})
    }
    let deletedStaff = await staffModel.findByIdAndUpdate(id , {isActive:false},{new :true} )
    if(deletedStaff){
        res.json({message:"staff member deleted successfully"})
    }else{
        res.json({message:"staff member not found"})
    }
}

