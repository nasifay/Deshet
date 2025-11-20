# Vercel Deployment Guide

This guide will help you deploy the Deshet Medical Center website to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you don't have one
2. **GitHub/GitLab/Bitbucket Account**: Your code should be in a Git repository
3. **MongoDB Atlas Account**: For production database (or use your existing MongoDB)

## Step 1: Prepare Your Repository

Make sure your code is committed and pushed to your Git repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Step 2: Deploy via Vercel Dashboard

### Option A: Import from Git (Recommended)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your Git repository
4. Vercel will auto-detect Next.js
5. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No** (for first deployment)
   - Project name? (Enter your project name)
   - Directory? **./** (default)
   - Override settings? **No**

5. For production deployment:
```bash
vercel --prod
```

## Step 3: Configure Environment Variables

After deployment, configure environment variables in Vercel:

1. Go to your project dashboard on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

### Required Environment Variables

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-here-min-32-characters

# Base URL (your Vercel deployment URL)
NEXT_PUBLIC_BASE_URL=https://your-project.vercel.app
```

### Optional Environment Variables

```env
# Google Analytics (if using)
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code

# Admin Email (for seed scripts)
ADMIN_EMAIL=admin@deshetmed.com
ADMIN_PASSWORD=YourSecurePassword123
```

### Important Notes:

- **MONGODB_URI**: Use MongoDB Atlas connection string for production
  - Make sure to whitelist Vercel IPs (or use `0.0.0.0/0` for all IPs)
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

- **JWT_SECRET**: Generate a secure random string:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

- **NEXT_PUBLIC_BASE_URL**: Update after first deployment with your actual Vercel URL

## Step 4: MongoDB Atlas Setup

1. **Create MongoDB Atlas Account** (if not already):
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster

2. **Configure Network Access**:
   - Go to **Network Access**
   - Add IP Address: `0.0.0.0/0` (allow all IPs) OR add Vercel IP ranges
   - Vercel IP ranges can be found in Vercel docs

3. **Create Database User**:
   - Go to **Database Access**
   - Create a new user with read/write permissions
   - Save the username and password

4. **Get Connection String**:
   - Go to **Clusters** → **Connect** → **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name

## Step 5: Redeploy After Environment Variables

After adding environment variables:

1. Go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment
3. Or trigger a new deployment by pushing to your repository

## Step 6: Verify Deployment

1. Visit your deployment URL: `https://your-project.vercel.app`
2. Test the public pages
3. Test admin login: `https://your-project.vercel.app/admin/login`
4. Verify database connection

## Step 7: Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_BASE_URL` environment variable with your custom domain

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 18.x by default)

### Database Connection Issues

- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas network access settings
- Ensure database user has correct permissions
- Check connection string format

### Environment Variables Not Working

- Ensure variables are added for **Production**, **Preview**, and **Development** environments
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

### Authentication Issues

- Verify `JWT_SECRET` is set
- Check that admin users exist in database
- Clear browser cookies and try again

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] MongoDB connection working
- [ ] Public pages loading correctly
- [ ] Admin login working
- [ ] Database operations working
- [ ] File uploads working (if using)
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic with Vercel)

## Continuous Deployment

Vercel automatically deploys when you push to your main branch:
- **Production**: Deploys from `main` branch
- **Preview**: Deploys from other branches and pull requests

## Support

- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- MongoDB Atlas Docs: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

