# Environment Setup Guide

## Overview
This project uses Supabase as the backend service and Resend for email functionality. You need to set up environment variables to make everything work properly.

## Required Environment Variables

### 1. Supabase Configuration
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key

### 2. Email Service (Resend)
- `RESEND_API_KEY`: Your Resend API key for sending emails

### 3. Optional (for advanced usage)
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for admin operations
- `DATABASE_URL`: Direct database connection string

## Setup Instructions

### Step 1: Create Environment File
1. Copy the `.env.example` file to `.env` in your project root
2. Or create a new `.env` file with the content below

### Step 2: Configure Supabase
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings > API
4. Copy the Project URL and anon/public key

### Step 3: Configure Resend (for email functionality)
1. Sign up at [Resend](https://resend.com)
2. Get your API key from the dashboard
3. Add it to your `.env` file

### Step 4: Example .env File
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key_here

# Optional
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres

# Environment
NODE_ENV=development
```

## Security Notes
- ✅ `.env` files are automatically ignored by git
- ✅ Never commit API keys or secrets to version control
- ✅ Use different keys for development and production
- ✅ Rotate keys regularly for security

## Testing the Setup
Run the test script to verify your backend connectivity:
```bash
node test-backend.js
```

## Troubleshooting
- If you get connection errors, check your Supabase URL and keys
- If emails aren't sending, verify your Resend API key
- Make sure your Supabase project is active and not paused
- Check that your database tables exist and RLS policies are configured

## Support
- Supabase: [docs.supabase.com](https://docs.supabase.com)
- Resend: [resend.com/docs](https://resend.com/docs)
- Project Issues: Check the project repository
