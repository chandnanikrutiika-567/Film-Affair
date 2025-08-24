"use client"

import { useRouter } from "next/navigation"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { MovieGrid } from "@/components/movies/movie-grid"
import { MobileNav } from "@/components/ui/mobile-nav"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { useFavorites } from "@/contexts/favorites-context"
import { useAuth } from "@/contexts/auth-context"
import { ArrowLeft, Heart, Trash2 } from "lucide-react"
import type { Movie } from "@/lib/tmdb-api"

function FavoritesPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { favorites, clearFavorites } = useFavorites()

  const handleMovieClick = (movie: Movie) => {
    router.push(`/movie/${movie.id}`)
  }

  const handleClearAll = () => {
    if (confirm("Are you sure you want to remove all movies from your favorites?")) {
      clearFavorites()
    }
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => router.push("/")} size="sm" className="hidden md:flex">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Movies
              </Button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                My Favorites
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <span className="text-sm text-muted-foreground hidden lg:block">Welcome, {user?.name}</span>
              <Button variant="outline" onClick={logout} size="sm">
                Sign Out
              </Button>
            </div>

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Heart className="w-8 h-8 text-red-500 fill-current animate-pulse" />
                Your Favorite Movies
              </h2>
              <p className="text-muted-foreground">
                {favorites.length === 0
                  ? "You haven't added any movies to your favorites yet"
                  : `${favorites.length} ${favorites.length === 1 ? "movie" : "movies"} in your collection`}
              </p>
            </div>

            {favorites.length > 0 && (
              <Button
                variant="outline"
                onClick={handleClearAll}
                className="text-destructive hover:text-destructive transition-all duration-200 hover:scale-105 bg-transparent"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>

          {/* Movies Grid */}
          {favorites.length > 0 ? (
            <MovieGrid movies={favorites} onMovieClick={handleMovieClick} />
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 flex items-center justify-center">
                <Heart className="w-16 h-16 text-red-500/50" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start exploring movies and add them to your favorites to see them here
              </p>
              <Button
                onClick={() => router.push("/")}
                size="lg"
                className="transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Discover Movies
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default function FavoritesPageWrapper() {
  const router = useRouter()

  return (
    <ProtectedRoute
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold">Movie Explorer</h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">Please sign in to view your favorites</p>
            <Button onClick={() => router.push("/auth")} size="lg">
              Sign In
            </Button>
          </div>
        </div>
      }
    >
      <FavoritesPage />
    </ProtectedRoute>
  )
}
