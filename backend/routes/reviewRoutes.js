const express = require("express");
const router = express.Router();
const {
  getReviews,
  updateReviews,
  setReviews,
  deleteReviews,
} = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getReviews).post(protect, setReviews);
router.route("/:id").put(protect, updateReviews).delete(protect, deleteReviews);

module.exports = router;
