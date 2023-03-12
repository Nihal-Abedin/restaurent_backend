const express = require("express");
const {
  createMenu,
  setResId,
  getAllMenu,
  getSingleMenu,
  updateMenu,
} = require("../controllers/menuController");
const {
  authMiddleware,
  restrictUser,
} = require("../authentication/authentication");
const reviewRoutes = require("./reviewRoutes");
const router = express.Router({
  mergeParams: true,
});
router.use("/:menuId/reviews", reviewRoutes);

router.route("/").post(authMiddleware, setResId, createMenu).get(getAllMenu);

router.route("/:menuId").get(getSingleMenu).patch(updateMenu);

module.exports = router;
