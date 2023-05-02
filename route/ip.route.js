const express=require("express")
const axios=require("axios")
const {IpList}=require("../models/ip.model")
const {UserModel}=require("../models/user.model")
const {redisClient}=require("../helpers/redis")
const {auth}=require("../middleware/auth")

const ipRouter=express.Router()

ipRouter.get("/:ip",auth,async(req,res)=>{
    try {
        const ip=req.params.ip || req.body.ip
        const isCityPresent=await redisClient.get(`${ip}`)
        if(isCityPresent)
        {
            return res.status(200).send({data:isCityPresent})
        }
            const respose=await axios.get(`https://ipapi.co?q=${ip}`)

        const cityData=respose.data

        redisClient.set(city,JSON.stringify(cityData),{EX:6*60})


    } catch (error) {
       return res.status(500).send(error.message) 
    }
})




module.exports={ipRouter}