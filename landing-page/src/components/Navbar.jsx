import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="nav-logo">
          <img src="/logo.png" alt="MOV Stay Logo" />
          <span>MOV Stay</span>
        </div>
        <ul className="nav-links">
          <li><a href="#home" className="nav-link">Home</a></li>
          <li><a href="#modules" className="nav-link">Modules</a></li>
          <li><a href="#team" className="nav-link">Team</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
