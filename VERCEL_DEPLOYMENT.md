# Vercel Deployment Guide

This guide will walk you through deploying your Modern Portfolio to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (for production database)
3. An [OpenAI API key](https://platform.openai.com/api-keys) (for AI chat feature)
4. (Optional) A [Cloudinary account](https://cloudinary.com/) (for image uploads)

## Project Structure

This project is configured as a monorepo with:
- **Frontend**: React + TypeScript + Vite (main portfolio site)
- **Backend**: Express.js API (deployed as serverless functions)
- **Admin**: React + TypeScript + Vite (admin dashboard - deployed separately)

## Deployment Steps

### 1. Prepare Your Repository

Ensure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Connect to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Select the repository containing your portfolio

### 3. Configure Build Settings

Vercel should auto-detect the configuration from `vercel.json`, but verify:

- **Framework Preset**: Vite
- **Root Directory**: Leave as `./` (project root)
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/dist`
- **Install Command**: `npm install`

### 4. Set Environment Variables

In the Vercel project settings, add the following environment variables:

#### Backend/API Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/portfolio` |
| `OPENAI_API_KEY` | OpenAI API key for AI chat | `sk-...` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secret-jwt-key` |
| `NODE_ENV` | Environment mode | `production` |
| `FRONTEND_URL` | Your deployed frontend URL | `https://your-site.vercel.app` |
| `ADMIN_URL` | Your deployed admin URL (optional) | `https://admin-your-site.vercel.app` |

#### Cloudinary Variables (Optional - for image uploads)

| Variable | Description |
|----------|-------------|
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |

#### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | Keep empty for same domain or use full URL |

**Note**: When deploying on Vercel, the frontend and backend will be on the same domain, so you can leave `VITE_API_URL` empty or set it to your domain.

### 5. Deploy

Click "Deploy" and wait for the build to complete. Vercel will:
1. Install dependencies
2. Build the frontend
3. Set up serverless functions for the backend API
4. Deploy everything to a global CDN

### 6. Post-Deployment Configuration

After the initial deployment:

1. **Update CORS Settings**: The backend is already configured to use the `FRONTEND_URL` environment variable
2. **Update Frontend API URL**: If needed, update the `VITE_API_URL` in Vercel environment variables
3. **Verify API Routes**: Test your API endpoints at `https://your-domain.vercel.app/api/health`

### 7. Deploy Admin Panel (Optional)

To deploy the admin panel separately:

1. Create a new project in Vercel
2. Import the same repository
3. Configure build settings:
   - **Root Directory**: `admin`
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `dist`
4. Set environment variables:
   - `VITE_API_URL`: Your main site URL (e.g., `https://your-site.vercel.app`)

## Environment Variables Setup Guide

### Getting MongoDB URI (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (if you don't have one)
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `portfolio`

Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority`

### Getting OpenAI API Key

1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy and save the key (you won't see it again)
5. Add credits to your account for API usage

### Getting Cloudinary Credentials (Optional)

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up or log in
3. From your dashboard, find:
   - Cloud Name
   - API Key
   - API Secret

## Testing Your Deployment

1. **Frontend**: Visit `https://your-domain.vercel.app`
2. **API Health**: Visit `https://your-domain.vercel.app/api/health`
3. **Projects**: Visit `https://your-domain.vercel.app/api/projects`
4. **Blogs**: Visit `https://your-domain.vercel.app/api/blogs/published`

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### API Not Working

- Check environment variables are set correctly
- Verify MongoDB connection string
- Check serverless function logs in Vercel dashboard

### CORS Errors

- Ensure `FRONTEND_URL` environment variable is set
- Check browser console for specific CORS error messages
- Verify the frontend URL matches your deployment URL

### Database Connection Issues

- Verify MongoDB Atlas IP whitelist (add `0.0.0.0/0` for Vercel)
- Check connection string format
- Ensure database user has proper permissions

## Custom Domain (Optional)

To add a custom domain:

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed by Vercel
5. Update `FRONTEND_URL` environment variable

## Continuous Deployment

Vercel automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel will automatically build and deploy your changes.

## Performance Optimization

Vercel automatically provides:
- Global CDN distribution
- Automatic HTTPS
- Image optimization
- Serverless function scaling
- Zero-config production caching

## Monitoring

Monitor your deployment:
- **Analytics**: Vercel Dashboard → Analytics
- **Logs**: Vercel Dashboard → Logs
- **Functions**: Vercel Dashboard → Functions

## Support

If you encounter issues:
1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review [Vercel Community](https://github.com/vercel/vercel/discussions)
3. Check the project's GitHub issues

## Next Steps

- Set up monitoring and analytics
- Configure custom domain
- Set up staging environment
- Enable Vercel Analytics
- Configure Web Vitals monitoring

---

**Deployment Date**: $(date)
**Platform**: Vercel
**Framework**: React + Vite + Express.js
