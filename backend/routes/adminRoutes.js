const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAdmin,
} = require("../controllers/adminController");
const protect = require("../middleware/authAdminMiddleware");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/admin", protect, getAdmin);

module.exports = router;
