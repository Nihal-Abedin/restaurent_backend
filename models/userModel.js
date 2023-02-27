const mongoose = require("mongoose");
const isValidCheck = require("validatore");

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Please provide your email!"],
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
});
const User = mongoose.model("user_x", UserSchema);

module.exports = User;
