// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the entire application
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isSession")
  );

  // Method to log in the user
  // Method to log out the user

  // Method to check if user is authenticated

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// ProtectedRoute component to restrict access to authenticated users
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      //   window.location.replace("/Login");
      //   window.location.replace("/Login");
    } else {
      window.history.back();
    }
  }, []);

  return children;
};
