const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Project = require("../models/projectModel");

const removeUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;

  // Remove user and their projects
  await User.findByIdAndRemove(userId);
  await Project.deleteMany({ user: userId });

  res.status(200).json({ message: "User and their projects removed" });
});

module.exports = removeUser;
