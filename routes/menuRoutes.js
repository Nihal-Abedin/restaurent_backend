const express = require("express");
const {
  createMenu,
  setResId,
  getAllMenu,
  getSingleMenu,
} = require("../controllers/menuController");
const {
  authMiddleware,
  restrictUser,
} = require("../authentication/authentication");
const router = express.Router({
  mergeParams: true,
});

router.route("/").post(authMiddleware, setResId, createMenu).get(getAllMenu);

router.route("/:menuId").get(getSingleMenu);

module.exports = router;
