import React from "react";
import { Link } from "react-router-dom";


const DashboardAction = () => {
  return (
    <div>
      <div class="dash-buttons">
        <Link to="/edit-profile" className="btn">
          <i className="fas fa-user-circle"></i> Edit Profile
        </Link>
        <Link to="/add-experience" className="btn">
          <i className="fab fa-black-tie"></i> Add Experience
        </Link>
        <Link to="/add-education" className="btn">
          <i className="fas fa-graduation-cap "></i> Add Education
        </Link>
      </div>
    </div>

    
  );
};

export default DashboardAction;
