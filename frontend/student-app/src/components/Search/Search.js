import React, { useState, useEffect } from "react";
import axios from "axios";

function Search() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered =
      allData &&
      allData.filter((data) => data.c.toLowerCase().includes(searchTerm));
    setFilteredData(filtered || []);
  };

  useEffect(() => {
    axios("http://localhost:8000/api/project")
      .then((res) => {
        console.log(res.data);
        setAllData(res.data);
        setFilteredData(res.data);
      })
      .catch((err) => {
        console.log("Error getting fake data: " + err);
      });
  }, []);

  return (
    <div>
      <div style={{ margin: "0 auto", marginTop: "10%" }}>
        <label>Search:</label>
        <input type="text" onChange={(event) => handleSearch(event)} />
        {filteredData.map((data) => {
          return <div key={data.category}>{data.title}</div>;
        })}
      </div>
    </div>
  );
}

export default Search;
