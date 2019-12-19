const Ticket=require('../models/ticket')

module.exports.list=(req,res)=>{
    Ticket.find()
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
    Ticket.findByIdAndUpdate(id,body,{new:true,runValidators:true})
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
    Ticket.findById(id).populate('department',['name'])
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
    Ticket.findByIdAndDelete(id)
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