import React from "react";

import { Link } from "react-router-dom";

function RedirectButton() {
  return (
    <div>
      <Link to="/form">
        <button>New Project</button>
      </Link>
    </div>
  );
}

export default RedirectButton;
