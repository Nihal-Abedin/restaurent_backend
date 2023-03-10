const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
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
  totalRating: {
    type: Number,
    default: 1,
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
});
const menuModel = mongoose.model("menu", menuSchema);

module.exports = menuModel;
