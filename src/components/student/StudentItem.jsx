// src/components/student/StudentItem.jsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School'; // For course
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // For year
import Box from '@mui/material/Box';

const StudentItem = ({ student }) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        height="140"
        image={student.photoUrl || `https://via.placeholder.com/150?text=${student.name.charAt(0)}`} // Fallback image
        alt={student.name}
        sx={{ objectFit: 'cover' }} // Ensures image covers the area
      />
      {/* Or use an Avatar if you prefer */}
      {/*
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
        <Avatar
          alt={student.name}
          src={student.photoUrl}
          sx={{ width: 80, height: 80, mb: 1, border: '2px solid', borderColor: 'primary.main' }}
        />
      </Box>
      */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div" noWrap>
          {student.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary" noWrap>
            {student.email}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <SchoolIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Course: {student.course}
          </Typography>
        </Box>
         <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Year: {student.year}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', pb:2 }}>
        <Button
          size="small"
          variant="outlined"
          component={RouterLink}
          to={`/student/${student.id}`} // Link to detail page (requires login)
        >
          View Details
        </Button>
        {/* Add Edit/Delete buttons here later, potentially conditional on auth */}
      </CardActions>
    </Card>
  );
};

export default StudentItem;