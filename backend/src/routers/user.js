const express = require("express");
const User = require("../models/userModel");
const auth = require("../middleware/auth");
const randomBytes = require('randombytes');
const { sendConfirmationEmail, sendResetEmail } = require("../emails/account");


const router = new express.Router();

//get user data
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

//register user
router.post("/user", async (req, res) => {
  try {
    await User.isUserExist(req.body.name, req.body.email);
    const activationToken=randomBytes(16).toString('hex')
    const bodyObject={...req.body, activationToken}
    const user = new User(bodyObject);
    await user.save();
    sendConfirmationEmail(req.body.email, req.body.name, activationToken);
    await user.generateToken();
    res.send(user);
  } catch (err) {
    //console.log(Object.keys(err.errors))
    res.status(500).send(err.message);
  }
});

//login user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByNameAndPassword(
      req.body.email,
      req.body.password
    );
    if(!user.active){
      throw new Error('You are not confirm email');
    }
    const token = await user.generateToken();
    res.send({ user, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:token/confirm", async (req,res) => {
  try {
    const user = await User.findOne({activationToken: req.params.token});
    if (user) {
      if (user.active) {
        res.send('You already active your account');
      }else{
        user.active=true;
        user.save();
        res.send('You successfully activate account');
      }
    }else{
      throw new Error("That user doesn't exist");
    }
  } catch (error) {
    res.status(404).send(error.message)
  }

});

router.post("/send-email", async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});
    if(user){
      user.resetToken=randomBytes(16).toString('hex');
      await user.save();
      sendResetEmail(user);
      res.send(`Hi ${user.name}, we send you email to ${user.email}`);
    }else{
      throw new Error('User with that email does not exist');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/set-password", async (req,res) => {
  try {
    const user = await User.findOne({resetToken: req.body.token});
    if (user) {
        user.password=req.body.password;
        user['resetToken']=undefined;
        user.save();
        res.send('You successfully reset password');
    }else{
      throw new Error("That user doesn't exist");
    }
  } catch (error) {
    res.status(404).send(error.message)
  }

});

module.exports = router;
