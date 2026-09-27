import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MapPin, Clock, Star, DollarSign } from "lucide-react"
import Link from "next/link"

const tasks = [
  {
    id: 1,
    title: "Criar Logo para Startup",
    description: "Preciso de um logo moderno e profissional para minha nova empresa de tecnologia.",
    category: "Design",
    price: 150,
    location: "São Paulo, SP",
    deadline: "3 dias",
    client: "João Silva",
    rating: 4.9,
    proposals: 12,
  },
  {
    id: 2,
    title: "Artigos para Blog",
    description: "Busco redator para criar conteúdo sobre marketing digital e empreendedorismo.",
    category: "Redação",
    price: 80,
    location: "Remoto",
    deadline: "1 semana",
    client: "Maria Santos",
    rating: 4.7,
    proposals: 8,
  },
  {
    id: 3,
    title: "Site Responsivo",
    description: "Desenvolvimento de landing page responsiva para empresa de consultoria.",
    category: "Programação",
    price: 300,
    location: "Rio de Janeiro, RJ",
    deadline: "5 dias",
    client: "Carlos Lima",
    rating: 5.0,
    proposals: 15,
  },
  {
    id: 4,
    title: "Tradução de Documentos",
    description: "Tradução de documentos técnicos do inglês para o português.",
    category: "Tradução",
    price: 120,
    location: "Remoto",
    deadline: "2 dias",
    client: "Ana Costa",
    rating: 4.8,
    proposals: 6,
  },
  {
    id: 5,
    title: "Edição de Vídeo",
    description: "Edição de vídeos promocionais para redes sociais.",
    category: "Vídeo",
    price: 200,
    location: "Belo Horizonte, MG",
    deadline: "1 semana",
    client: "Pedro Oliveira",
    rating: 4.6,
    proposals: 10,
  },
  {
    id: 6,
    title: "Consultoria em Marketing",
    description: "Consultoria para estratégia de marketing digital para e-commerce.",
    category: "Marketing",
    price: 400,
    location: "Remoto",
    deadline: "2 semanas",
    client: "Lucia Ferreira",
    rating: 4.9,
    proposals: 20,
  },
]

export default function TasksPage() {
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
              <Link href="/tarefas" className="text-primary font-medium">
                Encontrar Tarefas
              </Link>
              <Link href="/postar" className="text-foreground hover:text-primary transition-colors">
                Postar Tarefa
              </Link>
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                Como Funciona
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="outline">Entrar</Button>
              <Button>Cadastrar</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold mb-2">Encontrar Tarefas</h2>
          <p className="text-muted-foreground">Descubra oportunidades para ganhar dinheiro com suas habilidades</p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Buscar tarefas..." className="pl-10" />
            </div>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="programacao">Programação</SelectItem>
                <SelectItem value="redacao">Redação</SelectItem>
                <SelectItem value="traducao">Tradução</SelectItem>
                <SelectItem value="video">Vídeo</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Localização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Localizações</SelectItem>
                <SelectItem value="remoto">Remoto</SelectItem>
                <SelectItem value="sp">São Paulo</SelectItem>
                <SelectItem value="rj">Rio de Janeiro</SelectItem>
                <SelectItem value="mg">Minas Gerais</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Faixa de Preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Preços</SelectItem>
                <SelectItem value="0-100">R$ 0 - R$ 100</SelectItem>
                <SelectItem value="100-200">R$ 100 - R$ 200</SelectItem>
                <SelectItem value="200-500">R$ 200 - R$ 500</SelectItem>
                <SelectItem value="500+">R$ 500+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">{tasks.length} tarefas encontradas</div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Mais Filtros
            </Button>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="mb-2">
                    {task.category}
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">R$ {task.price}</div>
                    <div className="text-sm text-muted-foreground">por projeto</div>
                  </div>
                </div>
                <CardTitle className="text-xl">{task.title}</CardTitle>
                <CardDescription className="line-clamp-2">{task.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {task.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {task.deadline}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-muted rounded-full"></div>
                    <div>
                      <div className="font-medium text-sm">{task.client}</div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">{task.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{task.proposals} propostas</div>
                </div>

                <Link href={`/tarefas/${task.id}`}>
                  <Button className="w-full">Ver Detalhes</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Carregar Mais Tarefas
          </Button>
        </div>
      </div>
    </div>
  )
}
