"use client"

import { useState } from "react"
import { TranscriptSegment } from "@/types"
import { TranscriptView } from "./transcript-view"

export function TranscriptForm() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [transcript, setTranscript] = useState<{
    id: string;
    videoId: string;
    videoTitle: string;
    videoUrl: string;
    content: TranscriptSegment[];
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    setTranscript(null)

    try {
      const response = await fetch("/api/transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to fetch transcript")
      }

      const data = await response.json()
      setTranscript(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="w-full px-3 py-2 text-sm rounded-md bg-secondary/50 focus:outline-none focus:ring-1 focus:ring-primary"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Get Transcript"}
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-xs animate-in">{error}</p>
        )}
      </form>

      {transcript && (
        <div className="mt-8 animate-in">
          <div className="space-y-2 mb-4">
            <h2 className="text-xl font-bold tracking-tight">
              {transcript.videoTitle}
            </h2>
            <p className="text-xs text-muted-foreground">
              <a
                href={transcript.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View on YouTube
              </a>
            </p>
          </div>
          <TranscriptView transcript={transcript} />
        </div>
      )}
    </div>
  );
} 