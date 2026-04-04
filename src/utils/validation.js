

export const validation =(Schema)=>{
    return (req , res , next)=>{
        const {error} = Schema.validate(req.body)
        if (error){
            return res.json({message:error.details})
        }
        next()
    }
}