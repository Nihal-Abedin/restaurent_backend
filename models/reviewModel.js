const mongoose = require("mongoose");
const Menu = require("./menuModel");
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Plese give yout review!"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user_x",
  },
  menu: {
    type: mongoose.Schema.ObjectId,
    ref: "menu",
  },
});
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name ",
  });

  next();
});
// statics
reviewSchema.statics.calcAvgRatings = async function (menuId) {
  const stats = await this.aggregate([
    {
      $match: { menu: menuId },
    },
    {
      $group: {
        _id: "$menu",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  console.log(stats);
  if (stats.length > 0) {
    await Menu.findByIdAndUpdate(menuId, {
      totalReviews: stats[0].nRating,
      avgRating: stats[0].avgRating,
    });
  } else {
    await Menu.findByIdAndUpdate(menuId, {
      totalReviews: stats[0].nRating,
      avgRating: stats[0].avgRating,
    });
  }
};

// Document Middleware

reviewSchema.post("save", function () {
  this.constructor.calcAvgRatings(this.menu);
});
// Query Middleware
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.query = await this.findOne();
  console.log(this.query, "gg");
  next();
});
reviewSchema.post(/^findOneAnd/, async function () {
  await this.query.constructor.calcAvgRatings(this.query.menu);
});

const reviewModel = mongoose.model("Review", reviewSchema);

module.exports = reviewModel;
