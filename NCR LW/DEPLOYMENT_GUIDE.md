# Deployment Guide - Git & Vercel

This guide will help you push your code to GitHub and deploy it to Vercel.

## Step 1: Initialize Git Repository

Run these commands in your terminal (in the project directory):

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: NCR Launch Watch landing page"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right
3. Select **"New repository"**
4. Name it: `ncr-launch-watch` (or any name you prefer)
5. **Don't** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

## Step 3: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ncr-launch-watch.git

# Rename default branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Note:** You'll be prompted for your GitHub username and password/token. If you use 2FA, you'll need to create a Personal Access Token instead of using your password.

## Step 4: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [Vercel](https://vercel.com) and sign in (or create an account)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository:
   - Click **"Import Git Repository"**
   - Select your `ncr-launch-watch` repository
   - Click **"Import"**
4. Configure the project:
   - **Framework Preset**: Other (or leave as default)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty (no build needed for static site)
   - **Output Directory**: Leave empty
5. Click **"Deploy"**
6. Wait for deployment to complete (usually 1-2 minutes)
7. Your site will be live at a URL like: `https://ncr-launch-watch.vercel.app`

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
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
   - Link to existing project? **No** (first time)
   - Project name: `ncr-launch-watch`
   - Directory: `./` (press Enter)
   - Override settings? **No** (press Enter)

5. For production deployment:
   ```bash
   vercel --prod
   ```

## Step 5: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain (e.g., `ncrlaunchwatch.com`)
4. Follow the DNS configuration instructions

## Important Notes

### Google Apps Script URL
- Your Google Apps Script URL is already configured in `index.html`
- It will work the same way on Vercel as it does locally
- No changes needed!

### Environment Variables (if needed later)
If you need to use environment variables:
1. Go to Vercel project settings
2. Click **"Environment Variables"**
3. Add your variables
4. Redeploy

### Updating Your Site

After making changes:

```bash
# Add changed files
git add .

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub
git push

# Vercel will automatically redeploy when you push to GitHub!
```

## Troubleshooting

### Git Push Issues
- **Authentication failed**: Create a Personal Access Token in GitHub Settings → Developer settings → Personal access tokens
- **Repository not found**: Make sure you've created the repository on GitHub first

### Vercel Deployment Issues
- **Build failed**: Make sure you selected "Other" as framework preset
- **404 errors**: Check that `index.html` is in the root directory
- **Form not working**: Verify your Google Apps Script URL is correct in `index.html`

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Deploy to Vercel
3. ✅ Test your live site
4. ✅ Share your URL!

Your site is now live! 🎉

