const mongoose=require('mongoose')

const Schema=mongoose.Schema
const ticketSchema=new Schema({
    code:{
        type:String,
        required:true
    },
    customer:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Customer'
    },
    employee:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'employee'
    },
    department:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'department'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    message:{
        type:String,
        minlength:10,
        required:true
    },
    priorities:{
        type:String,
        required:true
    },
    isResolved:{
        type:Boolean,
        default:false
    }
})

const Ticket=mongoose.model('ticket',ticketSchema)

module.exports=Ticket