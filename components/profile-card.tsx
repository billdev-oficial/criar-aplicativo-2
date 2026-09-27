import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, MapPin, CheckCircle } from "lucide-react"
import Link from "next/link"

interface ProfileCardProps {
  id: number
  name: string
  title: string
  location: string
  rating: number
  reviews: number
  completedJobs: number
  hourlyRate: number
  skills: string[]
  availability: "available" | "busy" | "unavailable"
}

export function ProfileCard({
  id,
  name,
  title,
  location,
  rating,
  reviews,
  completedJobs,
  hourlyRate,
  skills,
  availability,
}: ProfileCardProps) {
  const getAvailabilityBadge = () => {
    switch (availability) {
      case "available":
        return <Badge variant="secondary">Disponível</Badge>
      case "busy":
        return <Badge variant="outline">Ocupado</Badge>
      case "unavailable":
        return <Badge variant="destructive">Indisponível</Badge>
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-lg">{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-serif font-bold text-lg">{name}</h3>
                <p className="text-muted-foreground text-sm">{title}</p>
              </div>
              {getAvailabilityBadge()}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {location}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                {rating} ({reviews})
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                {completedJobs} trabalhos
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{skills.length - 4}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-primary">R$ {hourlyRate}/hora</div>
          <Link href={`/perfil/${id}`}>
            <Button size="sm">Ver Perfil</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
