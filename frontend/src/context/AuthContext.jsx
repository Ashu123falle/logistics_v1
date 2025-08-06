import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    userId: null,
    role: null,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuth({
          isAuthenticated: true,
          userId: decoded.userId,
          role: decoded.authorities,
          token,
        });
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      isAuthenticated: false,
      userId: null,
      role: null,
      token: null,
    });
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
