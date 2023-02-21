import React from "react";
import Home from "../Pages/Home/Home";
import Projects from "../Pages/Projects/Projects";
import Explore from "@mui/icons-material/Explore";
import { Routes, Route } from 'react-router-dom';

// import { Link, useMatch, useResolvedPath} from "react-router-dom";


// const CustomLink = ({ to, children, ...props }) => {
//     const resolvedPath = useResolvedPath(to);

//   const isActive = useMatch({path: resolvedPath.pathname, end: true});

//   return (
    
//     <li className={isActive ? "active" : ""}>
//       <Link to={to} {...props}>
//         {children}
//       </Link>
//     </li>
//   );
// };

const Navbar = () => {

  return (
    <nav className="nav">
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="explore" element={<Explore />} />
      </Routes>
  
     
    </nav>
    
   
  );
  
};

export default Navbar;
