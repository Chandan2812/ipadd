const  express=require("express")
const {connection}=require("./.config/db")
const {userRouter}=require("./route/user.route")
const {logger}=require("./middleware/logger")
const {redisClient}=require("./helpers/redis")
const {ipRouter}=require("./route/ip.route")

require("dotenv").config()

const app=express()
app.use(express.json())

app.use("/user",userRouter)
app.use("/city",ipRouter)


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to DB")

    } catch (error) {
        console.log(error.message)
    }
    console.log("server is running")
})