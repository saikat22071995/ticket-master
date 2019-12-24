const mongoose=require('mongoose')

const configureDB=()=>{
    //DB configuration
    mongoose.connect('process.env.MONGODB_URL',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
    .then(()=>{
        console.log('database connected:'+process.env.MONGODB_URL)
    })
    .catch(()=>{
        console.log('error to db:'+process.env.MONGODB_URL)
    })
}
module.exports=configureDB