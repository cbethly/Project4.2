import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Explore = ({ match }) => {
  console.log(match);
  const { projectId } = useParams(); // use useParams hook to get the project ID from the URL
  console.log(projectId);

  // Fetch the project details from the API
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(projectId);
    if (projectId) {
      fetch(`http://localhost:8000/api/project/${projectId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch project details.");
          }
          return res.json();
        })
        .then((data) => {
          setProject(data);
          console.log(project);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [projectId, project]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log(project);

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        Visit Project
      </a>
    </div>
  );
};

export default Explore;
