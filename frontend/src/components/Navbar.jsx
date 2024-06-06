import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; 

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () =>{
    logout();
    navigate('/');
  }

  const handleNavigate = (path) => {
    navigate(path);
  }

  return (
    <nav>
      <ul>
        {!isLoggedIn && (
          <li>
            <button onClick={() => handleNavigate('/login')}>
              Log In
            </button>
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <button onClick={() => handleNavigate('/create-account')}>
              Create Account
            </button>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={handleLogout}>
              Log Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
