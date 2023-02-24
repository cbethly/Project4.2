import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "./styles.css";

function Search() {
  const [searchProject, setSearchProject] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/project")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const filterData = () => {
    return data.filter((item) => {
      return item.name.toLowerCase().includes(searchProject.toLowerCase());
    });
  };

  const handleSearchInputChange = (e) => {
    setSearchProject(e.target.value);
  };

  return (
    <div className="main">
      <div class="input-group">
        <input
          class="form-control border-end-0 border rounded-pill"
          type="text"
          value="search"
          id="example-search-input"
          onChange={handleSearchInputChange}
        />

        <span class="input-group-append">
          <button
            class="btn btn-outline-secondary bg-white border-start-0 border rounded-pill ms-n3"
            type="button"
          >
            <i class="fa fa-search"></i>
          </button>
        </span>
      </div>
    </div>
  );
}

export default Search;
