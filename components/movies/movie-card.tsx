"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FavoriteButton } from "./favorite-button"
import { Star, Heart } from "lucide-react"
import { buildImageUrl, formatRating, type Movie } from "@/lib/tmdb-api"
import { useFavorites } from "@/contexts/favorites-context"

interface MovieCardProps {
  movie: Movie
  onClick?: () => void
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const rating = Number.parseFloat(formatRating(movie.vote_average))
  const { isFavorite } = useFavorites()
  const isMovieFavorite = isFavorite(movie.id)

  return (
    <Card className="cursor-pointer transition-all duration-200 relative" onClick={onClick}>
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
          <Image
            src={buildImageUrl(movie.poster_path) || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 33vw"
          />

          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-black/70 text-white border-0">
              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
              {rating}
            </Badge>
          </div>

          {isMovieFavorite && (
            <div className="absolute top-2 left-2">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
            </div>
          )}

          <div className="absolute bottom-2 right-2">
            <FavoriteButton
              movie={movie}
              variant="secondary"
              size="icon"
              showText={false}
              className="bg-black/70 border-0"
            />
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-sm truncate mb-2">{movie.title}</h3>
          <p className="text-xs text-muted-foreground">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : "TBA"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
