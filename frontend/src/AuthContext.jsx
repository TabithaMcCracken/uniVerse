import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for authentication information
export const AuthContext = createContext(); 

// Custom hook to access the authentication context
export const useAuth = () => useContext(AuthContext);

// Authentication provider component
export const AuthProvider = ({ children }) => {
  // State to track whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State to store the user ID
  const [userId, setUserId] = useState(null); // Initialize userId to null
 
    // Check local storage for saved user ID on component mount
    useEffect(()=>{
        const storedUserId = localStorage.getItem('UserId')

        if (storedUserId){
          // If user ID is found in local storage, set it and mark user as logged in
            setUserId(storedUserId)
            setIsLoggedIn(true);
        }
    },[])

  // Function to log in the user
  const login = (userId) => {
    // Set isLoggedIn to true and store the user ID in local storage
    setIsLoggedIn(true);
    console.log("UserId", userId)
    setUserId(userId); // Set userId when logging in
    localStorage.setItem('UserId', userId)
  };

  // Function to log out the user
  const logout = () => {
    // Set isLoggedIn to false, reset userId, and remove user ID from local storage
    setIsLoggedIn(false);
    setUserId(null); // Reset userId when logging out
    localStorage.removeItem('UserId')
  };

  // Provide the authentication context with values for isLoggedIn, userId, login, and logout
  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
