import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  CircularProgress,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Grid
} from '@mui/material';
import { Add as AddIcon, Assignment as AssignmentIcon } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { getAllTasks, createTask, updateTask, deleteTask } from '../services/taskService';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getAllTasks();
      setTasks(data);
    } catch (error) {
      showSnackbar('Failed to fetch tasks', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAddTask = async (data) => {
    try {
      const newTask = await createTask(data);
      setTasks(prev => [...prev, newTask]);
      setModalOpen(false);
      showSnackbar('Task created successfully!', 'success');
    } catch (error) {
      showSnackbar('Failed to create task', 'error');
    }
  };

  const handleEditTask = async (data) => {
    try {
      const updatedTask = await updateTask(editingTask.id, data);
      setTasks(prev => prev.map(task => task.id === editingTask.id ? updatedTask : task));
      setModalOpen(false);
      setEditingTask(null);
      showSnackbar('Task updated successfully!', 'success');
    } catch (error) {
      showSnackbar('Failed to update task', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
      showSnackbar('Task deleted successfully!', 'success');
    } catch (error) {
      showSnackbar('Failed to delete task', 'error');
    }
  };

  const handleToggle = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      try {
        const updatedTask = await updateTask(id, { completed: !task.completed });
        setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
        showSnackbar(updatedTask.completed ? 'Task marked as complete!' : 'Task marked as incomplete!', 'success');
      } catch (error) {
        showSnackbar('Failed to update task', 'error');
      }
    }
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleOpenDeleteDialog = (id) => {
    setTaskToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: darkMode ? '#0f0f1a' : '#f8f9fa',
        minHeight: '100vh',
        backgroundImage: darkMode
          ? 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)'
          : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
      }}
    >
      <Navbar
        onAddTask={() => setModalOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                background: 'linear-gradient(135deg, #6C63FF 0%, #8B85FF 100%)',
                color: '#fff',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 30px rgba(108, 99, 255, 0.3)'
                }
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                {stats.total}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, opacity: 0.9 }}>
                Total Tasks
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
                color: '#fff',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 30px rgba(76, 175, 80, 0.3)'
                }
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                {stats.completed}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, opacity: 0.9 }}>
                Completed
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                background: 'linear-gradient(135deg, #FF6584 0%, #ff8599 100%)',
                color: '#fff',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 30px rgba(255, 101, 132, 0.3)'
                }
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                {stats.pending}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, opacity: 0.9 }}>
                Pending
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {tasks.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 8,
              textAlign: 'center',
              borderRadius: 3,
              backgroundColor: darkMode ? '#2a2a3e' : '#fff',
              border: `2px dashed ${darkMode ? '#444' : '#ddd'}`
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                backgroundColor: '#6C63FF20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 4
              }}
            >
              <AssignmentIcon sx={{ fontSize: 60, color: '#6C63FF' }} />
            </Box>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: darkMode ? '#fff' : '#333' }}>
              No tasks yet
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                textAlign: 'center',
                maxWidth: 400,
                mx: 'auto',
                color: darkMode ? '#aaa' : '#666',
                lineHeight: 1.6
              }}
            >
              Start by creating your first task to get organized and boost your productivity!
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setModalOpen(true)}
              sx={{
                backgroundColor: '#6C63FF',
                color: '#fff',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                boxShadow: '0 4px 15px rgba(108, 99, 255, 0.3)',
                '&:hover': {
                  backgroundColor: '#5a52d5',
                  boxShadow: '0 6px 20px rgba(108, 99, 255, 0.4)'
                }
              }}
            >
              Add Your First Task
            </Button>
          </Paper>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={handleOpenEdit}
            onDelete={handleOpenDeleteDialog}
            onToggle={handleToggle}
          />
        )}
      </Container>

      <TaskForm
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={editingTask ? handleEditTask : handleAddTask}
        task={editingTask}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: darkMode ? '#2a2a3e' : '#fff'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: darkMode ? '#aaa' : '#666' }}>
            Are you sure you want to delete this task? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 600
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(taskToDelete)}
            color="error"
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 600
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;
