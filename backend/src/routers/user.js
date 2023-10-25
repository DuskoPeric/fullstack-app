const express = require('express');
const User=require('../models/userModel');
const auth =require('../middleware/auth')

const router = new express.Router();

//gett all other users
router.get('/users',auth,async (req,res)=>{
    const sortBy={};
    if (req.query.sortBy) {
        const parts=req.query.sortBy.split(':');
        sortBy[parts[0]]=parts[1]==='desc'? -1:1;
    }
    try {
        const users=await User.find({_id:{'$ne':req.user.id}}).skip(0).limit(0).sort(sortBy);
        res.send(users);
    } catch (error) {
        res.status(500).send();
    }
})

//get user data
router.get('/user',auth,async (req,res)=>{
    try {
        const user=await User.findById(req.user.id);
        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
})

//register user
router.post('/user',async (req,res)=>{
    try {
        await User.isUserExist(req.body.name,req.body.email);
        const user=new User(req.body);
        await user.save();
        await user.generateToken();
        res.send(user)
    } catch (err) {
        //console.log(Object.keys(err.errors))
        res.status(500).send(err.message)
    }
})

//login user
router.post('/login',async (req,res)=>{
    try {
        const user= await User.findByNameAndPassword(req.body.email, req.body.password);
        const token=await user.generateToken();
        res.send({user,token})
    } catch (err) {
        res.status(500).send(err.message)
    }

})

router.post('/logout', auth, async (req,res)=>{
    try {
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error);
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
