export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 md:p-24">
      <div className="z-10 max-w-5xl w-full space-y-8">
        <div className="space-y-4 animate-pulse">
          <div className="h-8 w-3/4 bg-secondary/50 rounded" />
          <div className="h-4 w-full bg-secondary/50 rounded" />
        </div>
        
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="h-4 w-16 bg-secondary/50 rounded" />
              <div className="h-4 flex-1 bg-secondary/50 rounded" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 