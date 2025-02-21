# YouTube Transcript Web App

A modern web application for fetching, viewing, and managing YouTube video transcripts. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 Beautiful dark mode design with purple accents
- 📝 Fetch transcripts from any YouTube video
- ⏱️ Toggle timestamp display
- 📋 Copy, share, and save transcripts
- 🔍 Search through saved transcripts
- 📱 Fully responsive design
- ✨ Smooth animations and transitions

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui
- Prisma (SQLite)
- Framer Motion

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Initialize the database:
   ```bash
   npx prisma db push
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL="file:./dev.db"
YOUTUBE_API_KEY="your_youtube_api_key"
```

## License

MIT
