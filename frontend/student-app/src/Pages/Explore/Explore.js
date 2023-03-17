import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
          <p>{projectDetails.link}</p>
          {/* display other project details */}

          {/* <pre>{JSON.stringify(projectDetails, null, 2)}</pre> */}
        </div>
      )}
      {/* <Link
        to={`/explore/${params.id}/edit`} // Pass match.params.id as a prop to the Link component
        className="editLink"
      >
        Edit Project
      </Link> */}
    </div>
  );
};

export default Explore;
