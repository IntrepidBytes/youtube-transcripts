import { TranscriptForm } from "@/components/transcript-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-6">
      <div className="z-10 w-full max-w-xl">
        <h1 className="mb-4 text-2xl font-bold tracking-tight text-center animate-in">
          YouTube Transcript
        </h1>
        <p className="mb-6 text-sm text-center text-muted-foreground animate-in">
          Paste a YouTube URL to get the transcript
        </p>
        <TranscriptForm />
      </div>
    </main>
  )
}
