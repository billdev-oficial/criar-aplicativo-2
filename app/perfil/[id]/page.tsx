import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  Star,
  MapPin,
  Calendar,
  CheckCircle,
  MessageSquare,
  Heart,
  Share2,
  Award,
  Briefcase,
  Clock,
} from "lucide-react"
import Link from "next/link"

// Mock data - in a real app this would come from a database
const profileData = {
  id: 1,
  name: "Ana Silva",
  title: "Designer Gráfica & Especialista em Branding",
  location: "São Paulo, SP",
  memberSince: "Janeiro 2023",
  rating: 4.9,
  reviews: 47,
  completedJobs: 89,
  responseTime: "2 horas",
  bio: "Sou uma designer gráfica apaixonada com mais de 5 anos de experiência em criação de identidades visuais, logos e materiais de marketing. Especializo-me em ajudar startups e pequenas empresas a construir uma presença visual forte e memorável.",
  skills: [
    "Logo Design",
    "Identidade Visual",
    "Adobe Illustrator",
    "Adobe Photoshop",
    "Branding",
    "Design de Embalagem",
    "UI/UX Design",
    "Figma",
  ],
  languages: ["Português (Nativo)", "Inglês (Fluente)", "Espanhol (Intermediário)"],
  hourlyRate: 45,
  availability: "Disponível",
}

const portfolio = [
  {
    id: 1,
    title: "Logo e Identidade Visual - TechStart",
    category: "Branding",
    image: "/modern-tech-startup-logo.png",
    description: "Criação completa de identidade visual para startup de tecnologia",
  },
  {
    id: 2,
    title: "Redesign de App Mobile",
    category: "UI/UX",
    image: "/mobile-app-interface.png",
    description: "Redesign completo de interface para aplicativo de delivery",
  },
  {
    id: 3,
    title: "Embalagem para Produto Orgânico",
    category: "Design de Embalagem",
    image: "/placeholder-juqpm.png",
    description: "Design de embalagem sustentável para linha de produtos orgânicos",
  },
  {
    id: 4,
    title: "Website Corporativo",
    category: "Web Design",
    image: "/corporate-website-design.png",
    description: "Design e desenvolvimento de website para consultoria empresarial",
  },
]

const recentWork = [
  {
    id: 1,
    title: "Logo para E-commerce",
    client: "João Oliveira",
    rating: 5,
    price: 180,
    completedDate: "1 semana atrás",
    review: "Trabalho excepcional! Ana entendeu perfeitamente nossa visão e entregou um logo incrível.",
  },
  {
    id: 2,
    title: "Identidade Visual Completa",
    client: "Maria Santos",
    rating: 5,
    price: 350,
    completedDate: "2 semanas atrás",
    review: "Profissional muito talentosa e dedicada. Superou nossas expectativas!",
  },
  {
    id: 3,
    title: "Design de Apresentação",
    client: "Carlos Lima",
    rating: 4,
    price: 120,
    completedDate: "3 semanas atrás",
    review: "Ótimo trabalho, entrega rápida e comunicação excelente.",
  },
]

const reviews = [
  {
    id: 1,
    client: "Pedro Costa",
    rating: 5,
    date: "2 dias atrás",
    project: "Logo para Restaurante",
    review:
      "Ana é uma profissional excepcional! Criou um logo perfeito para meu restaurante, capturando exatamente a essência que eu queria transmitir. Comunicação excelente e entrega no prazo.",
  },
  {
    id: 2,
    client: "Lucia Ferreira",
    rating: 5,
    date: "1 semana atrás",
    project: "Identidade Visual para Clínica",
    review:
      "Trabalho impecável! Ana desenvolveu uma identidade visual completa para nossa clínica médica. Muito profissional, criativa e atenciosa aos detalhes.",
  },
  {
    id: 3,
    client: "Roberto Silva",
    rating: 4,
    date: "2 semanas atrás",
    project: "Design de Embalagem",
    review: "Ótima experiência trabalhando com a Ana. O design da embalagem ficou lindo e funcional. Recomendo!",
  },
]

export default function ProfilePage({ params }: { params: { id: string } }) {
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
              <Link href="/tarefas" className="text-foreground hover:text-primary transition-colors">
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
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarFallback className="text-3xl">{profileData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Badge variant="secondary" className="mb-2">
                  {profileData.availability}
                </Badge>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-serif font-bold mb-2">{profileData.name}</h1>
                    <p className="text-xl text-muted-foreground mb-3">{profileData.title}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {profileData.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Membro desde {profileData.memberSince}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                    <Button variant="outline">
                      <Heart className="w-4 h-4 mr-2" />
                      Favoritar
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-2xl font-bold">{profileData.rating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{profileData.reviews} avaliações</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-2xl font-bold">{profileData.completedJobs}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">trabalhos concluídos</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-2xl font-bold">{profileData.responseTime}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">tempo de resposta</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span className="text-2xl font-bold">R$ {profileData.hourlyRate}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">por hora</div>
                  </div>
                </div>

                <p className="text-foreground leading-relaxed">{profileData.bio}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            <TabsTrigger value="skills">Habilidades</TabsTrigger>
            <TabsTrigger value="work-history">Histórico</TabsTrigger>
          </TabsList>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="mb-2">
                        {item.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo das Avaliações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-primary mb-2">{profileData.rating}</div>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= Math.floor(profileData.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">{profileData.reviews} avaliações</div>
                    </div>

                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-sm w-8">{stars}★</span>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{
                                width: `${stars === 5 ? 85 : stars === 4 ? 12 : stars === 3 ? 2 : stars === 2 ? 1 : 0}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground w-8">
                            {stars === 5 ? 40 : stars === 4 ? 6 : stars === 3 ? 1 : 0}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {reviews.map((review) => (
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
                            <div className="text-sm text-muted-foreground">{review.date}</div>
                          </div>
                        </div>
                        <p className="text-foreground leading-relaxed">{review.review}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Habilidades Principais
                  </CardTitle>
                  <CardDescription>Especialidades e ferramentas que domino</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Idiomas</CardTitle>
                  <CardDescription>Línguas que falo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {profileData.languages.map((language) => (
                      <div key={language} className="flex items-center justify-between">
                        <span>{language}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Certificações e Conquistas</CardTitle>
                <CardDescription>Reconhecimentos e certificados profissionais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Award className="w-8 h-8 text-yellow-500" />
                    <div>
                      <div className="font-medium">Top Rated Freelancer</div>
                      <div className="text-sm text-muted-foreground">TaskBR - 2024</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <Award className="w-8 h-8 text-blue-500" />
                    <div>
                      <div className="font-medium">Adobe Certified Expert</div>
                      <div className="text-sm text-muted-foreground">Illustrator & Photoshop</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Work History Tab */}
          <TabsContent value="work-history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Trabalhos Recentes
                </CardTitle>
                <CardDescription>Projetos concluídos nos últimos meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentWork.map((work) => (
                    <div key={work.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{work.title}</h4>
                          <p className="text-sm text-muted-foreground">Cliente: {work.client}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">R$ {work.price}</div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= work.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Concluído {work.completedDate}</p>
                      <p className="text-foreground italic">"{work.review}"</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
