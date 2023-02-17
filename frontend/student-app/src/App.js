import "./App.css";
import Main from "./components/Main/Main";
import Login from "./components/Login/login";


import Signup from "./components/Signup/signup";


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const user = localStorage.getItem('token')
  return (
    <div>
   
      <div>
        <Routes>
        
        { user &&<Route path="/" element={<Main/>}/>}
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Navigate replace to ="/login"/>} />
         
        </Routes>
      </div>
    </div>
  );
}

export default App;
