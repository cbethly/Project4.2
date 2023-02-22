import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ProjectForm from './ProjectForm';

function RedirectButton() {



  return (
    <div>
      <Link to="/form">
        <button>New Project</button>
      </Link>
    </div>
  
  );
}

export default RedirectButton;
