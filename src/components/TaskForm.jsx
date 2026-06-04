import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Box,
  useTheme,
  Typography
} from '@mui/material';

const TaskForm = ({ open, onClose, onSubmit, task }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    completed: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      if (task) {
        setFormData({
          title: task.title,
          description: task.description,
          priority: task.priority,
          completed: task.completed
        });
      } else {
        setFormData({
          title: '',
          description: '',
          priority: 'medium',
          completed: false
        });
      }
      setErrors({});
    }
  }, [open, task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSwitchChange = (e) => {
    setFormData(prev => ({
      ...prev,
      completed: e.target.checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      completed: false
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backgroundColor: theme.palette.mode === 'dark' ? '#2a2a3e' : '#fff'
        }
      }}
    >
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #6C63FF 0%, #8B85FF 100%)',
          color: '#fff',
          fontWeight: 700,
          py: 3
        }}
      >
        {task ? 'Edit Task' : 'Add New Task'}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 3 }}>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title *"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            sx={{
              mb: 2.5,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />

          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
            sx={{
              mb: 2.5,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />

          <FormControl fullWidth sx={{ mb: 2.5 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              label="Priority"
              sx={{
                borderRadius: 2
              }}
            >
              <MenuItem value="low">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#4caf50' }} />
                  Low
                </Box>
              </MenuItem>
              <MenuItem value="medium">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff9800' }} />
                  Medium
                </Box>
              </MenuItem>
              <MenuItem value="high">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#f44336' }} />
                  High
                </Box>
              </MenuItem>
            </Select>
          </FormControl>

          {task && (
            <FormControlLabel
              control={
                <Switch
                  checked={formData.completed}
                  onChange={handleSwitchChange}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#6C63FF'
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#6C63FF'
                    }
                  }}
                />
              }
              label={
                <Typography sx={{ fontWeight: 600 }}>Completed</Typography>
              }
              sx={{ mb: 2 }}
            />
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={handleClose}
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 600
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#6C63FF',
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#5a52d5'
              }
            }}
          >
            {task ? 'Save Changes' : 'Create Task'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;
