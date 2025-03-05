"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TranscriptSegment } from "@/types"
import { Download } from "lucide-react"

interface TranscriptViewProps {
  transcript: {
    id: string;
    videoId: string;
    videoTitle: string;
    videoUrl: string;
    content: TranscriptSegment[];
  }
}

export function TranscriptView({ transcript }: TranscriptViewProps) {
  const [copied, setCopied] = useState(false)
  const segments = transcript.content

  const copyToClipboard = async () => {
    try {
      const text = formatTranscriptText(segments.map(segment => segment.text).join(" "))
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const downloadTranscript = () => {
    try {
      const content = formatTranscriptText(segments.map(segment => segment.text).join(" "))
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${transcript.videoTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_transcript.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error("Failed to download:", err)
    }
  }

  const formatTranscriptText = (text: string) => {
    return text
      .replace(/&amp;#39;/g, "'")  // Fix apostrophes
      .replace(/&amp;/g, "&")      // Fix ampersands
      .replace(/&#39;/g, "'")      // Fix any remaining apostrophes
      .replace(/\s+/g, " ")        // Remove extra spaces
      .replace(/\s+([.,!?])/g, "$1") // Fix punctuation spacing
      .replace(/(^\w|\.\s+\w)/g, letter => letter.toUpperCase()) // Capitalize sentences
      .trim()
  }

  return (
    <div className="space-y-6 animate-in">
      <div className="relative h-10">
        <button
          onClick={copyToClipboard}
          className="absolute left-0 px-8 py-2 text-sm font-medium bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={downloadTranscript}
          className="absolute right-0 px-8 py-2 text-sm font-medium bg-secondary hover:bg-secondary/80 rounded-lg transition-colors flex items-center gap-2"
        >
          <Download size={16} />
          <span>Download</span>
        </button>
      </div>

      <div className="space-y-4 bg-secondary/20 rounded-lg p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert max-w-none"
        >
          <p className="text-foreground leading-relaxed">
            {formatTranscriptText(segments.map(segment => segment.text).join(" "))}
          </p>
        </motion.div>
      </div>
    </div>
  )
} 