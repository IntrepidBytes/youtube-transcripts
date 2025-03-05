# YouTube Transcript Web App

A modern web application for fetching, viewing, and managing YouTube video transcripts. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 📝 Fetch transcripts from any YouTube video
- 📋 Copy and download transcripts
- 📱 Fully responsive design

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Framer Motion

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Run the production server:
   ```bash
   npm run build
   npm run start
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
YOUTUBE_API_KEY="your_youtube_api_key"
```

## License

MIT
