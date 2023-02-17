import React from "react";
import { Link, useMatch, useResolvedPath} from "react-router-dom";


const CustomLink = ({ to, children, ...props }) => {
    const resolvedPath = useResolvedPath(to);

  const isActive = useMatch({path: resolvedPath.pathname, end: true});

  return (
    
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};

const Navbar = () => {

  return (
    <nav className="nav">
      <ul>
        <Link to={"/"}>Home</Link>
       
        <CustomLink to={"/Projects"}>Projects</CustomLink>
        <CustomLink to={"/Explore"}>Explore</CustomLink>
      </ul>
      <div className="search-box">
        <input
          type="text"
          name="search"
          maxLength="60"
          placeholder="Search..."
          required
        />
        
      </div>
     
    </nav>
    
   
  );
  
};

export default Navbar;
