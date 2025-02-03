import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// Create a custom hook to use the context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem("username") || null);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || null);

  const login = (username, token) => {
    setUsername(username);
    setAuthToken(token);
    localStorage.setItem("username", username);
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setUsername(null);
    setAuthToken(null);
    localStorage.removeItem("username");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ username, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
