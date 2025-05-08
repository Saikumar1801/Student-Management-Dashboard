// src/pages/StudentDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { useStudents } from '../contexts/StudentContext';
import { useAuth } from '../contexts/AuthContext';
import ConfirmationDialog from '../components/common/ConfirmationDialog';
import {
    Container, Paper, Typography, CircularProgress, Alert, Box, Grid, Avatar, Button, Divider, IconButton, Tooltip, Chip
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotesIcon from '@mui/icons-material/Notes';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import { useSnackbar } from 'notistack';

const StudentDetailPage = () => {
  const { id } = useParams();
  const { getStudentById, removeStudent } = useStudents();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (!id) return;
      setLoading(true);
      setError('');
      try {
        const data = await getStudentById(id);
        setStudent(data);
      } catch (err) {
        setError(err.message || 'Could not fetch student details.');
        enqueueSnackbar(`Error: ${err.message || 'Could not fetch student details.'}`, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchStudentDetails();
  }, [id, getStudentById, enqueueSnackbar]);

  const handleDelete = () => {
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!student) return;
    try {
      await removeStudent(student.id);
      enqueueSnackbar(`Student ${student.name} deleted successfully.`, { variant: 'success' });
      navigate('/');
    } catch (e) {
      enqueueSnackbar(`Error deleting student: ${e.message}`, { variant: 'error' });
    }
    setDialogOpen(false);
  };
  
  const getAvatarFallback = (name) => {
    if (!name) return '?';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return initials.substring(0, 2);
  }

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>;
  }
  if (error) {
    return (
        <Container>
            <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
            <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>Back to List</Button>
        </Container>
    );
  }
  if (!student) {
    return (
        <Container>
            <Alert severity="warning" sx={{ mt: 2 }}>Student not found or has been removed.</Alert>
            <Button component={RouterLink} to="/" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>Back to List</Button>
        </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1}}>
        <Tooltip title="Back to List">
          <IconButton component={RouterLink} to="/" sx={{ mr: 'auto' }}> {/* Pushes other items to the right */}
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        {currentUser && (
          <>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/student/${student.id}/edit`)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              sx={{ ml: 1 }}
            >
              Delete
            </Button>
          </>
        )}
      </Box>
      <Paper elevation={4} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 3 }}>
        <Grid container spacing={{xs: 2, md: 4}}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar
              alt={student.name}
              src={student.photoUrl}
              sx={{ width: {xs: 120, sm: 150}, height: {xs:120, sm:150}, margin: '0 auto', mb: 2, border: '4px solid', borderColor: 'primary.light', fontSize: '3rem' }}
            >
             {getAvatarFallback(student.name)}
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom>
              {student.name}
            </Typography>
            <Chip label={`ID: ${student.id}`} size="small" variant="outlined"/>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" color="primary.dark" gutterBottom sx={{borderBottom: '2px solid', borderColor: 'primary.light', pb: 1, mb: 2}}>
                Student Details
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <PersonIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
                  <Typography variant="body1"><strong>Name:</strong> {student.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <EmailIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
                  <Typography variant="body1"><strong>Email:</strong> {student.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <SchoolIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
                  <Typography variant="body1"><strong>Course:</strong> {student.course}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <CalendarTodayIcon sx={{ mr: 1.5, color: 'text.secondary' }} />
                  <Typography variant="body1"><strong>Year:</strong> {student.year}</Typography>
                </Grid>
            </Grid>

            {student.notes && (
                <>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" color="primary.dark" gutterBottom>
                        Additional Notes
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mt:1 }}>
                        <NotesIcon sx={{ mr: 1.5, color: 'text.secondary', mt: 0.5 }} />
                        <Typography variant="body1" sx={{whiteSpace: 'pre-wrap'}}>{student.notes}</Typography>
                    </Box>
                </>
            )}
          </Grid>
        </Grid>
      </Paper>
      <ConfirmationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete ${student?.name}? This action cannot be undone.`}
      />
    </Container>
  );
};

export default StudentDetailPage;