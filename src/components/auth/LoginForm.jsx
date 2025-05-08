// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Alert, CircularProgress, Typography, Paper } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      setError('');
      setLoading(true);
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password'
        ? 'Invalid email or password.'
        : 'Failed to log in. Please try again.');
      console.error("Login error:", err);
    }
    setLoading(false);
  };

  return (
    <Paper elevation={3} sx={{ p: {xs: 2, sm:4}, mt: {xs: 2, sm: 8}, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 400, mx: 'auto' }}>
      <Typography component="h1" variant="h5" sx={{ mb: 2}}>
        Sign in
      </Typography>
      {error && <Alert severity="error" sx={{ mt: 1, mb:1, width: '100%' }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
        </Button>
        {/* Optional: Link to a Sign Up page */}
        {/* <Typography variant="body2" align="center">
          Don't have an account? <Link component={RouterLink} to="/signup">Sign Up</Link>
        </Typography> */}
      </Box>
    </Paper>
  );
};

export default LoginForm;