const Project = require("../models/projectModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc GetProject
//@route GET /api/project

const getProject = asyncHandler(async (req, res) => {
  if (req.user) {
    const project = await Project.find({ user: req.user.id });
    res.status(200).json(project);
  } else {
    const project = await Project.find({});
    res.status(200).json(project);
  }
});

const setProject = asyncHandler(async (req, res) => {
  const { title, description, link, user } = req.body;
  if (!title || !description || !link || !user) {
    res.status(400);
    throw new Error("Please add all the fields");
  }

  console.log(req.body)

  const project = await Project.create({
    title,
    description,
    link,
    user,
  });

  console.log(project)
  res.status(200).json(project);
});

//@route PUT/api/reviews
//@access Private

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error("project not found");
  }

  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the logged in user matches the project user

  if (project.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedProject);
});

//@desc DeleteProject
//@route DELETE /api/projecty
//@access Private

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error("Project not found");
  }

  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the logged in user matches the project user

  if (project.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await project.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProject,
  setProject,
  updateProject,
  deleteProject,
};
