"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function TranscriptForm() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

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
      router.push(`/transcript/${data.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6 animate-in">
      <div className="space-y-2">
        <input
          type="url"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 text-lg rounded-lg bg-secondary/50 border border-secondary focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-colors"
          required
        />
        <p className="text-sm text-muted-foreground">
          The transcript will be formatted for easy use with LLMs
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-500 animate-in">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 text-lg font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Loading..." : "Get Transcript"}
      </button>
    </form>
  )
} 