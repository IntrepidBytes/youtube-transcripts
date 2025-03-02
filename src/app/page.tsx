import { TranscriptForm } from "@/components/transcript-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 md:p-24">
      <div className="z-10 max-w-5xl w-full">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-center animate-in">
          YouTube Transcript
        </h1>
        <p className="mb-12 text-lg text-center text-muted-foreground animate-in">
          Paste a YouTube URL to get the transcript
        </p>
        <TranscriptForm />
      </div>
    </main>
  )
}
