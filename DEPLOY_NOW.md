# Quick Deployment Instructions

## Current Issue
The Git author email (`tarikumy@gamil.com`) needs to be added to your Vercel team to deploy via CLI.

## Solution Options

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Find your project**: "dashet-website"
3. **Click "Deployments"** tab
4. **Click "Redeploy"** on the latest deployment
   - OR
5. **Push to GitHub/GitLab** (if connected):
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```
   Vercel will automatically deploy when you push to the main branch.

### Option 2: Fix Permissions and Deploy via CLI

1. **Add Git Email to Vercel Team**:
   - Go to: https://vercel.com/teams/tarikpod123-7869/settings/members
   - Add `tarikumy@gamil.com` as a team member
   - OR change your Git email to match your Vercel account email

2. **Then deploy**:
   ```bash
   vercel --prod
   ```

### Option 3: Use Different Git Email

Change your Git email to match your Vercel account:

```bash
git config user.email "your-vercel-email@example.com"
git commit --amend --reset-author --no-edit
```

Then deploy:
```bash
vercel --prod
```

## Environment Variables Setup

**IMPORTANT**: Before deployment works properly, set these in Vercel Dashboard:

1. Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

2. Add these variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here
NEXT_PUBLIC_BASE_URL=https://dashet-website.vercel.app
```

3. **Redeploy** after adding variables.

## Recommended: Use GitHub Integration

If your code is on GitHub:

1. Go to Vercel Dashboard
2. Import from GitHub (if not already)
3. Connect your repository
4. Every push to `main` branch will auto-deploy
5. No CLI needed!

## Current Project Info

- **Project Name**: dashet-website
- **Project ID**: prj_h83oPK26etunEaaQgp1rNMBseMhg
- **Team**: tarikpod123-7869

## Quick Commands

```bash
# Check Vercel status
vercel ls

# View project info
vercel inspect

# Open project in browser
vercel open
```

