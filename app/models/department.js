const mongoose=require('mongoose')

const Schema=mongoose.Schema
const DepartmentSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const department=mongoose.model('department',DepartmentSchema)

module.exports=department