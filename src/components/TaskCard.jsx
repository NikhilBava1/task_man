import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  LinearProgress,
  useTheme,
  Avatar
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon
} from '@mui/icons-material';

const TaskCard = ({ task, onEdit, onDelete, onToggle }) => {
  const theme = useTheme();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return '#4caf50';
      case 'medium': return '#ff9800';
      case 'high': return '#f44336';
      default: return '#6C63FF';
    }
  };

  const getPriorityValue = (priority) => {
    switch (priority) {
      case 'low': return 33;
      case 'medium': return 66;
      case 'high': return 100;
      default: return 66;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: task.completed
          ? theme.palette.mode === 'dark' ? '#1e1e2e' : '#f5f5f5'
          : theme.palette.mode === 'dark' ? '#2a2a3e' : '#fff',
        transition: 'all 0.3s ease-in-out',
        opacity: 0,
        animation: 'fadeIn 0.3s ease-in-out forwards',
        '@keyframes fadeIn': {
          from: {
            opacity: 0,
            transform: 'translateY(10px)'
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)'
          }
        },
        border: task.completed
          ? `2px solid ${theme.palette.mode === 'dark' ? '#333' : '#e0e0e0'}`
          : '2px solid transparent',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
          borderColor: '#6C63FF'
        }
      }}
      elevation={3}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Chip
            label={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            sx={{
              backgroundColor: getPriorityColor(task.priority) + '20',
              color: getPriorityColor(task.priority),
              fontWeight: 700,
              fontSize: '0.75rem',
              px: 1,
              py: 0.5,
              borderRadius: 1
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.mode === 'dark' ? '#999' : '#666',
              fontWeight: 500
            }}
          >
            {formatDate(task.createdAt)}
          </Typography>
        </Box>

        <Typography
          variant="h6"
          sx={{
            mb: 1.5,
            fontWeight: 700,
            textDecoration: task.completed ? 'line-through' : 'none',
            transition: 'text-decoration 0.2s ease-in-out',
            color: task.completed
              ? theme.palette.mode === 'dark' ? '#666' : '#999'
              : theme.palette.mode === 'dark' ? '#fff' : '#333',
            lineHeight: 1.4
          }}
        >
          {task.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mb: 2.5,
            color: theme.palette.mode === 'dark' ? '#aaa' : '#666',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: 1.5
          }}
        >
          {task.description || 'No description provided.'}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={getPriorityValue(task.priority)}
          sx={{
            height: 8,
            borderRadius: 4,
            mb: 2.5,
            backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: getPriorityColor(task.priority),
              borderRadius: 4,
              background: `linear-gradient(90deg, ${getPriorityColor(task.priority)} 0%, ${getPriorityColor(task.priority)}CC 100%)`
            }
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => onToggle(task.id)}
            sx={{
              color: task.completed ? '#4caf50' : theme.palette.mode === 'dark' ? '#999' : '#666',
              backgroundColor: task.completed ? '#4caf5020' : 'transparent',
              '&:hover': {
                backgroundColor: task.completed ? '#4caf5030' : theme.palette.mode === 'dark' ? '#333' : '#f5f5f5'
              }
            }}
            title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task.completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onEdit(task)}
            sx={{
              color: '#6C63FF',
              backgroundColor: '#6C63FF20',
              '&:hover': {
                backgroundColor: '#6C63FF30'
              }
            }}
            title="Edit task"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDelete(task.id)}
            sx={{
              color: '#f44336',
              backgroundColor: '#f4433620',
              '&:hover': {
                backgroundColor: '#f4433630'
              }
            }}
            title="Delete task"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
