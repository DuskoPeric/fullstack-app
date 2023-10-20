const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
  }
});

userSchema.statics.findByNameAndPassword = async (name, password) => {
  const user = await User.findOne({ $or: [{ email: name }, { name }] });

  if (!user) {
    throw new TypeError("There is no user with that name or email");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new TypeError("Password not match");
  }

  return user;
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
