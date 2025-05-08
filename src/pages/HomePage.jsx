// src/pages/HomePage.jsx
import React from 'react';
import { Typography, Container, Fab, Tooltip, Box, Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useStudents } from '../contexts/StudentContext';
import StudentList from '../components/student/StudentList';
import StudentFilter from '../components/student/StudentFilter';
import AddIcon from '@mui/icons-material/Add';

const HomePage = () => {
  const { currentUser } = useAuth();
  const { error: studentContextError } = useStudents(); // Get potential global errors from context

  return (
    <Container maxWidth="xl"> {/* Wider for dashboard */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h3" component="h1">
          Student Directory
        </Typography>
        {/* The Add button is now a FAB or in Navbar */}
      </Box>

      {!currentUser && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Please <RouterLink to="/login" style={{fontWeight: 'bold'}}>login</RouterLink> to add, edit, delete, or view detailed student information.
        </Alert>
      )}
      {studentContextError && <Alert severity="error" sx={{mb:2}}>A general error occurred: {studentContextError}</Alert>}

      <StudentFilter />
      <StudentList />

      {currentUser && (
        <Tooltip title="Add New Student">
          <Fab
            color="primary"
            aria-label="add student"
            component={RouterLink}
            to="/add-student"
            sx={{
              position: 'fixed',
              bottom: { xs: 24, sm: 32 },
              right: { xs: 24, sm: 32 },
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
    </Container>
  );
};

export default HomePage;