import { deductionModel } from "../../database/models/deduction.model.js";
import { staffModel } from "../../database/models/staff.model.js";


export const addDeduction = async(req ,res)=>{
    let {id}= req.params
    let {amount , reason} = req.body
    const now = Date.now()
    const year = now.getFullYear();
    const month = now.getMonth() + 1; 
    const day = now.getDate();
    let date = `${year}-${month}-${day}`

    let staffMember =await staffModel.findById(id)
    if(!staffMember){
        return res.json({message:"staff member not found"})
    }
   
    let addedDeduction = await deductionModel.insertMany({staff:id , month:`${year}-${month}` , amount ,reason , date })
    let monthlyReport = staffMember.monthlyReports.find((report)=>report.month==`${year}-${month}`)
    if(monthlyReport){
        monthlyReport.totalDeductions+=1
    }else{
        staffMember.monthlyReports.push({month:`${year}-${month}`, totalDeductions:1}) 
    }
    await staffMember.save()
    res.json({message:"deduction added successfully", addedDeduction})

}


export const getStaffDeductions = async(req , res)=>{
    let {id}= req.params
    let staffMember =await staffModel.findById(id)
    if(!staffMember){
        return res.json({message:"staff member not found"})
    }
    let deductions = await deductionModel.find({staff:id})
    if(deductions.length == 0){
        res.json({message:"no deductions found for this staff"})
    }else{
        res.json({message:"staff deductions", deductions})
    }
}

export const updateDeduction = async (req , res)=>{
    let {id , deductionId}= req.params
    let {amount , reason} = req.body
    let staffMember =await staffModel.findById(id)
    if(!staffMember){
        return res.json({message:"staff member not found"})
    }
    let updatedDeduction = await deductionModel.findByIdAndUpdate(deductionId , {amount , reason}, {new :true})
    if(updatedDeduction){
        res.json({message:"deduction updated successfully" ,updatedDeduction})
    }else{
        res.json({message:"deduction not found"})
    }
}

export const deleteDeduction = async(req , res)=>{
    let {id , deductionId}= req.params
    let staffMember =await staffModel.findById(id)
    if(!staffMember){
        return res.json({message:"staff member not found"})
    }
    let deletedDeduction = await deductionModel.findByIdAndDelete(deductionId)
    if(deletedDeduction){
        let monthlyReport = staffMember.monthlyReports.find((report)=>report.month==`${year}-${month}`)
        monthlyReport.totalDeductions-=1
        await staffMember.save() 
        res.json({message:"deduction deleted successfully"})  
    }else{
        res.json({message:"deduction not found"})
    }

}