const mongoose=require("mongoose")
const Ipaddress=mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    search:{type:String,required:true}
})

const IpList=mongoose.model("city",Ipaddress)

module.exports={IpList}