import React from "react";

import { Link } from "react-router-dom";
import "./styles.css";

function RedirectButton() {
  return (
    <div>
      <Link to="/form">
        <button className="newButton">Add New Project</button>
      </Link>
    </div>
  );
}

export default RedirectButton;
