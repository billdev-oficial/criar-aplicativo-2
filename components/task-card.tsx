import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Star } from "lucide-react"
import Link from "next/link"

interface TaskCardProps {
  id: number
  title: string
  description: string
  category: string
  price: number
  location: string
  deadline: string
  client: string
  rating: number
  proposals: number
}

export function TaskCard({
  id,
  title,
  description,
  category,
  price,
  location,
  deadline,
  client,
  rating,
  proposals,
}: TaskCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className="mb-2">
            {category}
          </Badge>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">R$ {price}</div>
            <div className="text-sm text-muted-foreground">por projeto</div>
          </div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {deadline}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted rounded-full"></div>
            <div>
              <div className="font-medium text-sm">{client}</div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground">{rating}</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">{proposals} propostas</div>
        </div>

        <Link href={`/tarefas/${id}`}>
          <Button className="w-full">Ver Detalhes</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
