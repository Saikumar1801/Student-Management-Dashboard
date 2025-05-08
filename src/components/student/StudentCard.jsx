// src/components/student/StudentCard.jsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Avatar, Box, IconButton, Tooltip, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { useAuth } from '../../contexts/AuthContext';


const StudentCard = ({ student, onDelete }) => {
  const { currentUser } = useAuth();

  const getAvatarFallback = (name) => {
    if (!name) return '?';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return initials.substring(0, 2);
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 } }}>
      <CardMedia
        component={() => ( // Using a component for more control over background image or Avatar
          <Box sx={{ height: 140, display: 'flex', justifyContent: 'center', alignItems: 'center', background: `linear-gradient(to bottom, #e0e0e0, #bdbdbd)` }}>
            <Avatar
              alt={student.name}
              src={student.photoUrl} // MUI Avatar handles broken image links gracefully
              sx={{ width: 80, height: 80, fontSize: '2rem',  border: '3px solid white' }}
            >
              {getAvatarFallback(student.name)}
            </Avatar>
          </Box>
        )}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div" noWrap title={student.name}>
          {student.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
          <EmailIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2" noWrap title={student.email}>{student.email}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
          <SchoolIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">{student.course}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
          <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">Year: {student.year}</Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-around', borderTop: '1px solid #eee', p: 1 }}>
        <Tooltip title="View Details">
          <IconButton component={RouterLink} to={`/student/${student.id}`} color="primary" aria-label="view details">
            <InfoIcon />
          </IconButton>
        </Tooltip>
        {currentUser && (
          <>
            <Tooltip title="Edit Student">
              <IconButton component={RouterLink} to={`/student/${student.id}/edit`} color="secondary" aria-label="edit student">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Student">
              <IconButton onClick={() => onDelete(student.id, student.name)} color="error" aria-label="delete student">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default StudentCard;