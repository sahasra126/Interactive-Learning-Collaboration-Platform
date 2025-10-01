import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-gradient mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand gradient-text" to="/">LearnHub</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setExpanded(!expanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${expanded ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/create">Create</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/forum">Forum</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
          </ul>
          <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
