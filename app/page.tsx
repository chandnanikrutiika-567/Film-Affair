"use client"

import { useAuth } from "@/contexts/auth-context"
import { useFavorites } from "@/contexts/favorites-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { MovieDashboard } from "@/components/movies/movie-dashboard"
import { MobileNav } from "@/components/ui/mobile-nav"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { useRouter } from "next/navigation"
import { Heart } from "lucide-react"
import type { Movie } from "@/lib/tmdb-api"

function Dashboard() {
  const { user, logout } = useAuth()
  const { favorites } = useFavorites()
  const router = useRouter()

  const handleMovieClick = (movie: Movie) => {
    router.push(`/movie/${movie.id}`)
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Film Affair
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.push("/favorites")}
                size="sm"
                className="relative transition-all duration-200"
              >
                <Heart className="w-4 h-4 mr-2" />
                Favorites
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Button>
              <ThemeToggle />
              <span className="text-sm text-muted-foreground hidden lg:block">Welcome, {user?.name}</span>
              <Button variant="outline" onClick={logout} size="sm">
                Sign Out
              </Button>
            </div>

            <MobileNav />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        <MovieDashboard onMovieClick={handleMovieClick} />
      </main>
    </div>
  )
}

export default function HomePage() {
  const router = useRouter()

  return (
    <ProtectedRoute
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/50 transition-colors duration-300">
          <div className="text-center space-y-6 max-w-md mx-auto px-4">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Film Affair
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/80 mx-auto rounded-full"></div>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Your personal movie guide — trending now, top picks, and what's next in theaters.
            </p>
            <Button onClick={() => router.push("/auth")} size="lg" className="transition-all duration-200 shadow-lg">
              Get Started
            </Button>
          </div>
        </div>
      }
    >
      <Dashboard />
    </ProtectedRoute>
  )
}
