import React, { useState } from 'react';
import { Grid, ToggleButtonGroup, ToggleButton, Alert, Box, Paper, Typography, useTheme } from '@mui/material';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onEdit, onDelete, onToggle }) => {
  const theme = useTheme();
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 4
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 0.5,
            borderRadius: 3,
            backgroundColor: theme.palette.mode === 'dark' ? '#2a2a3e' : '#fff'
          }}
        >
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(e, newFilter) => newFilter && setFilter(newFilter)}
            aria-label="task filter"
            sx={{
              '& .MuiToggleButton-root': {
                borderRadius: 2,
                px: 3,
                py: 1,
                fontWeight: 600,
                textTransform: 'none',
                color: theme.palette.mode === 'dark' ? '#aaa' : '#666',
                '&.Mui-selected': {
                  backgroundColor: '#6C63FF',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#5a52d5'
                  }
                }
              }
            }}
          >
            <ToggleButton value="all" aria-label="all tasks">
              All
            </ToggleButton>
            <ToggleButton value="active" aria-label="active tasks">
              Active
            </ToggleButton>
            <ToggleButton value="completed" aria-label="completed tasks">
              Completed
            </ToggleButton>
          </ToggleButtonGroup>
        </Paper>
      </Box>

      {filteredTasks.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 3,
            backgroundColor: theme.palette.mode === 'dark' ? '#2a2a3e' : '#f5f5f5'
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: theme.palette.mode === 'dark' ? '#fff' : '#333',
              mb: 1
            }}
          >
            No tasks yet
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.mode === 'dark' ? '#aaa' : '#666'
            }}
          >
            Add your first task to get started!
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredTasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <TaskCard
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TaskList;
