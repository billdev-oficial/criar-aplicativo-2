import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Star, MapPin, Clock, DollarSign } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-primary">TaskBR</h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Encontrar Tarefas
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Postar Tarefa
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Como Funciona
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="outline">Entrar</Button>
              <Button>Cadastrar</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-foreground">
            Ganhe Dinheiro com <span className="text-primary">Suas Habilidades</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Conecte-se com pessoas que precisam de serviços ou encontre tarefas para completar. Uma plataforma segura e
            confiável para brasileiros.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8">
              <Plus className="w-5 h-5 mr-2" />
              Postar uma Tarefa
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              <Search className="w-5 h-5 mr-2" />
              Encontrar Trabalho
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1.2k+</div>
              <div className="text-muted-foreground">Tarefas Completadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Usuários Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.8★</div>
              <div className="text-muted-foreground">Avaliação Média</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tasks */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold mb-4">Tarefas em Destaque</h3>
            <p className="text-muted-foreground text-lg">Oportunidades disponíveis agora</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Task Card 1 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="mb-2">
                    Design
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">R$ 150</div>
                    <div className="text-sm text-muted-foreground">por projeto</div>
                  </div>
                </div>
                <CardTitle className="text-xl">Criar Logo para Startup</CardTitle>
                <CardDescription>
                  Preciso de um logo moderno e profissional para minha nova empresa de tecnologia.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    São Paulo, SP
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />3 dias
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-muted rounded-full"></div>
                    <div>
                      <div className="font-medium text-sm">João Silva</div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">4.9</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">Ver Detalhes</Button>
                </div>
              </CardContent>
            </Card>

            {/* Task Card 2 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="mb-2">
                    Redação
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">R$ 80</div>
                    <div className="text-sm text-muted-foreground">por artigo</div>
                  </div>
                </div>
                <CardTitle className="text-xl">Artigos para Blog</CardTitle>
                <CardDescription>
                  Busco redator para criar conteúdo sobre marketing digital e empreendedorismo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Remoto
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />1 semana
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-muted rounded-full"></div>
                    <div>
                      <div className="font-medium text-sm">Maria Santos</div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">4.7</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">Ver Detalhes</Button>
                </div>
              </CardContent>
            </Card>

            {/* Task Card 3 */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="mb-2">
                    Programação
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">R$ 300</div>
                    <div className="text-sm text-muted-foreground">por projeto</div>
                  </div>
                </div>
                <CardTitle className="text-xl">Site Responsivo</CardTitle>
                <CardDescription>
                  Desenvolvimento de landing page responsiva para empresa de consultoria.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Rio de Janeiro, RJ
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />5 dias
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-muted rounded-full"></div>
                    <div>
                      <div className="font-medium text-sm">Carlos Lima</div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">5.0</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm">Ver Detalhes</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Ver Todas as Tarefas
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-bold mb-4">Como Funciona</h3>
            <p className="text-muted-foreground text-lg">Simples, seguro e eficiente</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-serif font-bold mb-2">1. Poste sua Tarefa</h4>
              <p className="text-muted-foreground">
                Descreva o que precisa e defina o valor que está disposto a pagar.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-serif font-bold mb-2">2. Receba Propostas</h4>
              <p className="text-muted-foreground">
                Profissionais qualificados enviarão suas propostas para sua tarefa.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-serif font-bold mb-2">3. Escolha e Avalie</h4>
              <p className="text-muted-foreground">Selecione o melhor profissional e avalie o trabalho concluído.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-serif font-bold text-primary">TaskBR</h1>
              </div>
              <p className="text-muted-foreground">
                A plataforma brasileira para conectar pessoas e oportunidades de trabalho.
              </p>
            </div>

            <div>
              <h5 className="font-serif font-bold mb-4">Para Clientes</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Postar Tarefa
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Encontrar Profissionais
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Como Funciona
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-serif font-bold mb-4">Para Profissionais</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Encontrar Trabalho
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Criar Perfil
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Dicas de Sucesso
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-serif font-bold mb-4">Suporte</h5>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Termos de Uso
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 TaskBR. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
