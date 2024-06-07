import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext(); 

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // Initialize userId to null

    useEffect(()=>{
        const storedUserId = localStorage.getItem('UserId')

        if (storedUserId){
            setUserId(storedUserId)
            setIsLoggedIn(true);
        }
    },[])

  const login = (userId) => {
    setIsLoggedIn(true);
    console.log("UserId", userId)
    setUserId(userId); // Set userId when logging in
    localStorage.setItem('UserId', userId)
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null); // Reset userId when logging out
    localStorage.removeItem('UserId')
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
