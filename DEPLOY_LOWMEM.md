# Deployment Guide for Low-Memory Environments (1GB RAM)

This guide will help you deploy the YouTube Transcripts app on a server with limited memory, such as an Oracle VPS with 1GB RAM.

## Prerequisites

- Oracle VPS or similar with at least 1GB RAM
- Node.js 18+ installed
- Git installed

## Deployment Steps

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd youtube-transcripts
   ```

2. Run the low-memory setup script:
   ```bash
   ./setup-lowmem.sh
   ```
   This script will:
   - Create a 2GB swap file to help with memory constraints
   - Install dependencies in chunks to avoid memory issues
   - Create a .env file from the example
   - Build the application

3. Edit the .env file to add your YouTube API key:
   ```bash
   nano .env
   ```

4. Start the application:
   ```bash
   npm run start
   ```

## Using PM2 for Production (Recommended)

For a production environment, it's recommended to use PM2 to manage your Node.js application:

1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```

2. Start the application with PM2:
   ```bash
   pm2 start npm --name "youtube-transcripts" -- start
   ```

3. Set up PM2 to start on boot:
   ```bash
   pm2 startup
   pm2 save
   ```

## Troubleshooting

If you encounter memory issues during deployment:

1. Check if swap is enabled:
   ```bash
   swapon --show
   ```

2. If you need to manually install dependencies:
   ```bash
   export NODE_OPTIONS="--max-old-space-size=512"
   npm install --legacy-peer-deps --no-fund --no-audit --production
   ```

3. Monitor memory usage:
   ```bash
   free -m
   ```

4. If the build process fails, try with even more restricted memory:
   ```bash
   export NODE_OPTIONS="--max-old-space-size=384"
   npm run build
   ``` 