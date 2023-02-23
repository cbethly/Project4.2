import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ProjectCards() {
  const [projectDetails, setProjectDetails] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/project", {})
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProjectDetails(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      {projectDetails.map((project) => (
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{project.title}</Card.Title>
            <Card.Text>{project.description}</Card.Text>
            <Button variant="primary">{project.link}</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ProjectCards;
