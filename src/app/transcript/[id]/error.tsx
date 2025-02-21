"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24">
      <div className="text-center space-y-4 animate-in">
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-muted-foreground">
          {error.message || "An error occurred while loading the transcript."}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 text-sm font-medium bg-primary hover:bg-primary/90 rounded-lg transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  )
} 