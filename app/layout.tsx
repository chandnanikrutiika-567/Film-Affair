import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { AuthProvider } from "@/contexts/auth-context"
import { FavoritesProvider } from "@/contexts/favorites-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Film Affair",
  description: "Your personal movie guide — trending now, top picks, and what's next in theaters.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <AuthProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
