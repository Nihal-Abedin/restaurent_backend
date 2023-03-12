const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Restaurant = require("../models/restaurantModel");
const Menu = require("../models/menuModel");
const Review = require("../models/reviewModel");

exports.setMenuUserId = (req, res, next) => {
  req.body.user = req.user.id;
  req.body.menu = req.params.menuId;

  next();
};

exports.createReview = catchAsync(async (req, res, next) => {
  const review = await Review.create({
    ...req.body,
    user: req.user.id,
    menu: req.params.menuId,
  });
  res.status(201).json({
    status: 201,
    message: "Success!",
    data: { review },
  });
});

exports.getAllReview = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(201).json({
    status: 201,
    message: "Success!",
    data: { reviews },
  });
});

exports.getSingleReview = catchAsync(async (req, res, next) => {
  const { revId } = req.params;
  const review = await Review.findById(revId);
  if (!review) {
    return next(new AppError("There is no review with this Id", 400));
  }
  res.status(200).json({
    status: 200,
    message: "Success!",

    data: {
      review,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { revId } = req.params;
  console.log(req.body);
  const review = await Review.findByIdAndUpdate(revId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!review) {
    return next(new AppError("There is no review with this Id", 400));
  }
  res.status(200).json({
    status: 200,
    message: "Success",
    data: {
      review,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { revId } = req.params;
  console.log(revId);
  await Review.findByIdAndDelete(revId);

  res.status(200).json({
    message: "Suceccfully deleted!",
  });
});
