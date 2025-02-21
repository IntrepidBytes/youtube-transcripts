import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24">
      <div className="text-center space-y-4 animate-in">
        <h2 className="text-2xl font-bold">Transcript Not Found</h2>
        <p className="text-muted-foreground">
          The transcript you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-2 text-sm font-medium bg-primary hover:bg-primary/90 rounded-lg transition-colors"
        >
          Return Home
        </Link>
      </div>
    </main>
  )
} 