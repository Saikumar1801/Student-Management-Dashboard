// src/components/common/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
// No separate loading needed here as AuthContext handles initial load

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth(); // loading is from AuthContext's initial check
  const location = useLocation();

  if (loading) {
    // This case should ideally be covered by AuthProvider's global loader
    // but can be a fallback if a route tries to render before AuthProvider finishes.
    return null; // Or a minimal loader specific to the route area
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;