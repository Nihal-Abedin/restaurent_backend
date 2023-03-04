const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const generateJWT = (newUser) => {
  return jwt.sign({ id: newUser }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { email, password, confirm_password, name } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    confirm_password,
  });
  const token = generateJWT(newUser._id);
  res.status(200).json({
    status: 200,
    message: "Successfully Signed up!",
    user: newUser,
    token,
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new AppError("Please provide your creadentials to login!", 401)
    );
  }
  const newUser = await User.findOne({ email: email });
  // console.log(newUser);
  if (!newUser) {
    return next(new AppError("No user with this Email!", 400));
  }
  if (!(await newUser.correctPassword(newUser.password, password))) {
    return next(new AppError("Please Provide correct Email or Password!", 401));
  }
  const token = generateJWT(newUser._id);

  res.status(200).json({
    status: 200,
    message: "Succesfully Logged in!",
    token,
  });
});
