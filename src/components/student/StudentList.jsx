// src/components/student/StudentList.jsx
import React, { useState } from 'react';
import { useStudents } from '../../contexts/StudentContext';
import StudentCard from './StudentCard';
import ConfirmationDialog from '../common/ConfirmationDialog'; // We'll create this
import { Grid, CircularProgress, Typography, Alert, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useSnackbar } from 'notistack'; // For notifications, install if not already: npm install notistack

const StudentList = () => {
  const { students, loading, error, removeStudent, requestSort, sortConfig } = useStudents();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState({ id: null, name: '' });
  const { enqueueSnackbar } = useSnackbar(); // Add this to main.jsx with SnackbarProvider

  const handleDeleteClick = (id, name) => {
    setStudentToDelete({ id, name });
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (studentToDelete.id) {
      try {
        await removeStudent(studentToDelete.id);
        enqueueSnackbar(`Student ${studentToDelete.name} deleted successfully`, { variant: 'success' });
      } catch (e) {
        enqueueSnackbar(`Error deleting student: ${e.message}`, { variant: 'error' });
      }
    }
    setDialogOpen(false);
    setStudentToDelete({ id: null, name: '' });
  };

  const handleSortChange = (event) => {
      const value = event.target.value;
      if (value) {
          const [key, direction] = value.split('_');
          requestSort(key, direction); // Assuming requestSort takes key and direction
      } else { // Default sort or clear sort
          requestSort('name', 'ascending'); // Or your preferred default
      }
  };


  if (loading && students.length === 0) { // Show loader only on initial load or full refresh
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ my: 2 }}>Error fetching students: {error}</Alert>;
  }

  if (!students || students.length === 0) {
    return (
      <Typography variant="subtitle1" sx={{ my: 4, textAlign: 'center', color: 'text.secondary' }}>
        No students found matching your criteria.
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <FormControl size="small" sx={{minWidth: 180}}>
              <InputLabel id="sort-by-label">Sort By</InputLabel>
              <Select
                  labelId="sort-by-label"
                  value={`${sortConfig.key}_${sortConfig.direction}`}
                  label="Sort By"
                  onChange={handleSortChange}
              >
                  <MenuItem value="name_ascending">Name (A-Z)</MenuItem>
                  <MenuItem value="name_descending">Name (Z-A)</MenuItem>
                  <MenuItem value="course_ascending">Course (A-Z)</MenuItem>
                  <MenuItem value="course_descending">Course (Z-A)</MenuItem>
                  <MenuItem value="year_ascending">Year (Low-High)</MenuItem>
                  <MenuItem value="year_descending">Year (High-Low)</MenuItem>
              </Select>
          </FormControl>
      </Box>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {students.map((student) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={student.id}> {/* lg={3} for 4 cards on large screens */}
            <StudentCard student={student} onDelete={handleDeleteClick} />
          </Grid>
        ))}
      </Grid>
      <ConfirmationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete ${studentToDelete.name}? This action cannot be undone.`}
      />
    </>
  );
};

export default StudentList;