const {User}=require('../models/user')
const {authenticateUser}=require('../middleware/authentication')
const express=require('express')
const router=express.Router()

module.exports.create=(req,res)=>{
    const body=req.body
    const user=new User(body)
    user.save()
    .then((user)=>{
        res.json(user)
    })
    .catch((err)=>{
        res.send(err)
    })
}

module.exports.loginCreate=(req,res)=>{
    const body=req.body
    User.findbyCredentials(body.email,body.password)
    .then((user)=>{
        return user.generateToken()
    })
    .then(function(token){
        res.setHeader('x-auth',token).send({})
    })
    .catch((err)=>{
        res.send(err)
    })
}

module.exports.account=(req,res)=>{
    const {user}=req
    res.send(user)

}

module.exports.logout=(req,res)=>{
    const{user,token}=req
    console.log(user)
        User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
        .then(function(){
            res.send({notice:'successfull logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
}