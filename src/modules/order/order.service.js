import { cartModel } from "../../database/models/cart.model.js"
import { orderModel } from "../../database/models/order.model.js"
import { productModel } from "../../database/models/product.model.js"



export const checkout =async (req ,res)=>{
    // let{paymentMethod , shippingAddress} = req.body
    // let cart = await cartModel.findOne({user:req.user.id})
    // if(!cart){
    //     return res.json({message:"your cart is empty"})
    // }
    // cart.items.map((item)=>(
    //     let productId = item.product
    //     let product = await productModel.findById(productId)
    // ))
    // let order = await orderModel.insertMany({user:req.user.id , items:cart.items , })

}


export const getMyOrders = async (req ,res)=>{
    let orders = await orderModel.find({user:req.user.id})
    if(orders.length==0){
        res.json({message:"you haven't any orders"})
    }else{
        res.json({message:"your orders", orders})
    }
}

export const getOrderDetails = async (req , res)=>{
    let{id}= req.params
    let order = await orderModel.findById(id)
    if(order){
        res.json({message:"order details", order})
    }else{
        res.jon({message:"order not found"})
    }
}

export const getAllOrders = async(req , res)=>{
    let orders = await orderModel.find()
    if(orders.length == 0){
        res.json({message:"no orders found"})
    }else{
        res.json({message:"orders data", orders})
    }
}

export const updateOrderStatus = async (req , res)=>{
    let {id}= req.params
    let {orderStatus}= req.body
    let updatedOrder = await orderModel.findByIdAndUpdate(id , {orderStatus}, {new :true})
    if(updatedOrder){
        res.json({message:"order Status updated successfully",updatedOrder})
    }else{
         res.json({message:"order not found"})
    }
}