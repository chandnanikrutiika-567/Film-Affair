"use client"

import { MovieGrid } from "./movie-grid"
import { Button } from "@/components/ui/button"
import { SearchLoadingSkeleton } from "@/components/ui/enhanced-loading"
import { useMovieSearch } from "@/hooks/use-movies"
import { useState, useEffect } from "react"
import type { Movie } from "@/lib/tmdb-api"

interface SearchResultsProps {
  query: string
  onMovieClick?: (movie: Movie) => void
}

export function SearchResults({ query, onMovieClick }: SearchResultsProps) {
  const [page, setPage] = useState(1)
  const [allMovies, setAllMovies] = useState<Movie[]>([])
  const { data, loading, error } = useMovieSearch(query, page)

  // Reset when query changes
  useEffect(() => {
    setPage(1)
    setAllMovies([])
  }, [query])

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

  if (!query.trim()) {
    return null
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
          <span className="text-2xl">⚠️</span>
        </div>
        <p className="text-destructive mb-4 text-lg font-medium">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Try Again
        </Button>
      </div>
    )
  }

  const hasMore = data && page < data.total_pages
  const totalResults = data?.total_results || 0

  if (loading && page === 1) {
    return <SearchLoadingSkeleton />
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Search Results for "{query}"</h2>
        {data && (
          <p className="text-sm text-muted-foreground">
            {totalResults.toLocaleString()} {totalResults === 1 ? "result" : "results"}
          </p>
        )}
      </div>

      <MovieGrid movies={allMovies} loading={false} onMovieClick={onMovieClick} />

      {hasMore && (
        <div className="text-center pt-6">
          <Button
            onClick={loadMore}
            disabled={loading}
            variant="outline"
            size="lg"
            className="transition-all duration-200 hover:scale-105 bg-transparent"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                Loading...
              </>
            ) : (
              "Load More Results"
            )}
          </Button>
        </div>
      )}

      {allMovies.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <span className="text-2xl">🔍</span>
          </div>
          <p className="text-muted-foreground text-lg mb-2">No movies found</p>
          <p className="text-sm text-muted-foreground">Try searching with different keywords or check your spelling</p>
        </div>
      )}
    </section>
  )
}
