import { attendanceModel } from "../../database/models/attendance.model.js"
import { deductionModel } from "../../database/models/deduction.model.js"
import {staffModel} from "../../database/models/staff.model.js"


export const checkIn = async(req , res)=>{
    let staffMember = await staffModel.findById(req.user.id)
    if(!staffMember){
        return res.json({message:"staff member not found"})
    }

    const now = Date.now()
    const year = now.getFullYear();
    const month = now.getMonth() + 1; 
    const day = now.getDate();
    let today = `${year}-${month}-${day}`
    
    let attendance = await attendanceModel.findOne({stuff:req.user.id})
    if(!attendance){
       attendance = await attendanceModel.insertMany({stuff:req.user.id})
    }

    let attendanceDay = attendance.days.find((day)=>day.dayDate == today)
    if(attendanceDay){
       res.json({message:"you already checked in today"})
    }else{

        const today9AM = new Date();
        today9AM.setHours(9, 0, 0, 0);
       
        let late
        if (now > today9AM) {
            late = true 
        }else{
            late = false
        }

        attendance.days.push({dayDate:today , checkIn:now , late})
        await attendance.save()
        res.json({message:"CheckIn done successfully"})
    }
}

export const checkOut = async (req , res)=>{

    let staffMember = await staffModel.findById(req.user.id)
    if(!staffMember){
        return res.json({message:"staff member not found"})
    }

    const now = Date.now()
    const year = now.getFullYear();
    const month = now.getMonth() + 1; 
    const day = now.getDate();
    let today = `${year}-${month}-${day}`
    
    let attendance = await attendanceModel.findOne({stuff:req.user.id})
    if(!attendance){
        return res.json({message:"You haven't checked in yet"})
    }
    let attendanceDay = attendance.days.find((day)=>day.dayDate == today)
    if(!attendanceDay){
        return res.json({message:"You haven't checked in yet"})
    }

    const today9AM = new Date();
    today9AM.setHours(9, 0, 0, 0);
    const hours = Math.floor((now - today9AM) / (1000 * 60 * 60));
    
    let monthlyReport = staffMember.monthlyReports.find((report)=>report.month==`${year}-${month}`)
    if(!monthlyReport){
        let totalDeductions
        if(hours < 8){
            let deductionAmount = staffMember.dailySalary*((8-hours)/8)
            let addedDeduction = await deductionModel.insertMany({staff:req.user.id , month:`${year}-${month}`, amount:deductionAmount , reason:"being late" , date:today})
            totalDeductions = 1
         }
        staffMember.monthlyReports.push({month:`${year}-${month}`, totalDaysWorked:1 , totalDeductions}) 
    }else{
        if(hours < 8){
            let deductionAmount = staffMember.dailySalary*((8-hours)/8)
            let addedDeduction = await deductionModel.insertMany({staff:req.user.id , month:`${year}-${month}`, amount:deductionAmount , reason:"being late" , date:today})
            monthlyReport.totalDeductions+=1
        }
        monthlyReport.totalDaysWorked+=1
        
    }
    await staffMember.save()
    attendance.absent = false
    attendance.checkOut= now
    await attendance.save()

    res.json({message:"check out done successfully"})

}

