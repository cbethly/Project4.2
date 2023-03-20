import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Reviews from "../Reviews/Reviews";
import "./explore.css";

const Explore = () => {
  const [projectDetails, setProjectDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8000/api/project/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProjectDetails(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  }, [params.id]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>{projectDetails.title}</h1>
          <p>{projectDetails.description}</p>
          <p>{projectDetails.githubLink}</p>

          <iframe
            src={projectDetails.link}
            title={projectDetails.title}
          ></iframe>
          <Reviews />

          {/* display other project details */}

          {/* <pre>{JSON.stringify(projectDetails, null, 2)}</pre> */}
        </div>
      )}
    </div>
  );
};

export default Explore;
