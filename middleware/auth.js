const jwt=require("jsonwebtoken")
const {redisClient}=require("../helpers/redis")
require("dotenv").config()

const auth=async(req,res)=>{
    try {
        const token=req.headers?.authorization
        if(!token)
        {
            return res.send("Please login again")
        }

        const isTokenValid=await jwt.verify(token,process.env.SECRET)
        if(!isTokenValid){
           return res.send("Authentication failed")
        }
        const isTokenBlacklist=await redisClient.get(token)
        if(isTokenBlacklist)
        {
            return res.send("Unauthorized")
        }
            req.body.userId=isTokenValid.userId
            req.body.ip=isTokenValid.ip
            next()
        
    } catch (error) {
        res.send(error.message)
    }
}

module.exports={auth}