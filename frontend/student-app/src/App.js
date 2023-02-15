import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import Explore from "./Pages/Explore";
import Sidebar from "./components/Sidebar";

import Register from "./components/registrationForm";
import Login from "./components/loginForm";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <div className="container">
        <Routes>
        
          <Route path="/" element={<Home/>}/>
          <Route path="/Projects" element={<Projects/>} />
          <Route path="/Explore" element={<Explore/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
