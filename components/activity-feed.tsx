import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ActivityItem {
  id: number
  title: string
  client: string
  status: "completed" | "in-progress" | "pending"
  price: number
  date?: string
  deadline?: string
}

interface ActivityFeedProps {
  items: ActivityItem[]
  title: string
  description: string
}

export function ActivityFeed({ items, title, description }: ActivityFeedProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Concluída</Badge>
      case "in-progress":
        return <Badge variant="secondary">Em Andamento</Badge>
      case "pending":
        return <Badge variant="outline">Pendente</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-muted-foreground">Cliente: {item.client}</div>
              </div>
              <div className="text-right">
                {getStatusBadge(item.status)}
                <div className="text-sm font-medium text-primary mt-1">R$ {item.price}</div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 bg-transparent">
          Ver Todas
        </Button>
      </CardContent>
    </Card>
  )
}
