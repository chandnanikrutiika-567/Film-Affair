"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FavoriteButton } from "./favorite-button"
import { ArrowLeft, Star, Calendar, Clock, Globe } from "lucide-react"
import { buildImageUrl, formatRating, formatReleaseDate, formatRuntime, type MovieDetails } from "@/lib/tmdb-api"

interface MovieDetailViewProps {
  movie: MovieDetails
  onBack: () => void
}

export function MovieDetailView({ movie, onBack }: MovieDetailViewProps) {
  const rating = Number.parseFloat(formatRating(movie.vote_average))

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div className="relative">
        {movie.backdrop_path && (
          <div className="absolute inset-0 z-0">
            <Image
              src={buildImageUrl(movie.backdrop_path, "w1280") || "/placeholder.svg"}
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
          </div>
        )}

        <div className="relative z-10 container mx-auto px-4 py-8">
          <Button variant="secondary" onClick={onBack} className="mb-6 bg-background/80 backdrop-blur-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Poster */}
            <div className="md:col-span-1">
              <Card className="overflow-hidden bg-background/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="relative aspect-[2/3]">
                    <Image
                      src={buildImageUrl(movie.poster_path) || "/placeholder.svg"}
                      alt={movie.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Movie Info */}
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                  {movie.tagline && <p className="text-lg text-muted-foreground italic">"{movie.tagline}"</p>}
                </div>

                {/* Rating and Basic Info */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{rating}</span>
                    <span className="text-muted-foreground">({movie.vote_count.toLocaleString()} votes)</span>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatReleaseDate(movie.release_date)}</span>
                  </div>

                  {movie.runtime && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{formatRuntime(movie.runtime)}</span>
                    </div>
                  )}
                </div>

                {/* Genres */}
                {movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <Badge key={genre.id} variant="secondary">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Overview */}
                <div>
                  <h2 className="text-xl font-semibold mb-3">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">{movie.overview || "No overview available."}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <FavoriteButton movie={movie} size="lg" className="flex-1 sm:flex-none" />
                  {movie.homepage && (
                    <Button variant="outline" size="lg" asChild>
                      <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 mr-2" />
                        Official Site
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Movie Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Movie Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span>{movie.status}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Original Language</span>
                  <span className="uppercase">{movie.original_language}</span>
                </div>
                <Separator />
                {movie.budget > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Budget</span>
                      <span>${movie.budget.toLocaleString()}</span>
                    </div>
                    <Separator />
                  </>
                )}
                {movie.revenue > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Revenue</span>
                      <span>${movie.revenue.toLocaleString()}</span>
                    </div>
                    <Separator />
                  </>
                )}
                {movie.imdb_id && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IMDB</span>
                    <a
                      href={`https://www.imdb.com/title/${movie.imdb_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View on IMDB
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Production Info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Production</h3>
              <div className="space-y-4">
                {movie.production_companies.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Companies</h4>
                    <div className="space-y-1">
                      {movie.production_companies.slice(0, 5).map((company) => (
                        <div key={company.id} className="text-sm text-muted-foreground">
                          {company.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {movie.production_countries.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Countries</h4>
                    <div className="flex flex-wrap gap-1">
                      {movie.production_countries.map((country) => (
                        <Badge key={country.iso_3166_1} variant="outline" className="text-xs">
                          {country.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {movie.spoken_languages.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-1">
                      {movie.spoken_languages.map((language) => (
                        <Badge key={language.iso_639_1} variant="outline" className="text-xs">
                          {language.english_name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
