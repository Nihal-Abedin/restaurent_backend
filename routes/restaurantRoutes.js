const express = require("express");
const MenuRouter = require("./menuRoutes");
const router = express.Router();
const {
  createRestaurant,
  getAllRestaurants,
  getSingleRestaurant,
} = require("../controllers/restaurantController");
const {
  authMiddleware,
  restrictUser,
} = require("../authentication/authentication");
// router.use(authMiddleware);
router.use("/:resId/menu", MenuRouter);
router
  .route("/")
  .post(authMiddleware, restrictUser("admin"), createRestaurant)
  .get(getAllRestaurants);

router.route("/:resId").get(getSingleRestaurant);

module.exports = router;
