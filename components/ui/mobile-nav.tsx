"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Heart, User, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useFavorites } from "@/contexts/favorites-context"
import { ThemeToggle } from "@/components/theme/theme-toggle"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { user, logout } = useAuth()
  const { favorites } = useFavorites()

  const handleNavigation = (path: string) => {
    router.push(path)
    setOpen(false)
  }

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold">Menu</h2>
            <ThemeToggle />
          </div>

          <nav className="flex-1 space-y-2">
            <Button variant="ghost" className="w-full justify-start" onClick={() => handleNavigation("/")}>
              <Home className="mr-3 h-4 w-4" />
              Home
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start relative"
              onClick={() => handleNavigation("/favorites")}
            >
              <Heart className="mr-3 h-4 w-4" />
              Favorites
              {favorites.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>
          </nav>

          <div className="border-t pt-4 space-y-4">
            <div className="flex items-center space-x-3 px-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>

            <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleLogout}>
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
