 const User=require('../models/userModel');
 const jwt = require('jsonwebtoken');

const auth =async(req,res,next)=>{
    try {
        const token =req.header('Authorization').replace('Bearer ', '');
        const decoded= jwt.verify(token, 'pericdevelopment')
        const user=await User.findOne({id:decoded._id, 'tokens.token':token})
        if (!user) {
            throw new Error()
        }
        req.user=user;
        req.token=token;
        next()
    } catch (error) {
        res.status(404).send({error:"Not Authenificate"})
    }
    
}

module.exports=auth