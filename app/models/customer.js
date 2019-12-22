const mongoose=require('mongoose')
const validator=require('validator')
const Schema=mongoose.Schema
const custmoerSchema=new Schema({
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

const Customer=mongoose.model('Customer',custmoerSchema)

module.exports=Customer