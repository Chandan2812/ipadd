const winston=require("winston")
const mongoDB=require("winston-mongodb")
require("dotenv").config()

const logger=winston.createLogger({
    level:"info",
    format:winston.format.json(),
    transports:[
        new mongoDB({
            db:process.env.MONGO_URL,
            collection:"logs",
            options:{
                useUnifiedTopology:true
            }
        })
    ]
})

module.exports={logger}