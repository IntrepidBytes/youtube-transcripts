import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation"
import { TranscriptView } from "@/components/transcript-view"

const prisma = new PrismaClient()

async function getTranscript(id: string) {
  try {
    const transcript = await prisma.transcript.findUnique({
      where: { id },
    })
    return transcript
  } catch (error) {
    console.error("Error fetching transcript:", error)
    return null
  }
}

export default async function TranscriptPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { timestamps?: string }
}) {
  const transcript = await getTranscript(params.id)
  const showTimestamps = searchParams.timestamps !== "false"

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
        <TranscriptView transcript={transcript} showTimestamps={showTimestamps} />
      </div>
    </main>
  )
} 