import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; 

const Navbar = () => {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () =>{
    logout();
    navigate('/');
  }

  const handleNavigate = (path) => {
    // console.log("User Id ", userId)
    navigate(path);
  }

  return (
    <nav>
      <ul>
        {!isLoggedIn && (
          <li>
            <button onClick={() => handleNavigate('/')}>
            Home
          </button>
          </li>
        )}
        {isLoggedIn && (
          <>
            <li>
              <button onClick={handleLogout}>
                Log Out
              </button>
            </li>
            <li>
            <button onClick={() => handleNavigate(`/loggedin/${userId}`)}>
                Home
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
