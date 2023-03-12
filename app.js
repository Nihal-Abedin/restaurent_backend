const express = require("express");
const app = express();
const GlobalErrorHandler = require("./controllers/errorController");
// routers
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/menuRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use(express.json());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/restaurants", restaurantRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use(GlobalErrorHandler);
module.exports = app;
