# Deployment Guide - TaskFlow

This guide provides step-by-step instructions for deploying TaskFlow to production:
- **Backend**: Render (Node.js + Express)
- **Frontend**: Vercel (React + Vite)

---

## Prerequisites

Before deploying, ensure you have:
- GitHub account with your code pushed to a repository
- Render account (free tier available)
- Vercel account (free tier available)
- Node.js installed locally

---

## Step 1: Push Code to GitHub

1. Initialize git repository (if not already done):
```bash
cd d:\My Project\tm
git init
git add .
git commit -m "Initial commit - TaskFlow application"
```

2. Create a new repository on GitHub
3. Add remote and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/taskflow.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend on Render

### 2.1 Prepare Backend

The backend is already configured with `render.yaml`. No code changes needed.

### 2.2 Deploy to Render

1. Go to [render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:

**Build & Deploy Settings:**
- **Name**: `taskflow-backend` (or your preferred name)
- **Region**: Select nearest region
- **Branch**: `main`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Environment Variables:**
Add these environment variables in Render dashboard:

```
PORT=5000
FRONTEND_URL=https://your-frontend.vercel.app
```

**Important**: Replace `your-frontend.vercel.app` with your actual Vercel URL after frontend deployment.

5. Click **"Create Web Service"**
6. Wait for deployment to complete (2-3 minutes)
7. Copy your backend URL (e.g., `https://taskflow-backend.onrender.com`)

### 2.3 Test Backend

Visit your backend URL and test the API:
- `https://taskflow-backend.onrender.com/tasks` - Should return tasks array

---

## Step 3: Deploy Frontend on Vercel

### 3.1 Prepare Frontend Environment File

Create `.env` file in frontend directory:

```bash
cd frontend
```

Create `.env` file with:
```
VITE_API_URL=https://taskflow-backend.onrender.com
```

**Important**: Replace with your actual Render backend URL.

### 3.2 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure the project:

**Framework Preset**: Vite (auto-detected)

**Environment Variables:**
Add this environment variable:
```
VITE_API_URL=https://taskflow-backend.onrender.com
```

**Root Directory**: `frontend` (if your repo has both backend and frontend)

**Build Command**: `npm run build`
**Output Directory**: `dist`

5. Click **"Deploy"**
6. Wait for deployment to complete (1-2 minutes)
7. Copy your frontend URL (e.g., `https://taskflow.vercel.app`)

### 3.3 Update Backend CORS

After frontend deployment, update the backend environment variable:

1. Go to Render dashboard
2. Navigate to your backend service
3. Go to **"Environment"** tab
4. Update `FRONTEND_URL` to your actual Vercel URL:
```
FRONTEND_URL=https://taskflow.vercel.app
```
5. Click **"Save Changes"**
6. Render will automatically redeploy with new configuration

---

## Step 4: Update Frontend Environment (if needed)

If you deployed frontend first and got the URL, update the `.env` file:

1. Go to Vercel dashboard
2. Navigate to your project
3. Go to **"Settings"** → **"Environment Variables"**
4. Update `VITE_API_URL` to your actual Render backend URL
5. Redeploy from Vercel dashboard

---

## Step 5: Test Full Application

1. Visit your Vercel frontend URL
2. Test all features:
   - View tasks (should load from backend)
   - Add new task
   - Edit task
   - Delete task
   - Toggle completion
   - Filter tasks
   - Dark mode toggle

---

## Environment Variables Summary

### Backend (Render)
```
PORT=5000
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.onrender.com
```

---

## Common Issues & Solutions

### Issue 1: CORS Error
**Problem**: Frontend can't connect to backend
**Solution**: Ensure `FRONTEND_URL` in Render matches your Vercel URL exactly

### Issue 2: Tasks Not Loading
**Problem**: Tasks not displaying on frontend
**Solution**: 
- Check backend is running (visit `/tasks` endpoint)
- Verify `VITE_API_URL` is correct in Vercel
- Check browser console for errors

### Issue 3: tasks.json Not Persisting
**Problem**: Tasks reset after Render restart
**Solution**: 
- Render's free tier uses ephemeral storage
- For persistence, upgrade to paid tier or use a database
- Current implementation uses file-based storage (not recommended for production)

### Issue 4: Build Fails
**Problem**: Deployment build fails
**Solution**:
- Check build logs in Render/Vercel dashboard
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

---

## Production Recommendations

### For Backend (Render)
1. **Upgrade to paid tier** for persistent storage
2. **Add a database** (PostgreSQL, MongoDB) instead of file storage
3. **Enable auto-scaling** for better performance
4. **Add monitoring** and error tracking

### For Frontend (Vercel)
1. **Enable Analytics** for usage insights
2. **Add custom domain** for branding
3. **Enable preview deployments** for testing
4. **Set up environment-specific configs**

### Security
1. **Add rate limiting** to API endpoints
2. **Implement authentication** (JWT, OAuth)
3. **Add input validation** and sanitization
4. **Enable HTTPS** (automatic on Render/Vercel)
5. **Add CORS restrictions** to specific domains

---

## File Changes Checklist

### Files Already Configured (No Changes Needed)
- ✅ `backend/render.yaml` - Render configuration
- ✅ `backend/.env.example` - Backend environment template
- ✅ `frontend/vercel.json` - Vercel SPA routing
- ✅ `frontend/.env.example` - Frontend environment template

### Files to Create During Deployment
- ⚠️ `backend/.env` - Create from `.env.example` (for local testing only)
- ⚠️ `frontend/.env` - Create from `.env.example` (for local testing only)

**Note**: Environment variables should be set in Render/Vercel dashboards, not in `.env` files for production.

---

## Deployment URLs Example

After deployment, your URLs will look like:

**Backend**: `https://taskflow-backend-abc123.onrender.com`
**Frontend**: `https://taskflow-xyz456.vercel.app`

---

## Quick Reference Commands

### Local Development
```bash
# Backend
cd backend
npm install
npm start

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

### Git Commands
```bash
git add .
git commit -m "Your message"
git push origin main
```

### Redeploy Commands
- **Render**: Push to GitHub → Auto-deploys
- **Vercel**: Push to GitHub → Auto-deploys

---

## Support Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Documentation](https://docs.github.com)

---

## Next Steps After Deployment

1. **Monitor performance** using Render/Vercel dashboards
2. **Set up analytics** for user insights
3. **Add error tracking** (Sentry, LogRocket)
4. **Implement backup strategy** for data
5. **Set up CI/CD pipeline** for automated testing
6. **Add custom domain** for professional appearance
7. **Configure SSL certificates** (automatic on both platforms)

---

## Summary

1. Push code to GitHub
2. Deploy backend to Render with environment variables
3. Deploy frontend to Vercel with environment variables
4. Update CORS settings with actual URLs
5. Test full application
6. Monitor and maintain

Both platforms offer free tiers suitable for development and small projects. For production use, consider upgrading for better performance and persistence.
