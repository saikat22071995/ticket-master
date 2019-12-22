const mongoose=require('mongoose')

const configureDB=()=>{
    //DB configuration
    mongoose.connect('mongodb://localhost:27017/ticket-master',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
    .then(()=>{
        console.log('connected to db')
    })
    .catch(()=>{
        console.log(err)
    })
}
module.exports=configureDB