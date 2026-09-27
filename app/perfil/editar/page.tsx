import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DollarSign, Upload, X, Plus, User, Briefcase, Award, Camera } from "lucide-react"
import Link from "next/link"

export default function EditProfilePage() {
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
              <Link href="/perfil/1">
                <Button variant="outline">Ver Perfil</Button>
              </Link>
              <Avatar>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold mb-2">Editar Perfil</h2>
          <p className="text-muted-foreground">Mantenha suas informações atualizadas para atrair mais clientes</p>
        </div>

        <form className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informações Básicas
              </CardTitle>
              <CardDescription>Suas informações pessoais e profissionais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="text-2xl">AS</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="mb-2 bg-transparent">
                    <Camera className="w-4 h-4 mr-2" />
                    Alterar Foto
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG, PNG ou GIF. Máximo 5MB.</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input id="name" defaultValue="Ana Silva" className="mt-1" required />
                </div>
                <div>
                  <Label htmlFor="title">Título Profissional *</Label>
                  <Input
                    id="title"
                    defaultValue="Designer Gráfica & Especialista em Branding"
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Localização</Label>
                  <Select defaultValue="sp">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
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
                  <Label htmlFor="hourly-rate">Taxa por Hora (R$)</Label>
                  <Input id="hourly-rate" type="number" defaultValue="45" className="mt-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Biografia *</Label>
                <Textarea
                  id="bio"
                  defaultValue="Sou uma designer gráfica apaixonada com mais de 5 anos de experiência em criação de identidades visuais, logos e materiais de marketing. Especializo-me em ajudar startups e pequenas empresas a construir uma presença visual forte e memorável."
                  className="mt-1 min-h-32"
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Descreva sua experiência, especialidades e o que te diferencia
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Expertise */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Habilidades e Especialidades
              </CardTitle>
              <CardDescription>Adicione suas principais habilidades e ferramentas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Habilidades Principais</Label>
                <div className="flex flex-wrap gap-2 mt-2 mb-3">
                  {[
                    "Logo Design",
                    "Identidade Visual",
                    "Adobe Illustrator",
                    "Adobe Photoshop",
                    "Branding",
                    "Design de Embalagem",
                    "UI/UX Design",
                    "Figma",
                  ].map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <X className="w-3 h-3 cursor-pointer hover:text-destructive" />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Adicionar nova habilidade" className="flex-1" />
                  <Button type="button" variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="category">Categoria Principal</Label>
                <Select defaultValue="design">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="programacao">Programação</SelectItem>
                    <SelectItem value="redacao">Redação</SelectItem>
                    <SelectItem value="traducao">Tradução</SelectItem>
                    <SelectItem value="video">Vídeo</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="consultoria">Consultoria</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Idiomas</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center gap-2">
                    <Input defaultValue="Português" className="flex-1" />
                    <Select defaultValue="nativo">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nativo">Nativo</SelectItem>
                        <SelectItem value="fluente">Fluente</SelectItem>
                        <SelectItem value="intermediario">Intermediário</SelectItem>
                        <SelectItem value="basico">Básico</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button type="button" variant="outline" size="icon">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input defaultValue="Inglês" className="flex-1" />
                    <Select defaultValue="fluente">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nativo">Nativo</SelectItem>
                        <SelectItem value="fluente">Fluente</SelectItem>
                        <SelectItem value="intermediario">Intermediário</SelectItem>
                        <SelectItem value="basico">Básico</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button type="button" variant="outline" size="icon">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Idioma
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Portfólio
              </CardTitle>
              <CardDescription>Mostre seus melhores trabalhos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="relative group">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img
                        src={`/portfolio-item-showcase.png?height=200&width=300&query=portfolio item ${item}`}
                        alt={`Portfolio item ${item}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">Arraste e solte suas imagens aqui</p>
                <p className="text-sm text-muted-foreground mb-4">ou</p>
                <Button type="button" variant="outline">
                  Selecionar Arquivos
                </Button>
                <p className="text-xs text-muted-foreground mt-2">PNG, JPG, GIF até 10MB cada</p>
              </div>
            </CardContent>
          </Card>

          {/* Availability & Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Disponibilidade e Preferências</CardTitle>
              <CardDescription>Configure sua disponibilidade e preferências de trabalho</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="availability">Status de Disponibilidade</Label>
                  <Select defaultValue="available">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Disponível</SelectItem>
                      <SelectItem value="busy">Ocupado</SelectItem>
                      <SelectItem value="unavailable">Indisponível</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="response-time">Tempo de Resposta Médio</Label>
                  <Select defaultValue="2-hours">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-hour">1 hora</SelectItem>
                      <SelectItem value="2-hours">2 horas</SelectItem>
                      <SelectItem value="4-hours">4 horas</SelectItem>
                      <SelectItem value="1-day">1 dia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="work-preferences">Preferências de Trabalho</Label>
                <Textarea
                  id="work-preferences"
                  placeholder="Ex: Prefiro projetos de longo prazo, trabalho melhor com briefings detalhados, disponível para reuniões por videochamada..."
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button type="submit" size="lg" className="flex-1">
              Salvar Alterações
            </Button>
            <Button type="button" variant="outline" size="lg">
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
