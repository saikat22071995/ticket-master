const Department=require('../models/department')

module.exports.list=(req,res)=>{
    Department.find()
    .then((Departments)=>{
        res.json(Departments)
    })
    .catch((err)=>{
        console.log(err)
    })
}


module.exports.show=(req,res)=>{
    const id=req.params.id
    Department.findById(id)
    .then((Department)=>{
        if(Department){
            res.json(Department)
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
    const department=new Department(body)
    department.save()
    .then((Department)=>{
        res.json(department)
    })
    .catch((err)=>{
        console.log(err)
    })

}

module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Department.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    .then((Department)=>{
        if(Department){
            res.json(Department)
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
    Department.findByIdAndDelete(id)
    .then((Department)=>{
        if(Department){
            res.json(Department)
        }else{
            res.json({})
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}