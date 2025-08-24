"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type User, type AuthState, validateToken } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (user: User, token: string) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing auth on mount
    const token = localStorage.getItem("auth_token")
    const userData = localStorage.getItem("user_data")

    if (token && userData && validateToken(token)) {
      try {
        const user = JSON.parse(userData)
        setAuthState({
          user,
          token,
          isAuthenticated: true,
        })
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
      }
    }

    setLoading(false)
  }, [])

  const login = (user: User, token: string) => {
    localStorage.setItem("auth_token", token)
    localStorage.setItem("user_data", JSON.stringify(user))
    setAuthState({
      user,
      token,
      isAuthenticated: true,
    })
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    })
  }

  return <AuthContext.Provider value={{ ...authState, login, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
