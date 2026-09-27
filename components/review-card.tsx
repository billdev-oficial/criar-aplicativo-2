"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { RatingStars } from "./rating-stars"
import { Calendar, MessageSquare, Flag } from "lucide-react"

interface ReviewCardProps {
  id: number
  reviewer: string
  project: string
  rating: number
  date: string
  review: string
  helpful?: number
  response?: string
  onRespond?: () => void
  onReport?: () => void
  showActions?: boolean
}

export function ReviewCard({
  id,
  reviewer,
  project,
  rating,
  date,
  review,
  helpful,
  response,
  onRespond,
  onReport,
  showActions = true,
}: ReviewCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{reviewer.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{reviewer}</div>
              <div className="text-sm text-muted-foreground">{project}</div>
            </div>
          </div>
          <div className="text-right">
            <RatingStars rating={rating} readonly size="sm" />
            <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <Calendar className="w-3 h-3" />
              {date}
            </div>
          </div>
        </div>

        <p className="text-foreground leading-relaxed mb-4">{review}</p>

        {response && (
          <div className="bg-muted/50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="text-xs">EU</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Sua resposta:</span>
            </div>
            <p className="text-sm text-muted-foreground">{response}</p>
          </div>
        )}

        {showActions && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {helpful && <span>{helpful} pessoas acharam útil</span>}
            </div>
            <div className="flex gap-2">
              {!response && onRespond && (
                <Button size="sm" variant="outline" onClick={onRespond}>
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Responder
                </Button>
              )}
              {onReport && (
                <Button size="sm" variant="outline" onClick={onReport}>
                  <Flag className="w-4 h-4 mr-1" />
                  Reportar
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
