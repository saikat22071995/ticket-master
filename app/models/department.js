const mongoose=require('mongoose')

const Schema=mongoose.Schema
const DepartmentSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const department=mongoose.model('department',DepartmentSchema)

module.exports=department