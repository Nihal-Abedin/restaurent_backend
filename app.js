const express = require("express");
const app = express();

// routers
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use("/api/v1/user", userRoutes);
module.exports = app;
