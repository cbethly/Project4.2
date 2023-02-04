import "./App.css";
import Header from "./components/header";
import Register from "./components/registrationForm";
import Login from "./components/loginForm";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Header />

      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navheader">
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/Login"} className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/Register"} className="nav-link">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </nav>{" "}
          <br />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register/>} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
