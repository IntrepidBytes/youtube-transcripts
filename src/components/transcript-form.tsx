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
    <div className="w-full space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            className="flex-1 px-4 py-3 rounded-lg bg-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 font-medium bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Get Transcript"}
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm animate-in">{error}</p>
        )}
      </form>

      {transcript && (
        <div className="mt-12 animate-in">
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              {transcript.videoTitle}
            </h2>
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
      )}
    </div>
  );
} 