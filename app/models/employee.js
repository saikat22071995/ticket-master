const mongoose=require('mongoose')
const validator=require('validator')
const Schema=mongoose.Schema
const employeeSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function (value){
                return validator.isEmail(value)
            },
            message:function (){
                return 'invalid email format'
            }
        }
    },
    mobile:{
        type:String,
        minlength:10,
        maxlength:10
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    department:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'department'
    }
})

const Employee=mongoose.model('employee',employeeSchema)

module.exports=Employee