import { attendanceModel } from "../../database/models/attendance.model.js"
import { deductionModel } from "../../database/models/deduction.model.js"
import { staffModel } from "../../database/models/staff.model.js"



export const calculateSalary = async(req , res)=>{
    let {id , month} = req.params
    let staffMember = await staffModel.findById(id)
    if(!staffMember){
        res.json({message:"staff member not found"})
    }
    let monthlyReport = staffMember.monthlyReports.find((report)=>report.month == month)
    if(monthlyReport){
       
       let deductions = await deductionModel.find({staff:id})
       let deductionsAmount = deductions.reduce((total , deduction)=>total + deduction.amount , 0)

       let baseSalary= staffMember.dailySalary*20 
       let absentDays = 20 - monthlyReport.totalDaysWorked
       let totalDeduction = deductionsAmount + absentDays*staffMember.dailySalary
       let finalSalary= baseSalary-totalDeduction
       monthlyReport.finalSalary= finalSalary
       await staffMember.save()
    }else{
         res.json({message:"no monthly report found for this month"})
      }
}




export const paySalary = async(req , res)=>{
    let {id , month} = req.params
    let staffMember = await staffModel.findById(id)
    if(!staffMember){
        res.json({message:"staff member not found"})
    }
   let monthlyReport = staffMember.monthlyReports.find((report)=>report.month == month)
   if(monthlyReport){
     if(!monthlyReport.isPaid){
         monthlyReport.isPaid = true 
         monthlyReport.paidAt=Date.now()
         await staffMember.save()
         res.json({message:"salary paid successfully",monthlyReport})
     }else{
        res.json({message:"salary of this month already paid"})
     }
   }else{
      res.json({message:"no monthly report found for this month"})
   }
}


export const adjustSalary = async(req , res)=>{
    let {id , month} = req.params
    let {bonus}= req.body
    let staffMember = await staffModel.findById(id)
    if(!staffMember){
        res.json({message:"staff member not found"})
    }

    let monthlyReport = staffMember.monthlyReports.find((report)=>report.month == month)
    if(monthlyReport){
        monthlyReport.finalSalary+=bonus
        await staffMember.save()
        res.json({message:"monthly salary adjusted successfully", monthlyReport})
    }else{
         res.json({message:"no monthly report found for this month"})
    }
}