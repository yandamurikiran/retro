# Instagram Reel Viewer

A web application that displays Instagram-style reels while collecting detailed user data and sending it via email.

## Features

- Realistic Instagram reel viewer interface
- User consent overlay for collecting data
- Comprehensive data collection (IP, device info, browser details, etc.)
- Email notification with all collected data
- Dark/light theme support

## Deployment on Vercel

### Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Gmail account with App Password for sending emails

### Step 1: Push to GitHub

1. Create a new GitHub repository or use an existing one.
2. Push your code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Log in to your Vercel account.
2. Click "Add New" > "Project".
3. Select your GitHub repository.
4. Configure the project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: dist

### Step 3: Environment Variables

Add the following environment variable in the Vercel project settings:
- `EMAIL_PASS`: Your Gmail app password

### Step 4: Deploy

Click "Deploy" and wait for the build to complete. Vercel will provide you with a URL for your deployed application.

## Local Development

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`.
4. Run the development server: `npm run dev`

## Important Notes

- Make sure to use an app-specific password for Gmail, not your main account password.
- The application requires user consent before collecting data.