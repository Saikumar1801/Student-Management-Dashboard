// src/pages/AddStudentPage.jsx
import React, { useState } from 'react';
import { Typography, Container, Paper, Box, IconButton, Tooltip } from '@mui/material';
import StudentForm from '../components/student/StudentForm';
import { useStudents } from '../contexts/StudentContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSnackbar } from 'notistack';

const AddStudentPage = () => {
  const { addStudent } = useStudents();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await addStudent(data);
      enqueueSnackbar('Student added successfully!', { variant: 'success' });
      navigate('/');
    } catch (error) {
      console.error('Failed to add student:', error);
      enqueueSnackbar(`Error: ${error.message || 'Could not add student.'}`, { variant: 'error' });
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Tooltip title="Back to List">
          <IconButton component={RouterLink} to="/" sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h4" component="h1">
          Add New Student
        </Typography>
      </Box>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
        <StudentForm onSubmit={handleSubmit} isLoading={isSubmitting} submitButtonText="Add Student" />
      </Paper>
    </Container>
  );
};

export default AddStudentPage;