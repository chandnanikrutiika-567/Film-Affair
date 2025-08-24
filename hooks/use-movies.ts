"use client"

import { useState, useEffect } from "react"
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  searchMovies,
  fetchMovieDetails,
  fetchGenres,
  type Movie,
  type MovieDetails,
  type Genre,
  type TMDBResponse,
} from "@/lib/tmdb-api"

export function usePopularMovies(page = 1) {
  const [data, setData] = useState<TMDBResponse<Movie> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchPopularMovies(page)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load movies")
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [page])

  return { data, loading, error }
}

export function useTopRatedMovies(page = 1) {
  const [data, setData] = useState<TMDBResponse<Movie> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchTopRatedMovies(page)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load movies")
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [page])

  return { data, loading, error }
}

export function useMovieSearch(query: string, page = 1) {
  const [data, setData] = useState<TMDBResponse<Movie> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function search() {
      if (!query.trim()) {
        setData(null)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const result = await searchMovies(query, page)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Search failed")
      } finally {
        setLoading(false)
      }
    }

    const timeoutId = setTimeout(search, 300) // Debounce search
    return () => clearTimeout(timeoutId)
  }, [query, page])

  return { data, loading, error }
}

export function useMovieDetails(movieId: number | null) {
  const [data, setData] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!movieId) {
      setData(null)
      return
    }

    async function loadMovieDetails() {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchMovieDetails(movieId)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load movie details")
      } finally {
        setLoading(false)
      }
    }

    loadMovieDetails()
  }, [movieId])

  return { data, loading, error }
}

export function useGenres() {
  const [data, setData] = useState<Genre[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadGenres() {
      try {
        setLoading(true)
        setError(null)
        const result = await fetchGenres()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load genres")
      } finally {
        setLoading(false)
      }
    }

    loadGenres()
  }, [])

  return { data, loading, error }
}
