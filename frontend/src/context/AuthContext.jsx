// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    token: null,
    userId: null,
    role: null,
  });

  const [loading, setLoading] = useState(true); // ✅ new loading flag

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    console.log(token);
    
    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          console.log("Token expired");
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          setLoading(false);
          return;
        }

       setAuth({
  isAuthenticated: true,
  token,
  userId: decoded.userId,
  role: decoded.authorities, // Now just "DRIVER"
  // role: decoded.authorities?.replace("ROLE_", ""), // Now just "DRIVER"
});

      } catch (e) {
        console.error("Invalid token", e);
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      }
    }

    setLoading(false); // ✅ always stop loading after check
  }, []);
  
 const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      isAuthenticated: false,
      userId: null,
      role: null,
      token: null,
    });
    window.location.href = "/";

  };
  return (
    <AuthContext.Provider value={{ auth, setAuth, loading,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
