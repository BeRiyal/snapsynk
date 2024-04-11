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
  const login = () => {
    setIsAuthenticated(true);
  };

  // Method to log out the user

  useEffect(() => {
    console.log(
      `🚀  ~ file: AuthContext.js:15 ~ AuthProvider ~ isAuthenticated:`,
      isAuthenticated
    );
    // Check if user is authenticated
    // if (!isAuthenticated) {
    //   window.location.replace("/Login");
    // }
  }, [isAuthenticated]);

  // Method to check if user is authenticated

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};

// ProtectedRoute component to restrict access to authenticated users
// export const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();

//   if (!isAuthenticated()) {
//     // Redirect to login page or display unauthorized message
//     return <UnauthorizedPage />;
//   }

//   return children;
// };
