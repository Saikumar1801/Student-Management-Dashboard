// src/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { Container } from '@mui/material';

const LoginPage = () => {
  return (
    <Container component="section" maxWidth="xs"> {/* xs for login form is good */}
      <LoginForm />
    </Container>
  );
};

export default LoginPage;