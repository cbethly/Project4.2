import "./App.css";
import Main from "./components/Main/Main";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Home from "@mui/icons-material/Home";
import Projects from "./Pages/Projects/Projects";
import Navbar from "./components/Navbar";

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const user = localStorage.getItem('token');
  return (
  
    
    <div>
      <Navbar/>
      
      <Routes>
        { user ? <Route path="/" element={<Main/>}/> : <Route path="/" element={<Navigate replace to ="/login"/>} />}
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<NotFound/>} />
        <Route path="/projects" element={<Projects/>} />

      </Routes>
    
    </div>
  );
}

const NotFound = () => {
  return <h1>404 - Not Found</h1>
}

export default App;
