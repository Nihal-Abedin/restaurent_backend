const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Restaurant = require("../models/restaurantModel");
const Menu = require("../models/menuModel");

exports.setResId = (req, res, next) => {
  const { resId } = req.params;
  req.body.restaurant = resId;

  next();
};
exports.createMenu = catchAsync(async (req, res, next) => {
  const menu = await Menu.create(req.body);
  res.status(201).json({
    status: 200,
    message: "Success",
    data: menu,
  });
});
exports.getAllMenu = catchAsync(async (req, res, next) => {
  const { resId } = req.params;

  const menues = await Menu.find({ restaurant: resId });
  res.status(200).json({
    staus: 200,
    message: "Success",
    data: {
      menues,
    },
  });
});

exports.getSingleMenu = catchAsync(async (req, res, next) => {
  const { menuId } = req.params;

  const menu = await Menu.findById(menuId).populate("reviews");

  if (!menu) {
    return next(new AppError("No Menu with this ID", 400));
  }
  res.status(200).json({
    staus: 200,
    message: "Success",
    data: {
      menu,
    },
  });
});

exports.updateMenu = catchAsync(async (req, res, next) => {
  const { resId, menuId } = req.params;

  const menu = await Menu.findByIdAndUpdate(
    menuId,
    {
      ...req.body,
      restaurant: resId,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: 200,
    message: "Success",
    data: {
      menu,
    },
  });
});
