// src/components/student/StudentForm.jsx
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField, Button, Box, CircularProgress, Grid, MenuItem,
  FormControl, InputLabel, Select, FormHelperText, Paper
} from '@mui/material';
import { useStudents } from '../../contexts/StudentContext';

const StudentForm = ({ onSubmit, initialData = {}, isLoading = false, submitButtonText = "Submit" }) => {
  const { courses, loading: coursesLoading } = useStudents();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: initialData
  });

  useEffect(() => {
    // Avoid infinite loop: only reset if initialData has values
    if (Object.keys(initialData).length > 0) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    const dataToSubmit = {
      ...data,
      notes: data.notes || '',
      photoUrl: data.photoUrl || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`
    };
    onSubmit(dataToSubmit);
  };

  return (
    <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 } }}>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: 'Student name is required',
                minLength: { value: 2, message: "Name must be at least 2 characters" }
              }}
              render={({ field }) => (
                <TextField {...field} label="Full Name" variant="outlined" fullWidth required
                  error={!!errors.name} helperText={errors.name?.message} />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              }}
              render={({ field }) => (
                <TextField {...field} label="Email Address" type="email" variant="outlined" fullWidth required
                  error={!!errors.email} helperText={errors.email?.message} />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="course"
              control={control}
              defaultValue=""
              rules={{ required: 'Course is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.course} variant="outlined" required>
                  <InputLabel id="course-select-label">Course</InputLabel>
                  <Select {...field} labelId="course-select-label" label="Course">
                    {coursesLoading && <MenuItem value=""><em>Loading courses...</em></MenuItem>}
                    {!coursesLoading && courses.length === 0 && <MenuItem value=""><em>No courses available</em></MenuItem>}
                    {courses.map(courseName => (
                      <MenuItem key={courseName} value={courseName}>{courseName}</MenuItem>
                    ))}
                  </Select>
                  {errors.course && <FormHelperText>{errors.course.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name="year"
              control={control}
              defaultValue=""
              rules={{
                required: 'Year is required',
                min: { value: 1, message: 'Year must be at least 1' },
                max: { value: 5, message: 'Year can be at most 5' },
                pattern: { value: /^[1-5]$/, message: 'Invalid year (1-5)' }
              }}
              render={({ field }) => (
                <TextField {...field} label="Year of Study" type="number" variant="outlined" fullWidth required
                  error={!!errors.year} helperText={errors.year?.message} />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="photoUrl"
              control={control}
              defaultValue=""
              rules={{
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: "Enter a valid URL or leave blank for default."
                }
              }}
              render={({ field }) => (
                <TextField {...field} label="Photo URL (Optional)" variant="outlined" fullWidth
                  error={!!errors.photoUrl}
                  helperText={errors.photoUrl?.message || "e.g., https://example.com/photo.jpg. Leave blank for a default avatar."} />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="notes"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField {...field} label="Additional Notes (Optional)" variant="outlined" fullWidth multiline rows={3} />
              )}
            />
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading || !isDirty}
              sx={{ minWidth: 120 }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : submitButtonText}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default StudentForm;
