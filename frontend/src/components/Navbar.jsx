import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Log In</Link></li>
        <li><Link to="/create-account">Create Account</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
