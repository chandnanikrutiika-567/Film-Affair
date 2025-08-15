"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useFavorites } from "@/contexts/favorites-context"
import type { Movie } from "@/lib/tmdb-api"
import { cn } from "@/lib/utils"

interface FavoriteButtonProps {
  movie: Movie
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  showText?: boolean
}

export function FavoriteButton({
  movie,
  variant = "default",
  size = "default",
  className,
  showText = true,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const isMovieFavorite = isFavorite(movie.id)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering parent click events
    toggleFavorite(movie)
  }

  return (
    <Button
      variant={isMovieFavorite ? "default" : variant}
      size={size}
      onClick={handleClick}
      className={cn(
        "transition-all duration-200",
        isMovieFavorite && "bg-red-500 hover:bg-red-600 text-white",
        className,
      )}
    >
      <Heart className={cn("w-4 h-4", showText && "mr-2", isMovieFavorite && "fill-current")} />
      {showText && (isMovieFavorite ? "Remove from Favorites" : "Add to Favorites")}
    </Button>
  )
}
