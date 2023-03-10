const mongoose = require("mongoose");
const isValidCheck = require("validator");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    unique: true,
    validate: {
      validator: function (v) {
        return isValidCheck.isEmail(v);
      },
      message: (props) => `${props.value} is not a valid Email!`,
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
  },
  confirm_password: {
    type: String,
    required: [true, "Please confirm your password!"],
    validate: {
      validator: function (v) {
        return this.password === v;
      },
      message: `Password and Confirm Password are not same!`,
    },
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
});

// Document Middleware

UserSchema.pre("save", async function (next) {
  if (this.password.length < 5) {
    return next(new AppError("password least contain 5 characters", 400));
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.confirm_password = undefined;
  next();
});

// Schema methods

UserSchema.methods.correctPassword = function (hasedPassword, curPass) {
  return bcrypt.compare(curPass, hasedPassword);
};

const User = mongoose.model("user_x", UserSchema);

module.exports = User;
