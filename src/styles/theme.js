// src/styles/theme.js
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6', // A nice blue
    },
    secondary: {
      main: '#19857b', // A teal color
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f4f6f8', // Light grey background
      paper: '#ffffff',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.2rem', fontWeight: 700 },
    h2: { fontSize: '1.8rem', fontWeight: 600 },
    h3: { fontSize: '1.5rem', fontWeight: 600 },
    h4: { fontSize: '1.3rem', fontWeight: 600 },
    h5: { fontSize: '1.1rem', fontWeight: 600 },
    h6: { fontSize: '1.0rem', fontWeight: 600 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#333', // Darker AppBar
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8, // Slightly more rounded buttons
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Rounded cards
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)', // Softer shadow
        }
      }
    },
  },
});

export default theme;