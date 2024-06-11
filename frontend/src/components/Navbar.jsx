import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
  // Accessing authentication context
  const { isLoggedIn, logout, userId } = useContext(AuthContext);

  // Hook to navigate between routes
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Function to handle navigate to specified path
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <nav>
      <ul>
        {/* If not logged in, display home button */}
        {!isLoggedIn && (
          <li>
            <button onClick={() => handleNavigate("/")}>Home</button>
          </li>
        )}
        {/* If logged in, display logout and home buttons */}
        {isLoggedIn && (
          <>
            <li>
              <button onClick={handleLogout}>Log Out</button>
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
