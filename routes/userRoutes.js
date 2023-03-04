const express = require("express");

const router = express.Router();

// controllers
const { getAllUsers } = require("../controllers/userControllers");
const { login, signup } = require("../authentication/authentication");
// routes with Controllers
router.post("/login", login);
router.post("/signup", signup);
// router.route("/").get(getAllUsers);
module.exports = router;
