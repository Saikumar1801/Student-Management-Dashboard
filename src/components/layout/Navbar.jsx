// src/components/layout/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Tooltip } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
      // TODO: Show error toast/snackbar
    }
  };

  return (
    <AppBar position="sticky"> {/* sticky for better UX */}
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="home"
          component={RouterLink}
          to="/"
          sx={{ mr: 1 }}
        >
          <SchoolIcon />
        </IconButton>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', '&:hover': { textDecoration: 'underline' } }}
        >
          Student Dashboard
        </Typography>
        <Box>
          <Tooltip title="Home">
            <IconButton color="inherit" component={RouterLink} to="/">
              <HomeIcon />
            </IconButton>
          </Tooltip>
          {currentUser ? (
            <>
              <Tooltip title="Add New Student">
                <IconButton color="inherit" component={RouterLink} to="/add-student">
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton color="inherit" onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="caption" sx={{ ml: 1, display: { xs: 'none', sm: 'inline' } }}>
                {currentUser.email}
              </Typography>
            </>
          ) : (
            <Tooltip title="Login">
              <Button
                color="inherit"
                component={RouterLink}
                to="/login"
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;