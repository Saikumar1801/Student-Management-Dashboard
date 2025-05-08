// src/components/student/StudentFilter.jsx
import React, { useState, useEffect } from 'react';
import { useStudents } from '../../contexts/StudentContext';
import { TextField, Select, MenuItem, FormControl, InputLabel, Box, Grid, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear'; // For clearing search

const StudentFilter = () => {
  const { courses, applyFilter, filters } = useStudents();
  const [localSearchTerm, setLocalSearchTerm] = useState(filters.searchTerm);

  useEffect(() => {
      // Sync local search with context if context changes (e.g. cleared elsewhere)
      setLocalSearchTerm(filters.searchTerm);
  }, [filters.searchTerm]);

  const handleCourseChange = (event) => {
    applyFilter('course', event.target.value);
  };

  const handleSearchChange = (event) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
      applyFilter('searchTerm', localSearchTerm);
  };

  const clearSearch = () => {
      setLocalSearchTerm('');
      applyFilter('searchTerm', '');
  };

  return (
    <Box sx={{ mb: 3, p: 2, backgroundColor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel id="course-filter-label">Filter by Course</InputLabel>
            <Select
              labelId="course-filter-label"
              value={filters.course}
              onChange={handleCourseChange}
              label="Filter by Course"
            >
              <MenuItem value=""><em>All Courses</em></MenuItem>
              {courses.map((course) => (
                <MenuItem key={course} value={course}>{course}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            label="Search by Name/Email"
            value={localSearchTerm}
            onChange={handleSearchChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
            InputProps={{
                endAdornment: localSearchTerm && (
                    <Tooltip title="Clear Search">
                        <IconButton onClick={clearSearch} size="small">
                            <ClearIcon />
                        </IconButton>
                    </Tooltip>
                )
            }}
          />
        </Grid>
        <Grid item xs={12} md={3} sx={{display: 'flex', justifyContent: {xs: 'flex-start', md: 'flex-end'}}}>
            <Tooltip title="Apply Search">
                <IconButton color="primary" onClick={handleSearchSubmit} aria-label="apply search">
                    <SearchIcon />
                </IconButton>
            </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentFilter;