const express = require("express");
const router = express.Router();
const {
  getReviews,
  updateReviews,
  createReviews,
  deleteReviews,
} = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getReviews).post(protect, createReviews);
router.route("/:id").put(protect, updateReviews).delete(protect, deleteReviews);

module.exports = router;
