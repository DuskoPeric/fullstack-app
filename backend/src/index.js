const app = require('./app');

app.listen(process.env.PORT,()=>{
    console.log("run port "+ process.env.PORT)
})