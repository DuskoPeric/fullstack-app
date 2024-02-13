const express = require('express');
var cors = require('cors')
require('./db/mongoose');
const userRouter=require('./routers/user')

const app=express();
app.use(cors())

app.use(express.json())
app.use(userRouter);


app.listen(process.env.PORT,()=>{
    console.log("run port "+ process.env.PORT)
})