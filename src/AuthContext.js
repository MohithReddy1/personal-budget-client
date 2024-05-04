import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      const expirationTime = localStorage.getItem('expirationTime');
      if (expirationTime && Date.now() > parseInt(expirationTime, 10)) {
        // Token has expired, so consider the user as not logged in
        return false;
      }
      return localStorage.getItem('isLoggedIn') === 'true';
    } catch (error) {
      console.error('Error reading isLoggedIn from localStorage', error);
      return false;
    }
  });

  const login = () => {
    setIsLoggedIn(true);
    const expirationTime = Date.now() + 60000; // Adjust the expiration time as needed
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('expirationTime', expirationTime.toString());
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('expirationTime');
  };

  // Check expiration time on each render to automatically log out if expired
  useEffect(() => {
    const checkExpiration = () => {
      const expirationTime = localStorage.getItem('expirationTime');
      if (expirationTime && Date.now() > parseInt(expirationTime, 10)) {
        logout();
      }
    };

    checkExpiration();
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext) || {};
};
