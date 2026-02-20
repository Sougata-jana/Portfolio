# Vercel Deployment Quick Checklist

## Pre-Deployment Checklist

- [ ] Code is pushed to Git repository (GitHub, GitLab, or Bitbucket)
- [ ] MongoDB Atlas database is set up
- [ ] OpenAI API key is obtained
- [ ] (Optional) Cloudinary account is created
- [ ] All API routes are tested locally

## Deployment Steps

### 1. Main Site Deployment

- [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Click "Add New..." → "Project"
- [ ] Import your Git repository
- [ ] Verify build settings:
  - Framework: Vite
  - Build Command: `cd frontend && npm install && npm run build`
  - Output Directory: `frontend/dist`

### 2. Environment Variables

Add these in Vercel Project Settings → Environment Variables:

**Required:**
- [ ] `MONGODB_URI` - MongoDB connection string
- [ ] `OPENAI_API_KEY` - OpenAI API key
- [ ] `JWT_SECRET` - Random secret string (min 32 chars)
- [ ] `NODE_ENV` - Set to `production`
- [ ] `FRONTEND_URL` - Your Vercel deployment URL

**Optional:**
- [ ] `CLOUDINARY_CLOUD_NAME`
- [ ] `CLOUDINARY_API_KEY`
- [ ] `CLOUDINARY_API_SECRET`
- [ ] `ADMIN_URL` - If deploying admin separately
- [ ] `VITE_API_URL` - Leave empty for same domain

### 3. Deploy

- [ ] Click "Deploy"
- [ ] Wait for build to complete
- [ ] Test your deployment at `https://your-domain.vercel.app`

### 4. Post-Deployment Testing

- [ ] Test homepage loads correctly
- [ ] Test API health endpoint: `/api/health`
- [ ] Test projects API: `/api/projects`
- [ ] Test blogs API: `/api/blogs/published`
- [ ] Test AI chat functionality
- [ ] Test all navigation links
- [ ] Test responsive design on mobile

### 5. Admin Panel Deployment (Optional)

- [ ] Create new Vercel project
- [ ] Import same repository
- [ ] Set Root Directory to `admin`
- [ ] Set `VITE_API_URL` to main site URL
- [ ] Deploy and test

## MongoDB Atlas Setup

- [ ] Create MongoDB Atlas account
- [ ] Create a free cluster
- [ ] Create database user with password
- [ ] Whitelist IP: `0.0.0.0/0` (for Vercel)
- [ ] Get connection string
- [ ] Replace `<password>` and set database name to `portfolio`

## Common Issues & Solutions

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies in package.json
- Ensure Node.js version compatibility

### API Errors
- Verify environment variables are set
- Check MongoDB connection string
- Check serverless function logs

### CORS Issues
- Ensure FRONTEND_URL matches your domain
- Check browser console for errors
- Verify CORS configuration in backend

## Next Steps After Deployment

- [ ] Set up custom domain (optional)
- [ ] Enable Vercel Analytics
- [ ] Set up monitoring
- [ ] Configure staging environment
- [ ] Set up automatic deployments

---

For detailed instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
