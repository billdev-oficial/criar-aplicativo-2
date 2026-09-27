"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Star, DollarSign, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data - in a real app this would come from a database
const taskData = {
  id: 1,
  title: "Criar Logo para Startup",
  description: "Logo moderno e profissional para empresa de tecnologia",
  price: 150,
  completedDate: "2 dias atrás",
  freelancer: {
    name: "Ana Silva",
    rating: 4.8,
    completedJobs: 89,
  },
  client: {
    name: "João Oliveira",
    rating: 4.9,
    tasksPosted: 12,
  },
  deliverables: [
    "Logo em alta resolução (PNG, SVG)",
    "Variações colorida e monocromática",
    "Manual de identidade visual",
    "Mockups de aplicação",
  ],
}

export default function ReviewPage({ params }: { params: { taskId: string } }) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold mb-2">Trabalho Concluído!</h2>
          <p className="text-muted-foreground">Avalie sua experiência para ajudar outros usuários</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Avaliar Freelancer</CardTitle>
                <CardDescription>Compartilhe sua experiência trabalhando com Ana Silva</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  {/* Overall Rating */}
                  <div>
                    <Label className="text-base font-medium">Avaliação Geral *</Label>
                    <div className="flex items-center gap-2 mt-2 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="focus:outline-none"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                        >
                          <Star
                            className={`w-8 h-8 transition-colors ${
                              star <= (hoverRating || rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 hover:text-yellow-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {rating === 0 && "Clique nas estrelas para avaliar"}
                      {rating === 1 && "Muito insatisfeito"}
                      {rating === 2 && "Insatisfeito"}
                      {rating === 3 && "Neutro"}
                      {rating === 4 && "Satisfeito"}
                      {rating === 5 && "Muito satisfeito"}
                    </p>
                  </div>

                  <Separator />

                  {/* Detailed Ratings */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Avaliações Específicas</h4>

                    {[
                      { label: "Qualidade do Trabalho", key: "quality" },
                      { label: "Comunicação", key: "communication" },
                      { label: "Cumprimento de Prazos", key: "deadlines" },
                      { label: "Profissionalismo", key: "professionalism" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.label}</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Written Review */}
                  <div>
                    <Label htmlFor="review">Comentário *</Label>
                    <Textarea
                      id="review"
                      placeholder="Descreva sua experiência trabalhando com Ana. O que ela fez bem? Como foi a comunicação? Você recomendaria para outros?"
                      className="mt-2 min-h-32"
                      required
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Seja específico e construtivo. Sua avaliação ajuda outros usuários.
                    </p>
                  </div>

                  {/* Recommendation */}
                  <div>
                    <Label className="text-base font-medium">Você recomendaria Ana Silva?</Label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="recommend" value="yes" className="text-primary" />
                        <span className="text-sm">Sim, recomendo</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="recommend" value="no" className="text-primary" />
                        <span className="text-sm">Não recomendo</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1">
                      Enviar Avaliação
                    </Button>
                    <Button type="button" variant="outline">
                      Pular por Agora
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Task Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Trabalho</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">{taskData.title}</h4>
                    <p className="text-sm text-muted-foreground">{taskData.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Valor pago:</span>
                    <span className="font-medium text-primary">R$ {taskData.price}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Concluído:</span>
                    <span className="font-medium">{taskData.completedDate}</span>
                  </div>

                  <Separator />

                  <div>
                    <h5 className="font-medium mb-2">Entregáveis:</h5>
                    <ul className="space-y-1">
                      {taskData.deliverables.map((item, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Freelancer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre o Freelancer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>{taskData.freelancer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{taskData.freelancer.name}</div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {taskData.freelancer.rating} avaliação
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  {taskData.freelancer.completedJobs} trabalhos concluídos
                </div>

                <Link href={`/perfil/${taskData.freelancer.name}`}>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Ver Perfil Completo
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Dicas para Avaliar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Seja honesto e construtivo</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Mencione pontos específicos do trabalho</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Avalie a comunicação e profissionalismo</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Sua avaliação ajuda outros usuários</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
