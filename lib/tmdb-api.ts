// TMDB API configuration and types
export const TMDB_BASE_URL = "https://api.themoviedb.org/3"
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

// For demo purposes, using a public API key. In production, use environment variables
const TMDB_API_KEY = "5fd58f35821f84e691d50ec7d505d8b2" // Updated key

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  adult: boolean
  original_language: string
  original_title: string
  popularity: number
  video: boolean
}

export interface MovieDetails extends Movie {
  genres: Genre[]
  runtime: number | null
  budget: number
  revenue: number
  homepage: string | null
  imdb_id: string | null
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string | null
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

// Helper function to build API URLs
function buildApiUrl(endpoint: string, params: Record<string, string | number> = {}): string {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`)
  url.searchParams.append("api_key", TMDB_API_KEY)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value.toString())
  })

  return url.toString()
}

// Helper function to build image URLs
export function buildImageUrl(path: string | null, size = "w500"): string {
  if (!path) return "/placeholder.svg?height=750&width=500&text=No+Image"
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

// API functions
export async function fetchPopularMovies(page = 1): Promise<TMDBResponse<Movie>> {
  try {
    const url = buildApiUrl("/movie/popular", { page })
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching popular movies:", error)
    throw new Error("Failed to fetch popular movies")
  }
}

export async function fetchTopRatedMovies(page = 1): Promise<TMDBResponse<Movie>> {
  try {
    const url = buildApiUrl("/movie/top_rated", { page })
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching top rated movies:", error)
    throw new Error("Failed to fetch top rated movies")
  }
}

export async function fetchNowPlayingMovies(page = 1): Promise<TMDBResponse<Movie>> {
  try {
    const url = buildApiUrl("/movie/now_playing", { page })
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching now playing movies:", error)
    throw new Error("Failed to fetch now playing movies")
  }
}

export async function searchMovies(query: string, page = 1): Promise<TMDBResponse<Movie>> {
  try {
    if (!query.trim()) {
      return { page: 1, results: [], total_pages: 0, total_results: 0 }
    }

    const url = buildApiUrl("/search/movie", { query: query.trim(), page })
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error searching movies:", error)
    throw new Error("Failed to search movies")
  }
}

export async function fetchMovieDetails(movieId: number): Promise<MovieDetails> {
  try {
    const url = buildApiUrl(`/movie/${movieId}`)
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching movie details:", error)
    throw new Error("Failed to fetch movie details")
  }
}

export async function fetchGenres(): Promise<Genre[]> {
  try {
    const url = buildApiUrl("/genre/movie/list")
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.genres
  } catch (error) {
    console.error("Error fetching genres:", error)
    throw new Error("Failed to fetch genres")
  }
}

// Utility functions
export function formatRating(rating: number): string {
  return (rating / 2).toFixed(1) // Convert from 10-point to 5-point scale
}

export function formatReleaseDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return dateString
  }
}

export function formatRuntime(minutes: number | null): string {
  if (!minutes) return "Runtime unknown"

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) return `${remainingMinutes}m`
  if (remainingMinutes === 0) return `${hours}h`

  return `${hours}h ${remainingMinutes}m`
}

export function getGenreNames(genreIds: number[], allGenres: Genre[]): string[] {
  return genreIds
    .map((id) => allGenres.find((genre) => genre.id === id)?.name)
    .filter((name): name is string => name !== undefined)
}
