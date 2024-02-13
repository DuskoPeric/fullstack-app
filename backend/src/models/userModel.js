const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: false
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      return validator.isEmail(value);
    }
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: Buffer,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  activationToken: {
    type: String,
  },
  resetToken: {
    type: String,
  },
});

userSchema.statics.findByNameAndPassword = async (email, password) => {
  const user = await User.findOne({ $or: [{ email }, { name: email }] });

  if (!user) {
    throw new TypeError("There is no user with that name or email");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new TypeError("Password not match");
  }

  return user;
};

userSchema.statics.isUserExist = async (name, email) => {
  let user = await User.findOne({ email });

  if (user) {
    throw new TypeError("User with that email is already registered");
  }
  user = await User.findOne({ name });

  if (user) {
    throw new TypeError("Name is already ocupied");
  }
};

userSchema.methods.generateToken = async function() {
  const user = this;
  const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//to send data without secret info 
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

async function convertPassword(next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
}

userSchema.pre(["save"], convertPassword);

const User = mongoose.model("User", userSchema);

module.exports = User;
