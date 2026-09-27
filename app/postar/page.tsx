import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DollarSign, Plus, FileText, MapPin } from "lucide-react"
import Link from "next/link"

export default function PostTaskPage() {
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
              <Link href="/postar" className="text-primary font-medium">
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold mb-2">Postar uma Nova Tarefa</h2>
          <p className="text-muted-foreground">Descreva seu projeto e encontre o profissional ideal para realizá-lo</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Informações Básicas
                  </CardTitle>
                  <CardDescription>Conte-nos sobre seu projeto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título da Tarefa *</Label>
                    <Input id="title" placeholder="Ex: Criar logo para minha empresa" className="mt-1" required />
                    <p className="text-sm text-muted-foreground mt-1">
                      Seja claro e específico sobre o que você precisa
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="category">Categoria *</Label>
                    <Select required>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="programacao">Programação</SelectItem>
                        <SelectItem value="redacao">Redação</SelectItem>
                        <SelectItem value="traducao">Tradução</SelectItem>
                        <SelectItem value="video">Vídeo</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="consultoria">Consultoria</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição Detalhada *</Label>
                    <Textarea
                      id="description"
                      placeholder="Descreva seu projeto em detalhes. Inclua objetivos, requisitos, entregáveis esperados..."
                      className="mt-1 min-h-32"
                      required
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Quanto mais detalhes, melhores propostas você receberá
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="skills">Habilidades Necessárias</Label>
                    <Input id="skills" placeholder="Ex: Photoshop, Illustrator, Logo Design" className="mt-1" />
                    <p className="text-sm text-muted-foreground mt-1">Separe as habilidades por vírgula</p>
                  </div>
                </CardContent>
              </Card>

              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Detalhes do Projeto
                  </CardTitle>
                  <CardDescription>Localização, prazo e orçamento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Localização</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Selecione a localização" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remoto">Remoto</SelectItem>
                          <SelectItem value="sp">São Paulo, SP</SelectItem>
                          <SelectItem value="rj">Rio de Janeiro, RJ</SelectItem>
                          <SelectItem value="mg">Belo Horizonte, MG</SelectItem>
                          <SelectItem value="rs">Porto Alegre, RS</SelectItem>
                          <SelectItem value="pr">Curitiba, PR</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="deadline">Prazo *</Label>
                      <Select required>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Quando você precisa?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-day">1 dia</SelectItem>
                          <SelectItem value="2-3-days">2-3 dias</SelectItem>
                          <SelectItem value="1-week">1 semana</SelectItem>
                          <SelectItem value="2-weeks">2 semanas</SelectItem>
                          <SelectItem value="1-month">1 mês</SelectItem>
                          <SelectItem value="flexible">Flexível</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="budget">Orçamento *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                      <div>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Tipo de orçamento" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fixed">Preço Fixo</SelectItem>
                            <SelectItem value="hourly">Por Hora</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          R$
                        </span>
                        <Input placeholder="0,00" className="pl-8" required />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Defina um orçamento justo baseado na complexidade do projeto
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Opções Adicionais</CardTitle>
                  <CardDescription>Configurações extras para seu projeto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="featured" />
                    <Label htmlFor="featured" className="text-sm">
                      Destacar minha tarefa (+R$ 10)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="urgent" />
                    <Label htmlFor="urgent" className="text-sm">
                      Marcar como urgente (+R$ 5)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="nda" />
                    <Label htmlFor="nda" className="text-sm">
                      Exigir acordo de confidencialidade (NDA)
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button type="submit" size="lg" className="flex-1">
                  <Plus className="w-5 h-5 mr-2" />
                  Publicar Tarefa
                </Button>
                <Button type="button" variant="outline" size="lg">
                  Salvar Rascunho
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div>
            {/* Tips Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Dicas para uma Boa Tarefa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Seja específico sobre o que você precisa</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Inclua exemplos ou referências quando possível</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Defina um orçamento realista</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Seja claro sobre prazos e entregáveis</p>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Custos da Plataforma
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Taxa de publicação:</span>
                  <span className="font-medium text-green-600">Grátis</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de sucesso:</span>
                  <span className="font-medium">5% do valor</span>
                </div>
                <div className="flex justify-between">
                  <span>Destaque (opcional):</span>
                  <span className="font-medium">R$ 10</span>
                </div>
                <div className="flex justify-between">
                  <span>Urgente (opcional):</span>
                  <span className="font-medium">R$ 5</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total estimado:</span>
                    <span>R$ 0</span>
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
