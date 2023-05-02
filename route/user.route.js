const express=require("express")
const { UserModel } = require("../models/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const {redisClient}=require("../helpers/redis")
const {auth}=require("../middleware/auth")


const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    try {
        const {name,email,password,city}=req.body
        const isUserPresent=await UserModel.findOne({emal})

        if(isUserPresent)
        {
            return res.send("User already present,Please login")
        }
        const hash=await bcrypt.hashSync(password,8)

        const newUser=new UserModel({name,email,password:hash,city})
        await newUser.save()
        res.send("Signup successful");


    } catch (error) {
        res.send(error.message)
    }
})


userRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        const isUserPresent=await UserModel.findOne({email})
        if(!isUserPresent)
        {
            return res.send("Register please")
        }

        const isPasswordCorrect=await bcrypt.compareSync(password,isUserPresent.password)
        if(!isPasswordCorrect)
        {
            return res.send("Wrong Credentials")

        }
        const token=await jwt.sign({userId:isUserPresent._id,city:isUserPresent.city},process.env.SECRET,{expiresIn:"1h"})
        res.send("login successful",token)
    } catch (error) {
        res.send(error.message)
    }
})


userRouter.get("/logout",auth,async(req,res)=>{
    try {
        const token=req.headers?.authorization
        if(!token)
        {
            return res.status(400).send({msg:"Error"})
        }
        await redisClient.set(token,token)
        res.send("Logout successful")
    } catch (error) {
        res.send(error.message)
    }
})



module.exports={userRouter}