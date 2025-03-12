import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state 🚀

  useEffect(() => {
    const token = Cookies.get("authToken");
    const storedUsername = Cookies.get("username");
    
    if (token) {
      setAuthToken(token);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }

    setLoading(false); // Stop loading after fetching cookies ✅
  }, []);

  const login = (username, token) => {
    setUsername(username);
    setAuthToken(token);
    Cookies.set("authToken", token, { expires: 7 });
    Cookies.set("username", username, { expires: 7 });
  };

  const logout = () => {
    setUsername(null);
    setAuthToken(null);
    Cookies.remove("authToken");
    Cookies.remove("username");
  };

  if (loading) {
    return <div>Loading...</div>; // Prevents redirection before cookies load
  }

  return (
    <AuthContext.Provider value={{ username, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
