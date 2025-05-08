// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show a loader while Firebase is checking auth state
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to so we can send them along after they login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;