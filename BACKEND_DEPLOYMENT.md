# Backend-Only Vercel Deployment Guide

## Deploying Backend Separately

If you want to deploy the backend API separately from the frontend:

### Step 1: Navigate to Backend Folder in Vercel

When importing your project in Vercel:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your Git repository
4. **IMPORTANT**: Set **Root Directory** to `backend`

### Step 2: Configure Environment Variables

Add these environment variables in Vercel Project Settings:

**Required:**
- `MONGODB_URI` - Your MongoDB connection string
- `OPENAI_API_KEY` - Your OpenAI API key
- `JWT_SECRET` - Your JWT secret (use: `amisougata`)
- `NODE_ENV` - Set to `production`
- `FRONTEND_URL` - Your frontend URL (will set after frontend deployment)

**Optional (Cloudinary):**
- `CLOUDINARY_CLOUD_NAME` - `backendsougata`
- `CLOUDINARY_API_KEY` - `174926623784972`
- `CLOUDINARY_API_SECRET` - Your Cloudinary secret

**Admin Credentials (if needed):**
- `ADMIN_LOGIN_GMAIL_ID` - `janasougata198@gmail.com`
- `ADMIN_LOGIN_PASSWORD` - `portfolio278`

### Step 3: Verify Build Settings

Vercel should auto-detect:
- **Framework Preset**: Other
- **Build Command**: (leave empty)
- **Output Directory**: (leave empty)
- **Install Command**: `npm install`

### Step 4: Deploy

Click "Deploy" and wait for completion.

### Step 5: After Deployment

Once deployed, you'll get a URL like: `https://your-backend.vercel.app`

**Important Notes:**
1. ⚠️ **Your OpenAI API key needs credits** - The current key has exceeded quota
2. ✅ **MongoDB URI** - Already configured correctly
3. ✅ **Cloudinary** - Already configured
4. 🔒 **Admin credentials** - Already set

### Testing Your Backend Deployment

Test these endpoints:
- Health: `https://your-backend.vercel.app/api/health`
- Projects: `https://your-backend.vercel.app/api/projects`
- Blogs: `https://your-backend.vercel.app/api/blogs/published`

## Deploying Frontend Separately

After backend is deployed:

1. Create another Vercel project
2. Set **Root Directory** to `frontend`
3. Add environment variable:
   - `VITE_API_URL` = Your backend URL (e.g., `https://your-backend.vercel.app`)
4. Deploy

## Alternative: Deploy as Monorepo (Recommended)

Instead of deploying separately, you can deploy everything together:
1. Import the repository
2. **Root Directory**: Leave as `.` (root)
3. The frontend and backend will be on the same domain
4. API will be available at `/api/*`

This is easier and avoids CORS issues!

## Current Setup Summary

Based on your `.env` file:
- ✅ MongoDB: Connected to Cluster0
- ✅ Cloudinary: Configured
- ⚠️ OpenAI: Needs quota/credits
- ✅ JWT: Configured
- ✅ Admin: Credentials set

## Common Issues

### 1. CORS Errors
Update `FRONTEND_URL` in Vercel environment variables to match your frontend domain.

### 2. MongoDB Connection
MongoDB Atlas IP whitelist must include `0.0.0.0/0` for Vercel serverless functions.

### 3. OpenAI Quota
Add credits at https://platform.openai.com/account/billing or the AI chat will use fallback responses.

---

**Note**: Deploying backend and frontend separately requires managing CORS. The monorepo approach (using root vercel.json) is recommended for easier deployment.
