// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = ({ allowedRoles }) => {
//   const user = JSON.parse(localStorage.getItem("user"));


// // Save to localStorage
// localStorage.setItem("user", JSON.stringify(user));

// setTimeout(() => {
//   localStorage.removeItem("user");
//   localStorage.removeItem("token");
//   window.location.href = "/"; 
// }, 2 * 60 * 60 * 1000);

  

//   if (!user) {
//     return <Navigate to="/" />;
//   }

//   if (!allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;



import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const loginTime = localStorage.getItem("loginTime");

  const maxSessionTime = 2 * 60 * 60 * 1000; // 2 hours
  const now = Date.now();

  // Auto logout if no user OR expired session
  if (!user || !token || !loginTime || now - loginTime > maxSessionTime) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    return <Navigate to="/" replace />;
  }

  // Role-based protection
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
