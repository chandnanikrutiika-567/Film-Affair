"use client"
import { Button } from "@/components/ui/button"
import { TrendingUp, Star, Calendar, Zap } from "lucide-react"

interface QuickSearchProps {
  onQuickSearch: (query: string) => void
}

const quickSearchOptions = [
  { label: "Action", query: "action", icon: Zap },
  { label: "Comedy", query: "comedy", icon: TrendingUp },
  { label: "Drama", query: "drama", icon: Star },
  { label: "2024 Movies", query: "2024", icon: Calendar },
]

export function QuickSearch({ onQuickSearch }: QuickSearchProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <span className="text-sm text-muted-foreground mr-2 self-center">Quick search:</span>
      {quickSearchOptions.map((option) => {
        const Icon = option.icon
        return (
          <Button
            key={option.query}
            variant="outline"
            size="sm"
            onClick={() => onQuickSearch(option.query)}
            className="h-8"
          >
            <Icon className="w-3 h-3 mr-1" />
            {option.label}
          </Button>
        )
      })}
    </div>
  )
}
