
import jwt from "jsonwebtoken"
import { userModel } from "../../database/models/user.model.js";


export const generateToken = (user)=>{  
    let signature=""
    switch(user.role){
         case "user":
            signature="s_u"
            break;
         case "stuff":
            signature="s_s"
            break;
         case "admin":
            signature="s_a"
            break;
         default:
            break;
    }

    let accessToken = jwt.sign({id :user._id} , signature , {expiresIn :"24h"})
    let refreshToken = jwt.sign({id :user._id} , signature , {expiresIn :"1y"})

    return{accessToken , refreshToken}
}

 
export const authenticate = (req , res , next)=>{
      let {Authorization} = req.headers
      let {bearer, token} = Authorization.split(" ")
      let signature=""
      switch(bearer){
         case "user":
            signature="s_u";
            break;
         case "stuff":
            signature="s_s"
            break;
         case "admin":
            signature="s_a"
            break;
         default:
            break;
      }

      let decode = jwt.verify(token , signature)
      req.user = decode
      next()
}


export const authorize=(role)=>{
   return async (req , res , next)=>{
      let user = await userModel.findById(req.user.id)
       if(user.role == role){
           next()
       }else{
         res.json({message:"user hasn't access"})
       }
   }
}


