"use client"

import { useState } from "react"
import { SearchBar } from "./search-bar"
import { SearchResults } from "./search-results"
import { MovieTabs } from "./movie-tabs"
import { QuickSearch } from "./quick-search"
import type { Movie } from "@/lib/tmdb-api"

interface MovieDashboardProps {
  onMovieClick?: (movie: Movie) => void
}

export function MovieDashboard({ onMovieClick }: MovieDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query.trim())
  }

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Discover Amazing Movies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Your personal movie guide — trending now, top picks, and what's next in theaters.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search for movies..."
            className="transition-all duration-200"
          />
        </div>

        {!searchQuery && (
          <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <QuickSearch onQuickSearch={handleQuickSearch} />
          </div>
        )}
      </div>

      <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
        {searchQuery ? (
          <SearchResults query={searchQuery} onMovieClick={onMovieClick} />
        ) : (
          <MovieTabs onMovieClick={onMovieClick} />
        )}
      </div>
    </div>
  )
}
