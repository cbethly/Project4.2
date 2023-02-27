import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import './styles.css'

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
        <Card key={project.title} style={{ width: "18rem" }} className='card'>
          <Card.Body>
            <Card.Title className="title">{project.title}</Card.Title>
            <Card.Text className="category">{project.category}</Card.Text>
            <Card.Text className="description">{project.description}</Card.Text>
            <Button variant="primary" className="projectButton"><a href={project.link} className='pLink'>Go to project</a></Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ProjectCards;
