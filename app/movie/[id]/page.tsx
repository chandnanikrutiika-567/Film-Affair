"use client"

import { useParams, useRouter } from "next/navigation"
import { useMovieDetails } from "@/hooks/use-movies"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { MovieDetailView } from "@/components/movies/movie-detail-view"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

function MovieDetailPage() {
  const params = useParams()
  const router = useRouter()
  const movieId = params.id ? Number.parseInt(params.id as string) : null
  const { data: movie, loading, error } = useMovieDetails(movieId)

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
            <p className="text-muted-foreground mb-6">{error || "The movie you're looking for doesn't exist."}</p>
            <Button onClick={() => router.push("/")}>Go Home</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <MovieDetailView movie={movie} onBack={() => router.back()} />
    </div>
  )
}

export default function MoviePage() {
  const router = useRouter()

  return (
    <ProtectedRoute
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold">Movie Explorer</h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">Please sign in to view movie details</p>
            <Button onClick={() => router.push("/auth")} size="lg">
              Sign In
            </Button>
          </div>
        </div>
      }
    >
      <MovieDetailPage />
    </ProtectedRoute>
  )
}
