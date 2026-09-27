import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Clock, Star, DollarSign, Users, Calendar, CheckCircle } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app this would come from a database
const taskData = {
  id: 1,
  title: "Criar Logo para Startup",
  description: `Estou lançando uma nova startup de tecnologia focada em soluções de inteligência artificial para pequenas empresas. Preciso de um logo profissional e moderno que transmita inovação, confiança e tecnologia.

O logo deve ser:
- Moderno e minimalista
- Funcionar bem em diferentes tamanhos
- Ter versões colorida e monocromática
- Incluir variações horizontal e vertical

Entregáveis:
- Arquivos em alta resolução (PNG, JPG, SVG)
- Manual de identidade visual básico
- Mockups de aplicação

Prazo: 3 dias a partir da contratação.`,
  category: "Design",
  price: 150,
  location: "São Paulo, SP",
  deadline: "3 dias",
  postedDate: "2 dias atrás",
  client: {
    name: "João Silva",
    rating: 4.9,
    reviews: 47,
    tasksPosted: 12,
    memberSince: "Janeiro 2023",
  },
  proposals: 12,
  skills: ["Logo Design", "Identidade Visual", "Adobe Illustrator", "Branding"],
  status: "open",
}

const proposals = [
  {
    id: 1,
    freelancer: "Ana Designer",
    rating: 4.8,
    reviews: 23,
    price: 140,
    deliveryTime: "2 dias",
    proposal: "Olá! Sou especialista em criação de logos e identidade visual. Tenho mais de 5 anos de experiência...",
  },
  {
    id: 2,
    freelancer: "Carlos Creative",
    rating: 4.9,
    reviews: 31,
    price: 160,
    deliveryTime: "3 dias",
    proposal: "Oi João! Adorei seu projeto. Já criei logos para várias startups de tecnologia...",
  },
  {
    id: 3,
    freelancer: "Maria Brands",
    rating: 5.0,
    reviews: 18,
    price: 150,
    deliveryTime: "2 dias",
    proposal: "Perfeito! Tenho experiência específica com startups de IA. Posso criar algo único...",
  },
]

export default function TaskDetailPage({ params }: { params: { id: string } }) {
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
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="outline">Entrar</Button>
              <Button>Cadastrar</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/tarefas" className="text-muted-foreground hover:text-primary">
            Tarefas
          </Link>
          <span className="text-muted-foreground mx-2">/</span>
          <span className="text-foreground">{taskData.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="secondary">{taskData.category}</Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Aberta
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl mb-2">{taskData.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {taskData.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Prazo: {taskData.deadline}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Postado {taskData.postedDate}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">R$ {taskData.price}</div>
                    <div className="text-sm text-muted-foreground">por projeto</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <h4 className="font-serif font-bold mb-3">Descrição do Projeto</h4>
                  <div className="whitespace-pre-line text-foreground leading-relaxed">{taskData.description}</div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h4 className="font-serif font-bold mb-3">Habilidades Necessárias</h4>
                  <div className="flex flex-wrap gap-2">
                    {taskData.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proposals Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Propostas ({proposals.length})
                </CardTitle>
                <CardDescription>Profissionais interessados neste projeto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {proposals.map((proposal) => (
                    <div key={proposal.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{proposal.freelancer.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{proposal.freelancer}</div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                {proposal.rating}
                              </div>
                              <span>({proposal.reviews} avaliações)</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">R$ {proposal.price}</div>
                          <div className="text-sm text-muted-foreground">em {proposal.deliveryTime}</div>
                        </div>
                      </div>
                      <p className="text-foreground mb-3">{proposal.proposal}</p>
                      <div className="flex gap-2">
                        <Button size="sm">Ver Perfil</Button>
                        <Button size="sm" variant="outline">
                          Enviar Mensagem
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Client Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Sobre o Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="text-lg">{taskData.client.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{taskData.client.name}</div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {taskData.client.rating} ({taskData.client.reviews} avaliações)
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tarefas postadas:</span>
                    <span className="font-medium">{taskData.client.tasksPosted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Membro desde:</span>
                    <span className="font-medium">{taskData.client.memberSince}</span>
                  </div>
                </div>

                <Button className="w-full mt-4">Enviar Proposta</Button>
              </CardContent>
            </Card>

            {/* Project Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas do Projeto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Propostas:</span>
                    <span className="font-medium">{taskData.proposals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Visualizações:</span>
                    <span className="font-medium">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Postado:</span>
                    <span className="font-medium">{taskData.postedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Aberta
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
