import "./App.css";
import Main from "./components/Main/Main";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Projects from "./Pages/Projects/Projects";
import Explore from "./Pages/Explore/Explore";
import Home from "./Pages/Home/Home";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProjectForm from "./Pages/Projects/ProjectForm";

import { Routes, Route } from "react-router-dom";

function App() {
  // const user = localStorage.getItem("token");
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<Explore />} />
        <Route path="/form" element={<ProjectForm />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

const NotFound = () => {
  return <h1>404 - Not Found</h1>;
};

export default App;
