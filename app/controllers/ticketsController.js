const Ticket=require('../models/ticket')

module.exports.list=(req,res)=>{
    Ticket.find({user:req.user._id}).populate('employees').populate('customer').populate('department')
    .then((ticket)=>{
        res.json(ticket)
    })
    .catch((err)=>{
        res.json(err)
    })
}

module.exports.create=(req,res)=>{
    const body=req.body
    const ticket=new Ticket(body)
    ticket.save()
    .then((ticket)=>{
        res.json(ticket)
    })
    .catch((err)=>{
        res.send(err)
    })
}

module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Ticket.findByIdAndUpdate({_id:id,user:req.user._id},body,{new:true,runValidators:true})
    .then((ticket)=>{
        if(ticket){
            res.json(ticket)
        }
        else{
            res.json({})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}


module.exports.show=(req,res)=>{
    const id=req.params.id
    Ticket.findById({_id:id,user:req.user._id}).populate('customer').populate('department').populate('employees')
    .then((ticket)=>{
        if(ticket){
            res.json(ticket)
        }else{
            res.json({})
        }
    })
    .catch((err)=>{
        res.send(err)
    })
}

module.exports.destroy=(req,res)=>{
    const id=req.params.id
    Ticket.findByIdAndDelete({_id:id,user:req.user._id})
    .then((ticket)=>{
        if(ticket){
            res.json(ticket)
        }else{
            res.json('Id not found')
        }
    })
    .catch((err)=>{
        res.send(err)
    })
}