const express = require("express");

const {
  createReview,
  setMenuUserId,
  getAllReview,
  getSingleReview,
  deleteReview,
} = require("../controllers/reviewController");
const {
  authMiddleware,
  restrictUser,
} = require("../authentication/authentication");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(authMiddleware, restrictUser("user"), setMenuUserId, createReview)
  .get(getAllReview);
router.route("/:revId").get(getSingleReview).delete(deleteReview);
module.exports = router;
