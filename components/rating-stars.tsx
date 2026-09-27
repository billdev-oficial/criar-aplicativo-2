"use client"

import { Star } from "lucide-react"
import { useState } from "react"

interface RatingStarsProps {
  rating: number
  onRatingChange?: (rating: number) => void
  readonly?: boolean
  size?: "sm" | "md" | "lg"
  showValue?: boolean
}

export function RatingStars({
  rating,
  onRatingChange,
  readonly = false,
  size = "md",
  showValue = false,
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value)
    }
  }

  const handleMouseEnter = (value: number) => {
    if (!readonly) {
      setHoverRating(value)
    }
  }

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0)
    }
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${readonly ? "cursor-default" : "cursor-pointer focus:outline-none"}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          disabled={readonly}
        >
          <Star
            className={`${sizeClasses[size]} transition-colors ${
              star <= (hoverRating || rating)
                ? "fill-yellow-400 text-yellow-400"
                : readonly
                  ? "text-gray-300"
                  : "text-gray-300 hover:text-yellow-300"
            }`}
          />
        </button>
      ))}
      {showValue && <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>}
    </div>
  )
}
