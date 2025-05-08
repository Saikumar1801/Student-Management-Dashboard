// src/pages/NotFoundPage.jsx
import React from 'react';
import { Typography, Container, Button, Box, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ReportProblemIcon from '@mui/icons-material/ReportProblem'; // Icon for error

const NotFoundPage = () => {
  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 5 }, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <ReportProblemIcon sx={{ fontSize: 80, color: 'warning.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Oops! The page you are looking for does not exist or has been moved.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3 }}
        >
          Go to Homepage
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFoundPage;