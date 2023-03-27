const Project = require("../models/projectModel");
const asyncHandler = require("express-async-handler");

//@desc GetProject
//@route GET /api/project/:id
//@access Public

const getProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (id) {
    const project = await Project.findById(id);
    if (!project) {
      res.status(400);
      throw new Error("Project not found");
    }

    res.status(200).json(project);
  } else {
    const projects = await Project.find(req.user ? { user: req.user.id } : {});
    res.status(200).json(projects);
  }
});

//@desc GetProjects
//@route GET /api/project
//@access Public

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find(req.user ? { user: req.user.id } : {});
  res.status(200).json(projects);
});

//@desc Create Project
//@route POST /api/project
//@access Private

const createProject = asyncHandler(async (req, res) => {
  const { title, category, description, link, githubLink } = req.body;
  if (!title || !category || !description || !link || !githubLink) {
    res.status(400);
    throw new Error("Please add all the fields");
  }

  console.log(req.body);

  const project = await Project.create({
    title,
    category,
    description,
    link,
    githubLink,
    user: req.user.id,
  });

  console.log(project);
  res.status(200).json(project);
});

//@desc Update Project
//@route PUT /api/project/:id
//@access Private

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(400);
    throw new Error("project not found");
  }

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the logged in user matches the project user

  if (project.user.toString() !== req.user.id) {
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

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the logged in user matches the project user

  if (project.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await project.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProject,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
