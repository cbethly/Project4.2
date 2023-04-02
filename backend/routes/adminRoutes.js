const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAdmin,
} = require("../controllers/adminController");
const removeUser = require("../middleware/removeUser");
const protect = require("../middleware/authAdminMiddleware");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/admin", protect, getAdmin);
router.delete("/users/:userId", protect, removeUser);

module.exports = router;
