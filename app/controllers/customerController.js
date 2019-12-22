const Customer=require('../models/customer')

module.exports.list=(req,res)=>{
    Customer.find({user:req.user._id})
    .then((Customers)=>{
        res.json(Customers)
    })
    .catch((err)=>{
        console.log(err)
    })
}


module.exports.show=(req,res)=>{
    const id=req.params.id
    Customer.findById({_id:id,user:req.user._id})
    .then((Customer)=>{
        if(Customer){
            res.json(Customer)
        }
        else{
            res.json({})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports.create=(req,res)=>{
    const body=req.body
    const customer=new Customer(body)
    customer.save()
    .then((Customer)=>{
        res.json(customer)
    })
    .catch((err)=>{
        console.log(err)
    })

}

module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Customer.findByIdAndUpdate({_id:id,user:req.user._id},body,{new:true,runValidators:true})
    .then((Customer)=>{
        if(Customer){
            res.json(Customer)
        }
        else{
            res.json({})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports.destroy=(req,res)=>{
    const id=req.params.id
    Customer.findByIdAndDelete({_id:id,user:req.user._id})
    .then((Customer)=>{
        if(Customer){
            res.json(Customer)
        }else{
            res.json({})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}