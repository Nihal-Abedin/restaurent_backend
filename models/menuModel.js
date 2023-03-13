const mongoose = require("mongoose");
const Restaurant = require("../models/restaurantModel");
const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "A menu must have a name!"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 4,
    },
    totalReviews: {
      type: Number,
      default: 1,
    },
    avgRating: {
      type: Number,
      min: 1,
      max: 5,
      default: 4,
      set: (val) => Math.round(val * 10) / 10,
    },
    restaurant: {
      type: mongoose.Schema.ObjectId,
      ref: "restaurant",
    },
    items: String,
    servesOn: {
      type: [String],
      default: ["sunday"],

      enum: [
        "sunday",
        "monday",
        "tuesday",
        "wednessday",
        "thursday",
        "friday",
        "saturday",
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

menuSchema.statics.calcAvgRating = async function (resId) {
  const stats = await this.aggregate([
    {
      $match: { restaurant: resId },
    },
    {
      $group: {
        _id: "$restaurant",
        nMenues: { $sum: 1 },
        avgRating: { $avg: "$avgRating" },
      },
    },
  ]);
  if (stats.length > 0) {
    await Restaurant.findByIdAndUpdate(resId, {
      averageRatings: stats[0].avgRating,
    });
  } else {
    await Restaurant.findByIdAndUpdate(resId, {
      averageRatings: 4.5,
    });
  }
  console.log(stats);
};
// Virtual populate
menuSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "menu",
  localField: "_id",
});
menuSchema.pre(/^find/, async function (next) {
  this.populate({
    path: "restaurant",
    select: "name",
  });
  // console.log(this.r);
  next();
});
menuSchema.pre(/^findOneAnd/, async function () {
  this.query = await this.model.findOne(this.getQuery());
});
menuSchema.post(/^findOneAnd/, function () {
  // console.log(this.query, "From Menu Model");
  this.query.constructor.calcAvgRating(this.query.restaurant._id);
});
const menuModel = mongoose.model("menu", menuSchema);

module.exports = menuModel;
