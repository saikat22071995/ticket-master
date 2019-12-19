const mongoose=require('mongoose')

const Schema=mongoose.Schema
const employeeSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    department:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'department'
    }
})

const Employee=mongoose.model('employee',employeeSchema)

module.exports=Employee