import { cartModel } from "../../database/models/cart.model.js"
import { productModel } from "../../database/models/product.model.js"




export const addToCart = async (req  , res)=>{
    let {product , quantity} = req.body
    let existedProduct = await productModel.findById(product)
    if(!existedProduct){
        return res.json({message:"product not found"})
    }
    if(existedProduct.isDeleted){
        return res.json({message:"product not available"})
    }
    if(existedProduct.stock < quantity){
         return res.json({message:`${existedProduct.stock} pieces only available of this product`})
    }

    let price = existedProduct.price
    let cart = await cartModel.findOne({user:req.user.id})
    if(cart){
       let item = cart.items.find((obj)=>obj.product == product)
       if(item){
         item.quantity=quantity
         let total = cart.items.reduce((total, item) => total + (item.quantity * item.price),0)
         cart.totalPrice = total
         await cart.save()
       }else{
        cart.items.push({product , quantity , price })
        cart.totalPrice+= quantity*price
        await cart.save()
       }
       res.json({message:"item added to cart successfully", cart})
    }else{
        let createdCart = await cartModel.insertMany({user:req.user.id , items:[{product,quantity, price}] , totalPrice: quantity*price}) 
        res.json({message:"item added to cart successfully", createdCart})
    }
} 


export const getMyCart = async (req ,res)=>{
    let cart = await cartModel.findOne({user :req.user.id})
    if(cart){
        res.json({message:"Cart data", cart})
    }else{
        res.json({message:"you haven't cart yet"})
    }
}

export const updateItemQuantity = async(req , res)=>{
    let {productId} = req.params
    let {quantity}= req.body
    let cart = await cartModel.findOne({user :req.user.id})
    if(!cart){
        return res.json({message:"you haven't cart yet"})
    }
    let product = cart.items.find((obj)=>obj.product ==productId)
    if(product){
         product.quantity=quantity
         let total = cart.items.reduce((total, item) => total + (item.quantity * item.price),0)
         cart.totalPrice = total
         await cart.save()
         res.json({message:"product quantity updated successfully"})
    }else{
        res.json({message:"product not found in cart"})
    }
}

export const removeItem = async(req , res)=>{
    let {productId} = req.params
    let cart = await cartModel.findOne({user :req.user.id})
    if(!cart){
        return res.json({message:"you haven't cart yet"})
    }
    let product = cart.items.find((obj)=>obj.product ==productId)
    if(product){
         cart.items = cart.items.filter((obj)=> obj.product != productId)  
         let total = cart.items.reduce((total, item) => total + (item.quantity * item.price),0)
         cart.totalPrice = total 
         await cart.save()
         res.json({message:"product deleted successfully"})
    }else{
        res.json({message:"product not found in cart"})
    }
}

export const clearCart = async (req , res)=>{
     let cart = await cartModel.findOne({user:req.user.id})
     if(!cart){
        res.json({message:"you haven't cart yet"})
     }else{
         cart.items=[]
         cart.totalPrice=0
         await cart.save()
         res.json({message:"cart  is empty now"})
     }
}

