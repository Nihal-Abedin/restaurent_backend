const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Please provide a name for the restaurant!"],
  },
  averageRatings: {
    type: Number,
    min: 1,
    max: 5,
    default: 4.5,
  },
  totalReviews: {
    type: Number,
    default: 1,
  },
});

const restaurantModel = mongoose.model("restaurant", restaurantSchema);

module.exports = restaurantModel;
