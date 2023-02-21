import React from "react";

import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div>
   
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/explore">Explore</Link>
        </li>
      </ul>
     
      
    </div>
    
  );
};

export default Home;
