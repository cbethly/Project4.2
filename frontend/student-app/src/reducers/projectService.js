import axios from "axios";

const API_URL = "http://localhost:5000/api/project/";

//create review

const createProject = async (projectData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, projectData, config);

  return response.data;
};

//get user project

const getProject = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// delete project

const deleteProject = async (projectId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + projectId, config);

  return response.data;
};

const projectService = {
  createProject,
  getProject,
  deleteProject,
};

export default projectService;
