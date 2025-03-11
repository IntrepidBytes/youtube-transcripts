import { notFound } from "next/navigation"
import { TranscriptView } from "@/components/transcript-view"
import { YoutubeTranscript } from "youtube-transcript"

async function getTranscript(id: string) {
  try {
    // Get video details
    const apiUrl = `https://youtube-v31.p.rapidapi.com/videos?part=snippet&id=${id}`
    
    const videoInfoResponse = await fetch(apiUrl, {
      headers: {
        'x-rapidapi-key': process.env.YOUTUBE_API_KEY || '',
        'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
      }
    })
    
    if (!videoInfoResponse.ok) {
      console.error("Video info fetch failed:", {
        status: videoInfoResponse.status,
        statusText: videoInfoResponse.statusText
      })
      return null
    }

    const videoInfo = await videoInfoResponse.json()
    if (!videoInfo.items?.length) {
      return null
    }
    
    const videoTitle = videoInfo.items[0]?.snippet?.title || "Untitled Video"
    const videoUrl = `https://www.youtube.com/watch?v=${id}`

    // Get transcript
    const transcript = await YoutubeTranscript.fetchTranscript(id)

    if (!transcript || transcript.length === 0) {
      return null
    }

    return {
      id,
      videoId: id,
      videoTitle,
      videoUrl,
      content: transcript,
    }
  } catch (error) {
    console.error("Error fetching transcript:", error)
    return null
  }
}

export default async function TranscriptPage({
  params,
}: {
  params: { id: string }
}) {
  const transcript = await getTranscript(params.id)

  if (!transcript) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 md:p-24">
      <div className="z-10 max-w-5xl w-full space-y-8">
        <div className="space-y-4 animate-in">
          <h1 className="text-3xl font-bold tracking-tight">
            {transcript.videoTitle}
          </h1>
          <p className="text-sm text-muted-foreground">
            Transcript for{" "}
            <a
              href={transcript.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {transcript.videoUrl}
            </a>
          </p>
        </div>
        <TranscriptView transcript={transcript} />
      </div>
    </main>
  )
} 