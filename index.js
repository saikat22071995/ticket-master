const express=require('express')
const app=express()
const configureDB=require('./configure/database')
const router=require('./configure/routes')
const cors=require('cors')
const port=3025
configureDB()
app.use(express.json())
app.use(cors())
app.use('/',router)
app.get('/ticket-master',(req,res)=>{
    res.send('Welcome to the Ticket-Master App')
})
app.listen(port,()=>{
    console.log('Listening on port',port)
})