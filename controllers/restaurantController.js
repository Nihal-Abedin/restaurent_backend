const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Restaurant = require("../models/restaurantModel");
exports.createRestaurant = catchAsync(async (req, res, next) => {
  if (!req.body.name) {
    return next(new AppError("Please provide a name for the restaurant!"));
  }
  const newRes = await Restaurant.create(req.body);
  res.status(201).json({
    status: 200,
    message: "Success",
    data: newRes,
  });
});

exports.getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.find();
  res.status(200).json({
    status: 200,
    message: "Success",
    data: {
      totalRestaurants: restaurants.length,
      restaurants,
    },
  });
});
exports.getSingleRestaurant = catchAsync(async (req, res, next) => {
  const { resId } = req.params;
  const restaurant = await Restaurant.findById(resId);
  if (!restaurant) {
    return next(new AppError("No Restaurant with this ID", 400));
  }
  res.status(200).json({
    staus: 200,
    message: "Success",
    data: {
      restaurant,
    },
  });
});
