export interface TranscriptSegment {
  text: string
  duration: number
  offset: number
}

export interface Transcript {
  id: string
  videoId: string
  videoTitle: string
  videoUrl: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface TranscriptResponse {
  id: string
  videoId: string
  videoTitle: string
  videoUrl: string
  content: TranscriptSegment[]
} 