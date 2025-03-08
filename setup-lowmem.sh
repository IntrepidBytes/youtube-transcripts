#!/bin/bash

# Setup script for low-memory environments (1GB RAM or less)
echo "Setting up YouTube Transcripts app for low-memory environment..."

# Create swap file if it doesn't exist
if [ ! -f /swapfile ]; then
  echo "Creating 2GB swap file..."
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  echo "/swapfile none swap sw 0 0" | sudo tee -a /etc/fstab
  echo "Swap file created and enabled."
else
  echo "Swap file already exists."
fi

# Check if swap is enabled
swapon --show

# Install dependencies in chunks to avoid memory issues
echo "Installing dependencies in chunks to avoid memory issues..."

# First, install only production dependencies with reduced memory usage
export NODE_OPTIONS="--max-old-space-size=512"
npm install --no-fund --no-audit --no-optional --production

# Then install dev dependencies
npm install --no-fund --no-audit --no-optional --only=dev

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "Creating .env file..."
  cp .env.example .env
  echo "Please edit .env file to add your YouTube API key."
fi

# Build the application
echo "Building the application..."
npm run build

echo "Setup complete! You can now run the application with 'npm run start'" 