const express = require("express");
const app = express();
const GlobalErrorHandler = require("./controllers/errorController");
// routers
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use("/api/v1/users", userRoutes);

app.use(GlobalErrorHandler);
module.exports = app;
