#!/bin/bash

# Instagram Reel Viewer Deployment Script
# This script helps deploy the application to GitHub and Vercel

echo "=== Instagram Reel Viewer Deployment ==="
echo "This script will help you deploy your application."

# Set GitHub repository URL
GITHUB_REPO="https://github.com/yandamurikiran/retro.git"
# You'll need to provide your GitHub token when running this script
# Do not store tokens in scripts for security reasons
GITHUB_TOKEN=""

echo ""
echo "=== Step 1: Pushing to GitHub ==="
echo "Repository: $GITHUB_REPO"

# Initialize git if not already done
if [ ! -d .git ]; then
  git init
  echo "Git repository initialized."
fi

# Add all files
git add .
echo "Files added to git."

# Commit changes
git commit -m "Deployment update $(date)"
echo "Changes committed."

# Set up remote with token for authentication
if git remote | grep -q "origin"; then
  git remote remove origin
fi

# Use token in the URL for authentication
GITHUB_URL_WITH_TOKEN="https://${GITHUB_TOKEN}@github.com/yandamurikiran/retro.git"
git remote add origin "$GITHUB_URL_WITH_TOKEN"
echo "Remote repository set."

# Push to GitHub
git push -u origin main --force
echo "Code pushed to GitHub."

echo ""
echo "=== Step 2: Next Steps for Vercel Deployment ==="
echo "1. Go to your Vercel dashboard: https://vercel.com/dashboard"
echo "2. Import your GitHub repository: $GITHUB_REPO"
echo "3. Configure your project settings:"
echo "   - Framework Preset: Other"
echo "   - Build Command: npm run build"
echo "   - Output Directory: dist"
echo ""
echo "4. Add the following environment variables:"
echo "   - EMAIL_PASS: Your Gmail app password"
echo ""
echo "5. Click 'Deploy' to deploy your application."
echo ""
echo "Your application is currently deployed at: https://retro-six-eta.vercel.app/"
echo "You may need to redeploy if you've made significant changes."
echo ""
echo "=== Deployment preparation complete! ==="