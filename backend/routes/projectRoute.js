const express = require("express");
const router = express.Router();
const {
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(/* protect, */ getProject)
  .post(/* protect, */ createProject);
router
  .route("/:id")
  .get(/* protect, */ getProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

module.exports = router;
