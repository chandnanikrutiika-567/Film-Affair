"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MovieSection } from "./movie-section"
import type { Movie } from "@/lib/tmdb-api"

interface MovieTabsProps {
  onMovieClick?: (movie: Movie) => void
}

export function MovieTabs({ onMovieClick }: MovieTabsProps) {
  return (
    <Tabs defaultValue="popular" className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-md">
        <TabsTrigger value="popular">Popular</TabsTrigger>
        <TabsTrigger value="top_rated">Top Rated</TabsTrigger>
      </TabsList>

      <div className="mt-8">
        <TabsContent value="popular" className="space-y-6">
          <MovieSection title="Popular Movies" type="popular" onMovieClick={onMovieClick} />
        </TabsContent>

        <TabsContent value="top_rated" className="space-y-6">
          <MovieSection title="Top Rated Movies" type="top_rated" onMovieClick={onMovieClick} />
        </TabsContent>
      </div>
    </Tabs>
  )
}
