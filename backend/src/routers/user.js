const express = require('express');
const User=require('../models/userModel');

const router = new express.Router();

//gett all users
router.get('/users',async (req,res)=>{
    try {
        const users=await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send();
    }
})

//register user
router.post('/user',(req,res)=>{
    const user=new User(req.body);
    user.save().then(()=>{
        res.send(user)
    }).catch((err)=>{
        console.log(Object.keys(err.errors))
        res.status(500).send(err.message)
    })
})

//login user
router.post('/login',async (req,res)=>{
    try {
        const user= await User.findByNameAndPassword(req.body.name, req.body.password)
        res.send(user)
    } catch (err) {
        res.status(500).send(err.message)
    }

})

//delete all users
router.post('/delete-users',async (req,res)=>{
    try {
        const response=await User.deleteMany();
        res.send(response)
    } catch (error) {
        res.send('error')
    }
})



module.exports=router;
