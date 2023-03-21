import React from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <nav className="nav">
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
      </nav>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/dark-navy-blue-background_551880-12.jpg?w=1060')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          width: "100%",
          padding: "0 2rem",
          color: "white",
        }}
      >
        <h1
          style={{
            margin: "0 1rem",
            letterSpacing: "0.5rem",
            textAlign: "center",
          }}
        >
          Welcome to Student Portfolio {user && user.name}
        </h1>

        <div style={{ flex: 1, textAlign: "right" }}>
          {" "}
          <img
            src="https://thedigitalprojectmanager.b-cdn.net/wp-content/uploads/2022/04/What-Is-A-Project-Manager-Portfolio-featured-image-800x800.png"
            alt="nature"
            style={{ height: "80vh", width: "50vw", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
