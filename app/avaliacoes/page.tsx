import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, DollarSign, Search, Filter, Calendar, MessageSquare, Flag } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app this would come from a database
const receivedReviews = [
  {
    id: 1,
    client: "João Oliveira",
    project: "Logo para Startup",
    rating: 5,
    date: "2 dias atrás",
    review:
      "Ana é uma profissional excepcional! Criou um logo perfeito para minha startup, capturando exatamente a essência que eu queria transmitir. Comunicação excelente e entrega no prazo.",
    helpful: 12,
    response: null,
  },
  {
    id: 2,
    client: "Maria Santos",
    project: "Identidade Visual para Clínica",
    rating: 5,
    date: "1 semana atrás",
    review:
      "Trabalho impecável! Ana desenvolveu uma identidade visual completa para nossa clínica médica. Muito profissional, criativa e atenciosa aos detalhes.",
    helpful: 8,
    response:
      "Muito obrigada, Maria! Foi um prazer trabalhar no projeto da clínica. Fico feliz que tenha gostado do resultado final.",
  },
  {
    id: 3,
    client: "Carlos Lima",
    project: "Design de Embalagem",
    rating: 4,
    date: "2 semanas atrás",
    review:
      "Ótima experiência trabalhando com a Ana. O design da embalagem ficou lindo e funcional. Pequenos ajustes foram necessários, mas ela foi muito receptiva ao feedback.",
    helpful: 5,
    response: null,
  },
]

const givenReviews = [
  {
    id: 1,
    freelancer: "Pedro Designer",
    project: "Website Corporativo",
    rating: 4,
    date: "1 semana atrás",
    review: "Bom trabalho no desenvolvimento do website. Entrega no prazo e boa comunicação durante o projeto.",
  },
  {
    id: 2,
    freelancer: "Lucia Redatora",
    project: "Artigos para Blog",
    rating: 5,
    date: "3 semanas atrás",
    review:
      "Excelente redatora! Os artigos ficaram muito bem escritos e dentro do tom que solicitei. Recomendo para outros projetos de conteúdo.",
  },
]

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-primary">TaskBR</h1>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="/avaliacoes" className="text-primary font-medium">
                Avaliações
              </Link>
              <Link href="/tarefas" className="text-foreground hover:text-primary transition-colors">
                Encontrar Tarefas
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="outline">Perfil</Button>
              <Avatar>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold mb-2">Minhas Avaliações</h2>
          <p className="text-muted-foreground">Gerencie as avaliações que você recebeu e deu</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary flex items-center gap-1">
                4.8
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-xs text-muted-foreground">Baseado em 47 avaliações</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avaliações Recebidas</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">+3 este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avaliações Dadas</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Taxa de resposta: 85%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recomendações</CardTitle>
              <Badge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">94%</div>
              <p className="text-xs text-muted-foreground">Clientes que recomendam</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="received" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="received">Avaliações Recebidas</TabsTrigger>
            <TabsTrigger value="given">Avaliações Dadas</TabsTrigger>
          </TabsList>

          {/* Received Reviews Tab */}
          <TabsContent value="received" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder="Buscar avaliações..." className="pl-10" />
                  </div>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Classificação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="5">5 estrelas</SelectItem>
                      <SelectItem value="4">4 estrelas</SelectItem>
                      <SelectItem value="3">3 estrelas</SelectItem>
                      <SelectItem value="2">2 estrelas</SelectItem>
                      <SelectItem value="1">1 estrela</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="week">Última semana</SelectItem>
                      <SelectItem value="month">Último mês</SelectItem>
                      <SelectItem value="quarter">Últimos 3 meses</SelectItem>
                      <SelectItem value="year">Último ano</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Mais Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="space-y-4">
              {receivedReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{review.client.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.client}</div>
                          <div className="text-sm text-muted-foreground">{review.project}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {review.date}
                        </div>
                      </div>
                    </div>

                    <p className="text-foreground leading-relaxed mb-4">{review.review}</p>

                    {review.response && (
                      <div className="bg-muted/50 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">EU</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">Sua resposta:</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.response}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{review.helpful} pessoas acharam útil</span>
                      </div>
                      <div className="flex gap-2">
                        {!review.response && (
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Responder
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Flag className="w-4 h-4 mr-1" />
                          Reportar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Given Reviews Tab */}
          <TabsContent value="given" className="space-y-6">
            <div className="space-y-4">
              {givenReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{review.freelancer.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.freelancer}</div>
                          <div className="text-sm text-muted-foreground">{review.project}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {review.date}
                        </div>
                      </div>
                    </div>

                    <p className="text-foreground leading-relaxed mb-4">{review.review}</p>

                    <div className="flex justify-end">
                      <Button size="sm" variant="outline">
                        Editar Avaliação
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {givenReviews.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-muted-foreground mb-4">
                    <Star className="w-12 h-12 mx-auto mb-2 text-muted-foreground/50" />
                    <p>Você ainda não deu nenhuma avaliação</p>
                  </div>
                  <Link href="/dashboard">
                    <Button>Ver Trabalhos Concluídos</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
