// AppRoutes.tsx
import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../Contexts/UserContext";
import LoginPage from "../Pages/Login/LoginPage";
import Home from "../Pages/Home";
import RegisterPage from "../Pages/Login/RegisterPage";


interface RoutesProps {
  allowedAccessLevels?: number[];
}

export const AppRoutes: React.FC<RoutesProps> = ({ allowedAccessLevels = [] }) => {
  const { isAuthenticated, accessLevel } = useAuth();
  const location = useLocation();


  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" />;
  }

  if (allowedAccessLevels.length && accessLevel && !allowedAccessLevels.includes(accessLevel)) {
    return <Navigate to="/not-allowed" />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  );
};