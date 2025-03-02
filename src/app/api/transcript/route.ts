import { NextResponse } from "next/server"
import { YoutubeTranscript } from "youtube-transcript"

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    // Extract video ID from URL
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]

    if (!videoId) {
      return NextResponse.json(
        { message: "Invalid YouTube URL" },
        { status: 400 }
      )
    }

    // Get video details
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    console.log("Fetching video details from:", apiUrl.replace(process.env.YOUTUBE_API_KEY || "", "[API_KEY]"))
    
    const videoInfoResponse = await fetch(apiUrl, {
      headers: {
        'Referer': 'http://localhost:3000'
      }
    })
    
    if (!videoInfoResponse.ok) {
      const errorData = await videoInfoResponse.json().catch(() => ({}))
      console.error("Video info fetch failed:", {
        status: videoInfoResponse.status,
        statusText: videoInfoResponse.statusText,
        error: errorData
      })
      return NextResponse.json(
        { message: `Failed to fetch video details: ${videoInfoResponse.statusText}` },
        { status: videoInfoResponse.status }
      )
    }

    const videoInfo = await videoInfoResponse.json()
    if (!videoInfo.items?.length) {
      return NextResponse.json(
        { message: "Video not found or API key invalid" },
        { status: 404 }
      )
    }
    
    const videoTitle = videoInfo.items[0]?.snippet?.title || "Untitled Video"

    // Get transcript
    console.log("Fetching transcript for video:", videoId)
    const transcript = await YoutubeTranscript.fetchTranscript(videoId)

    if (!transcript || transcript.length === 0) {
      return NextResponse.json(
        { message: "No transcript available for this video" },
        { status: 404 }
      )
    }

    // Return transcript data directly without saving to database
    return NextResponse.json({
      id: videoId, // Using videoId as the identifier
      videoId,
      videoTitle,
      videoUrl: url,
      content: transcript,
    })
  } catch (error) {
    console.error("Transcript fetch error:", error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to fetch transcript" },
      { status: 500 }
    )
  }
} 