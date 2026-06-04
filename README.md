# TaskFlow - Task Management Web Application

A full-stack task management application built with Node.js, Express, React, and Material UI. TaskFlow helps you organize, track, and manage your tasks with a beautiful and intuitive interface.

## Features

- **Create, Edit, and Delete Tasks** - Full CRUD operations for task management
- **Persistent Storage** - Tasks are stored in tasks.json file for data persistence
- **Priority Levels** - Set task priority as Low, Medium, or High with visual indicators
- **Task Completion** - Mark tasks as complete with visual feedback
- **Filter Tasks** - Filter tasks by All, Active, or Completed status
- **Statistics Dashboard** - View total tasks, completed, and pending counts
- **Dark Mode** - Toggle between light and dark themes with preference saved in localStorage
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Feedback** - Snackbars for success/error notifications
- **Smooth Animations** - Fade-in effects and smooth transitions

## Tech Stack

| Component | Technology |
|-----------|-----------|
| **Backend** | Node.js + Express |
| **Frontend** | React (Vite) |
| **Styling** | Material UI + Bootstrap |
| **HTTP Client** | Axios |
| **Routing** | React Router DOM |
| **State Management** | React Hooks |

## Project Structure

```
tm/
├── backend/
│   ├── server.js              # Express server with REST API
│   ├── package.json           # Backend dependencies
│   ├── .env.example           # Environment variables template
│   └── render.yaml            # Render deployment config
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Top navigation bar
│   │   │   ├── TaskCard.jsx   # Individual task display
│   │   │   ├── TaskList.jsx   # Task grid with filters
│   │   │   └── TaskForm.jsx   # Add/Edit task modal
│   │   ├── services/
│   │   │   └── taskService.js # API service layer
│   │   ├── pages/
│   │   │   └── HomePage.jsx   # Main application page
│   │   ├── App.jsx            # App with routing and theme
│   │   └── main.jsx           # Application entry point
│   ├── index.html             # HTML with Google Fonts
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── .env.example           # Environment variables template
│   └── vercel.json            # Vercel deployment config
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## Local Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Environment Variables

### Backend (.env)
```
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task by ID |
| DELETE | `/tasks/:id` | Delete a task by ID |

## Task Object Structure

```javascript
{
  id: "uuid-string",
  title: "Task title",
  description: "Task description",
  completed: false,
  priority: "low" | "medium" | "high",
  createdAt: "ISO-date-string"
}
```

## Deployment

### Backend (Render)

1. Push your code to GitHub
2. Connect your repository to Render
3. Use the `render.yaml` configuration
4. Set environment variables in Render dashboard

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Use the `vercel.json` configuration
4. Set `VITE_API_URL` environment variable to your backend URL

## Live Demo

- **Frontend**: [Deploy your frontend on Vercel]
- **Backend**: [Deploy your backend on Render]

## Development

### Adding New Features

1. Backend: Add new endpoints in `server.js`
2. Frontend: Add new functions in `taskService.js`
3. UI: Create new components in `components/` folder

### Customizing Theme

Edit the theme in `frontend/src/App.jsx`:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#6C63FF',  // Purple
    },
    secondary: {
      main: '#FF6584',  // Pink
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});
```

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
