"use client"

import { Skeleton } from "@/components/ui/loading-skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function EnhancedMovieCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
          <Skeleton className="h-full w-full" />
          <div className="absolute top-2 right-2">
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
        </div>
        <div className="p-4 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </CardContent>
    </Card>
  )
}

export function EnhancedMovieGridSkeleton({ count = 20 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <EnhancedMovieCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function SearchLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-24" />
      </div>
      <EnhancedMovieGridSkeleton count={12} />
    </div>
  )
}
