const express=require('express')
const app=express()
const configureDB=require('./configure/database')
const router=require('./configure/routes')
const cors=require('cors')
const path=require('path')
const port=process.env.PORT || 3025;
configureDB()
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, './client/build/')))
app.use('/api',router)
app.get('*',(req,res)=> {
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
});
app.get('/ticket-master',(req,res)=>{
    res.send('Welcome to the Ticket-Master App')
})
app.listen(port,()=>{
    console.log('Listening on port',port)
})