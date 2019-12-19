const mongoose=require('mongoose')

const Schema=mongoose.Schema
const custmoerSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    mobile:{
        type:String,
        minlength:10,
        maxlength:10
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Customer=mongoose.model('Customer',custmoerSchema)

module.exports=Customer