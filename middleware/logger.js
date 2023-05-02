const winston=require("winston")
const mongoDB=require("winston-mongodb")
require("dotenv").config()

const logger=winston.createLogger({
    level:"info",
    format:winston.format.json(),
    transports:[
         new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
    ]
})

module.exports={logger}