"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MovieGrid } from "./movie-grid"
import { usePopularMovies, useTopRatedMovies } from "@/hooks/use-movies"
import type { Movie } from "@/lib/tmdb-api"

interface MovieSectionProps {
  title: string
  type: "popular" | "top_rated"
  onMovieClick?: (movie: Movie) => void
}

export function MovieSection({ title, type, onMovieClick }: MovieSectionProps) {
  const [page, setPage] = useState(1)
  const [allMovies, setAllMovies] = useState<Movie[]>([])
  const hookResultPopular = usePopularMovies(page)
  const hookResultTopRated = useTopRatedMovies(page)
  const hookResult = type === "popular" ? hookResultPopular : hookResultTopRated

  const { data, loading, error } = hookResult

  // Update movies when new data arrives
  useEffect(() => {
    if (data?.results) {
      if (page === 1) {
        setAllMovies(data.results)
      } else {
        setAllMovies((prev) => [...prev, ...data.results])
      }
    }
  }, [data, page])

  const loadMore = () => {
    if (data && page < data.total_pages) {
      setPage((prev) => prev + 1)
    }
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Try Again
        </Button>
      </div>
    )
  }

  const hasMore = data && page < data.total_pages

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        {data && <p className="text-sm text-muted-foreground">{data.total_results.toLocaleString()} movies</p>}
      </div>

      <MovieGrid movies={allMovies} loading={loading && page === 1} onMovieClick={onMovieClick} />

      {hasMore && (
        <div className="text-center pt-6">
          <Button onClick={loadMore} disabled={loading} variant="outline" size="lg">
            {loading ? "Loading..." : "Load More Movies"}
          </Button>
        </div>
      )}
    </section>
  )
}
