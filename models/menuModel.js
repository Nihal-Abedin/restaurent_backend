const mongoose = require("mongoose");

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

// Virtual populate
menuSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "menu",
  localField: "_id",
});
menuSchema.pre(/^findOne/, async function (next) {
  this.populate({
    path: "restaurant",
    select: "name",
  });
  // console.log(this.r);
  next();
});
const menuModel = mongoose.model("menu", menuSchema);

module.exports = menuModel;
