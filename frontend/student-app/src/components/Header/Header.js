import React from "react";
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../reducers/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="main_container">
      <nav className="navbar">
        <h1>Student Portfolio</h1>
        <ul>
          {user ? (
            <li>
              <button className="white_btn" onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          ) : (
            <>
              {" "}
              <li>
                <Link to="/login">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <FaUser /> Signup
                </Link>
              </li>{" "}
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
