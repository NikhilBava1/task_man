import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Switch,
  useMediaQuery,
  useTheme,
  Avatar
} from '@mui/material';
import { Add as AddIcon, Task as TaskIcon, DarkMode as DarkModeIcon, LightMode as LightModeIcon } from '@mui/icons-material';

const Navbar = ({ onAddTask, darkMode, onToggleDarkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="sticky"
      sx={{
        background: darkMode
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #6C63FF 0%, #8B85FF 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Avatar
            sx={{
              mr: 2,
              width: 40,
              height: 40,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <TaskIcon sx={{ color: '#fff' }} />
          </Avatar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              letterSpacing: 0.5,
              background: 'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            TaskFlow
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {darkMode ? <DarkModeIcon sx={{ mr: 1, color: '#fff' }} /> : <LightModeIcon sx={{ mr: 1, color: '#fff' }} />}
            <Switch
              checked={darkMode}
              onChange={onToggleDarkMode}
              color="default"
              size="small"
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#FF6584'
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#FF6584'
                }
              }}
            />
          </Box>

          {isMobile ? (
            <IconButton
              onClick={onAddTask}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)'
                }
              }}
            >
              <AddIcon sx={{ color: '#fff' }} />
            </IconButton>
          ) : (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddTask}
              sx={{
                backgroundColor: '#FF6584',
                color: '#fff',
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: 2,
                boxShadow: '0 4px 15px rgba(255, 101, 132, 0.3)',
                '&:hover': {
                  backgroundColor: '#e55a76',
                  boxShadow: '0 6px 20px rgba(255, 101, 132, 0.4)'
                }
              }}
            >
              Add Task
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
