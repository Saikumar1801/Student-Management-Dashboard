// src/App.jsx
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Container, Box, CircularProgress } from '@mui/material';

// Layout
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';

// Page Components (Lazy Loaded)
const HomePage = React.lazy(() => import('./pages/HomePage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const AddStudentPage = React.lazy(() => import('./pages/AddStudentPage'));
const EditStudentPage = React.lazy(() => import('./pages/EditStudentPage'));
const StudentDetailPage = React.lazy(() => import('./pages/StudentDetailPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

function App() {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="lg" sx={{ mt: { xs: 2, sm: 4 }, mb: 4 }}>
        <Suspense fallback={
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 120px)' }}>
            <CircularProgress />
          </Box>
        }>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={currentUser ? <Navigate to="/" /> : <LoginPage />} />
            <Route path="/add-student" element={<ProtectedRoute><AddStudentPage /></ProtectedRoute>} />
            <Route path="/student/:id/edit" element={<ProtectedRoute><EditStudentPage /></ProtectedRoute>} />
            <Route path="/student/:id" element={<ProtectedRoute><StudentDetailPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}

export default App;