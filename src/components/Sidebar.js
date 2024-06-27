import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-link">Home</Link>
      <Link to="/astronomy-stuff-of-the-day" className="sidebar-link">astronomy-stuff-of-the-day</Link>
      <Link to="/Asteroids" className="sidebar-link">Asteroids</Link>
      <Link to="/CMEData" className="sidebar-link">CMEData</Link>
    </div>
  );
};

export default Sidebar;
