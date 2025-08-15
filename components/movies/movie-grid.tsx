"use client"

import { MovieCard } from "./movie-card"
import { Skeleton } from "@/components/ui/skeleton"
import type { Movie } from "@/lib/tmdb-api"

interface MovieGridProps {
  movies: Movie[]
  loading?: boolean
  onMovieClick?: (movie: Movie) => void
}

function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="h-[400px] w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}

export function MovieGrid({ movies, loading, onMovieClick }: MovieGridProps) {
  if (loading) {
    return <MovieGridSkeleton />
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <span className="text-2xl">Film</span>
        </div>
        <p className="text-muted-foreground text-lg">No movies found</p>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your search or browse different categories</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className="animate-in fade-in-0 slide-in-from-bottom-4"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <MovieCard movie={movie} onClick={() => onMovieClick?.(movie)} />
        </div>
      ))}
    </div>
  )
}
