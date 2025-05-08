// src/pages/EditStudentPage.jsx
import React, { useState, useEffect } from 'react';
import { Typography, Container, Paper, Box, CircularProgress, Alert, IconButton, Tooltip } from '@mui/material';
import StudentForm from '../components/student/StudentForm';
import { useStudents } from '../contexts/StudentContext';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSnackbar } from 'notistack';

const EditStudentPage = () => {
  const { id } = useParams();
  const { getStudentById, updateStudentData } = useStudents();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!id) return;
      setLoading(true);
      setError('');
      try {
        const data = await getStudentById(id);
        setStudent(data);
      } catch (err) {
        setError(err.message || 'Could not fetch student details for editing.');
        enqueueSnackbar(`Error: ${err.message || 'Could not fetch student details.'}`, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id, getStudentById, enqueueSnackbar]);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await updateStudentData(id, data);
      enqueueSnackbar('Student updated successfully!', { variant: 'success' });
      navigate(`/student/${id}`); // Navigate to detail page or home
    } catch (err) {
      console.error('Failed to update student:', err);
      enqueueSnackbar(`Error: ${err.message || 'Could not update student.'}`, { variant: 'error' });
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>;
  }
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  if (!student) {
    return <Alert severity="warning">Student not found.</Alert>;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Tooltip title="Back to Student Details">
          <IconButton component={RouterLink} to={student ? `/student/${student.id}` : '/'} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h4" component="h1">
          Edit Student: {student.name}
        </Typography>
      </Box>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
        <StudentForm
          onSubmit={handleSubmit}
          initialData={student}
          isLoading={isSubmitting}
          submitButtonText="Save Changes"
        />
      </Paper>
    </Container>
  );
};

export default EditStudentPage;