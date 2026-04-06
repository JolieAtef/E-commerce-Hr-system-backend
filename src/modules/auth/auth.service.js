import { sendEmail } from "../../common/email/sendEmail.js"
import { userModel } from "../../database/models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { env } from "../../../config/env.service.js"
import { generateToken } from "../../common/middleware/auth.js"


export const signup = async(req ,res)=>{
    let {name , email , password ,confirmPassword, phone ,address, role} = req.body
    let user = await userModel.findOne({email})
    if(user){
        return res.json({message:"user already exist"})
    }
    if(password != confirmPassword){
        return res.json({message:"confirm password doesn't match"})
    }
    let hashPassword = await bcrypt.hash(password , 12)
    let addedUser = await userModel.insertMany({name , email , password:hashPassword, phone , address, role})
    if(addedUser){
        let token = jwt.sign({email}, "email-e-commerce")
        sendEmail(email , "Verify Account" , "to verify your account click this button" , `<button><a href="${env.base_url}/api/v1/auth/verify-email/${token}">Verify</a></button>`)
        res.json({message:"User Added", addedUser})
    }else{
        res.json({message:"something went wrong"})
    }

}

 
export const login = async (req , res)=>{
    let {email ,password} = req.body
    let user = await userModel.findOne({email})
    if(!user){
        return res.json({message:"user not found"})
    }
    if(!user.isVerify){
        return res.json({message:"check your email to verify your account first"})
    }
    let login = await bcrypt.compare(password , user.password)
    if(login){
        let {accessToken , refreshToken} = generateToken(user)
        res.json({message:"login done successfully", accessToken , refreshToken})
    }else{
        res.json({message:"password is wrong"})
    }
}

export const verify = async (req ,res)=>{
    let {token} = req.params
    let {email} = jwt.verify(token ,"email-e-commerce")
    let user = await userModel.findOne({email})
    if(!user){
        return res.json({message:"user not found"})
    }
    if(user.isVerify){
        return res.json({message:"User Account Already Verified"})
    }
    let verifiedUser = await userModel.findByIdAndUpdate(user._id , {isVerify:true}, {new :true})
    if(verifiedUser){
        res.json({message:"Account Verified Successfully"})
    }else{
        res.json({message:"something went wrong"})
    }
}

export const resendVerification = async (req ,res)=>{
    let {email} = req.body
    let user = await userModel.findOne({email})
    if(!user){
        return res.json({message:"user not found"})
    }
    if(user.isVerify){
        return res.json({message:"User Account Already Verified"})
    }
    let token = jwt.sign({email}, "email-e-commerce")
    sendEmail(email , "Verify Account" , "to verify your account click this button" , `<button><a href="${env.base_url}/api/v1/auth/verify-email/${token}">Verify</a></button>`)
    res.json({message:"check your email to verify your account"})

}

export const forgetPassword = async(req ,res)=>{
    let{email}= req.body
    let user = await userModel.findOne({email})
    if(!user){
        return res.json({message:"user not found"})
    }

    let token = jwt.sign({email}, "forget-password-e-commerce")
    sendEmail(email , "forget password" , `to reset your password click here`, `<button><a href="${env.base_url}/api/v1/auth/reset-password/${token}">reset password</a></button>`)
    res.json({message:"check your email to reset your password"})
}

export const resetPassword =async(req , res)=>{
    let {token} = req.params
    let {password , confirmPassword} = req.body
    if(password != confirmPassword){
        return res.json({message:"confirm password doesn't match"})
    }
    let {email} = jwt.verify(token ,"forget-password-e-commerce")
    let user = await userModel.findOne({email})
    if(!user){
        return res.json({message:"user not found"})
    }
    let hashPassword = await bcrypt.hash(password , 12)
    let updatedUser = await userModel.findByIdAndUpdate(user._id , {password : hashPassword} , {new :true})
    if(updatedUser){
        res.json({message:"password changed successfully"})
    }else{
        res.json({message:"something went wrong"})
    }
}

export const getAccessToken= async(req , res)=>{
    let {authorization} = req.headers
    let [bearer, token] = authorization.split(" ")
    let signature=""
    switch(bearer){
       case "user":
          signature="s_u";
          break;
       case "staff":
          signature="s_s"
          break;
       case "admin":
          signature="s_a"
          break;
       default:
          break;
    }
    let decode = jwt.verify(token, signature)
    let accessToken = jwt.sign({id : decode.id}, signature,{expiresIn:"24h"})

    res.json({message:"New Access Token generated successfully", accessToken})
}

 