const express = require("express");

const router = express.Router();

// controllers
const { getAllUsers } = require("../controllers/userControllers");
// routes with Controllers
router.route("/").get(getAllUsers);
module.exports = router;
