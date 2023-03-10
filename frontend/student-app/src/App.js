import "./App.css";
import Main from "./components/Main/Main";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Projects from "./Pages/Projects/Projects";
import Home from "./Pages/Home/Home";
import Explore from "./Pages/Explore/Explore";

import ProjectForm from "./Pages/Projects/ProjectForm";

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const user = localStorage.getItem("token");
  return (
    <div>
      <Routes>
        {user ? (
          <Route path="/" element={<Main />} />
        ) : (
          <Route path="/" element={<Navigate replace to="/login" />} />
        )}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/form" element={<ProjectForm />} />
        <Route
          path="/explore/:projectId"
          render={(props) => <Explore {...props} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

const NotFound = () => {
  return <h1>404 - Not Found</h1>;
};

export default App;
