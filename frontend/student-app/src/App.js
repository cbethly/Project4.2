import "./App.css";
import Main from "./components/Main/Main";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Home from "@mui/icons-material/Home";
import Projects from "./Pages/Projects/Projects";
import Explore from "@mui/icons-material/Explore";
import RedirectButton from './Pages/Projects/RedirectButton'
import ProjectForm from './Pages/Projects/ProjectForm';


import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const user = localStorage.getItem('token');
  return (
  
    
    <div>
      {/* <Navbar/> */}
      
      <Routes>
        { user ? <Route path="/" element={<Main/>}/> : <Route path="/" element={<Navigate replace to ="/login"/>} />}
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<NotFound/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/" element={<RedirectButton/>} />
        <Route path="/form" element={<ProjectForm/>} />
        

      </Routes>
    
    </div>
  );
}

const NotFound = () => {
  return <h1>404 - Not Found</h1>
}

export default App;
