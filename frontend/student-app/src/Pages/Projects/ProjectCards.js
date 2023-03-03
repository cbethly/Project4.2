import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import './styles.css'

function ProjectCards() {
  const [projectDetails, setProjectDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentItems, setCurrentItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/api/project", {})
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProjectDetails(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (projectDetails.length > 0) {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const newCurrentItems = projectDetails.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentItems(newCurrentItems);
    }
  }, [currentPage, itemsPerPage, projectDetails]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(projectDetails.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {
    if (projectDetails.length > 0) {
      const filteredItems = projectDetails.filter((project) =>
        project.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const newCurrentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentItems(newCurrentItems);
    }
  }, [currentPage, itemsPerPage, projectDetails, searchQuery]);
  

  return (
    <div>
       <div className="search-container">
  <input
    type="text"
    placeholder="Search categories"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>

    <div className="card-container">
     
      {isLoading && <div>Loading...</div>}
      {!isLoading && currentItems.map((project) => (
          <Card key={`${project.title}-${project.category}`} style={{ width: "18rem" }} className='card'>
          <Card.Body>
            <Card.Title className="title">{project.title}</Card.Title>
            <Card.Text className="category">{project.category}</Card.Text>
            <Card.Text className="description">{project.description}</Card.Text>
            <Button variant="primary" className="projectButton"><a href={project.link} className='pLink'>Go to project</a></Button>
          </Card.Body>
        </Card>
      ))}
      {!isLoading && (
        <div className="pagination-container">
          <div className="pagination">
            {pageNumbers.map((number) => (
              <Button key={number} variant="outline-secondary" onClick={() => setCurrentPage(number)}>
                {number}
              </Button>
            ))}
          </div>
          <div>
            <select value={itemsPerPage} onChange={(e) => setItemsPerPage(parseInt(e.target.value))}>
              <option value={10}>10 per page</option>
              <option value={12}>12 per page</option>
              <option value={15}>15 per page</option>
            </select>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default ProjectCards;
