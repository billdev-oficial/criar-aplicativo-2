import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  Eye,
  MessageSquare,
  Calendar,
  BarChart3,
  FileText,
  Users,
} from "lucide-react"
import Link from "next/link"

// Mock data - in a real app this would come from a database
const userStats = {
  totalEarnings: 2450,
  monthlyEarnings: 680,
  completedTasks: 23,
  activeProposals: 5,
  rating: 4.8,
  profileViews: 127,
}

const recentTasks = [
  {
    id: 1,
    title: "Logo para Startup",
    status: "completed",
    price: 150,
    client: "João Silva",
    completedDate: "2 dias atrás",
  },
  {
    id: 2,
    title: "Artigos para Blog",
    status: "in-progress",
    price: 80,
    client: "Maria Santos",
    deadline: "3 dias",
  },
  {
    id: 3,
    title: "Site Responsivo",
    status: "pending",
    price: 300,
    client: "Carlos Lima",
    proposalDate: "1 dia atrás",
  },
]

const myPostedTasks = [
  {
    id: 4,
    title: "Edição de Vídeo Promocional",
    status: "open",
    price: 200,
    proposals: 8,
    views: 45,
    postedDate: "3 dias atrás",
  },
  {
    id: 5,
    title: "Tradução de Manual",
    status: "in-progress",
    price: 120,
    freelancer: "Ana Translator",
    startDate: "1 semana atrás",
  },
]

const notifications = [
  {
    id: 1,
    type: "proposal",
    message: "Nova proposta recebida para 'Logo para Startup'",
    time: "2 horas atrás",
    unread: true,
  },
  {
    id: 2,
    type: "payment",
    message: "Pagamento de R$ 150 foi processado",
    time: "1 dia atrás",
    unread: false,
  },
  {
    id: 3,
    type: "review",
    message: "João Silva deixou uma avaliação 5 estrelas",
    time: "2 dias atrás",
    unread: false,
  },
]

export default function DashboardPage() {
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
              <Link href="/dashboard" className="text-primary font-medium">
                Dashboard
              </Link>
              <Link href="/tarefas" className="text-foreground hover:text-primary transition-colors">
                Encontrar Tarefas
              </Link>
              <Link href="/postar" className="text-foreground hover:text-primary transition-colors">
                Postar Tarefa
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                Perfil
              </Button>
              <Avatar>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold mb-2">Bem-vindo de volta!</h2>
          <p className="text-muted-foreground">Aqui está um resumo da sua atividade recente</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ganhos Totais</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">R$ {userStats.totalEarnings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% em relação ao mês passado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Este Mês</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">R$ {userStats.monthlyEarnings}</div>
              <p className="text-xs text-muted-foreground">Meta: R$ 1.000</p>
              <Progress value={68} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tarefas Concluídas</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.completedTasks}</div>
              <p className="text-xs text-muted-foreground">Taxa de sucesso: 95%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avaliação</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center gap-1">
                {userStats.rating}
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-xs text-muted-foreground">Baseado em 47 avaliações</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="my-work">Meu Trabalho</TabsTrigger>
            <TabsTrigger value="my-tasks">Minhas Tarefas</TabsTrigger>
            <TabsTrigger value="analytics">Análises</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Atividade Recente</CardTitle>
                  <CardDescription>Suas últimas tarefas e propostas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-muted-foreground">Cliente: {task.client}</div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              task.status === "completed"
                                ? "default"
                                : task.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {task.status === "completed"
                              ? "Concluída"
                              : task.status === "in-progress"
                                ? "Em Andamento"
                                : "Pendente"}
                          </Badge>
                          <div className="text-sm font-medium text-primary mt-1">R$ {task.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Ver Todas
                  </Button>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>Atualizações importantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border rounded-lg ${notification.unread ? "bg-primary/5 border-primary/20" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {notification.type === "proposal" && <FileText className="w-4 h-4 text-blue-500" />}
                            {notification.type === "payment" && <DollarSign className="w-4 h-4 text-green-500" />}
                            {notification.type === "review" && <Star className="w-4 h-4 text-yellow-500" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                          {notification.unread && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Ver Todas as Notificações
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* My Work Tab */}
          <TabsContent value="my-work" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Propostas e Trabalhos</CardTitle>
                <CardDescription>Gerencie suas propostas enviadas e trabalhos em andamento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTasks.map((task) => (
                    <div key={task.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">Cliente: {task.client}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">R$ {task.price}</div>
                          <Badge
                            variant={
                              task.status === "completed"
                                ? "default"
                                : task.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {task.status === "completed"
                              ? "Concluída"
                              : task.status === "in-progress"
                                ? "Em Andamento"
                                : "Pendente"}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        {task.status === "completed" && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            Concluída {task.completedDate}
                          </div>
                        )}
                        {task.status === "in-progress" && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Prazo: {task.deadline}
                          </div>
                        )}
                        {task.status === "pending" && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Proposta enviada {task.proposalDate}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Ver Detalhes
                        </Button>
                        {task.status === "in-progress" && <Button size="sm">Entregar Trabalho</Button>}
                        {task.status === "pending" && (
                          <Button size="sm" variant="outline">
                            Editar Proposta
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Tasks Tab */}
          <TabsContent value="my-tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tarefas que Postei</CardTitle>
                <CardDescription>Gerencie as tarefas que você publicou</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myPostedTasks.map((task) => (
                    <div key={task.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          {task.freelancer && (
                            <p className="text-sm text-muted-foreground">Freelancer: {task.freelancer}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">R$ {task.price}</div>
                          <Badge variant={task.status === "open" ? "secondary" : "default"}>
                            {task.status === "open" ? "Aberta" : "Em Andamento"}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                        {task.status === "open" && (
                          <>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Users className="w-4 h-4" />
                              {task.proposals} propostas
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Eye className="w-4 h-4" />
                              {task.views} visualizações
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              Postada {task.postedDate}
                            </div>
                          </>
                        )}
                        {task.status === "in-progress" && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            Iniciada {task.startDate}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Ver Detalhes
                        </Button>
                        {task.status === "open" && (
                          <>
                            <Button size="sm">Ver Propostas ({task.proposals})</Button>
                            <Button size="sm" variant="outline">
                              Editar
                            </Button>
                          </>
                        )}
                        {task.status === "in-progress" && (
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Chat com Freelancer
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <Link href="/postar">
                    <Button>
                      <FileText className="w-4 h-4 mr-2" />
                      Postar Nova Tarefa
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Ganhos por Mês
                  </CardTitle>
                  <CardDescription>Evolução dos seus ganhos nos últimos 6 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: "Jan", amount: 420 },
                      { month: "Fev", amount: 380 },
                      { month: "Mar", amount: 520 },
                      { month: "Abr", amount: 610 },
                      { month: "Mai", amount: 580 },
                      { month: "Jun", amount: 680 },
                    ].map((data) => (
                      <div key={data.month} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{data.month}</span>
                        <div className="flex items-center gap-2 flex-1 mx-4">
                          <Progress value={(data.amount / 700) * 100} className="flex-1" />
                          <span className="text-sm font-medium text-primary">R$ {data.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas do Perfil</CardTitle>
                  <CardDescription>Performance e engajamento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Visualizações do perfil</span>
                    <span className="font-medium">{userStats.profileViews}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Taxa de resposta</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tempo médio de entrega</span>
                    <span className="font-medium">2.3 dias</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Propostas aceitas</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Clientes recorrentes</span>
                    <span className="font-medium">12</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
