import Link from 'next/link'
import { ArrowRight, Wrench, Clock, Shield, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Shield,
    title: 'Keyfiyyət və Təhlükəsizlik',
    description: 'Hər layihədə ən yüksək standartlara riayət edirik'
  },
  {
    icon: Wrench,
    title: 'Müasir Texnologiyalar',
    description: 'Ən son inşaat texnologiyalarını istifadə edirik'
  },
  {
    icon: Clock,
    title: 'Vaxtında Təhvil',
    description: 'Layihələri vaxtında və büdcə daxilində tamamlayırıq'
  }
]

export function AboutPreview() {
  return (
    <section className="py-24 bg-linear-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4" />
            Azərbaycanda Tikinti Sektorunun Lideri
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 max-w-4xl mx-auto leading-tight">
            25 ildən artıq təcrübə ilə <span className="text-accent">etibarlı</span> tikinti həlləri
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Yaşayış, kommersiya və sənaye tikintisi sahələrində yüksək keyfiyyətli xidmətlər təqdim edən
            Azərbaycanın ən etibarlı tikinti şirkətlərindən biriyik.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="text-center p-8 bg-card rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Layihənizi Bizimlə Həyata Keçirin</h3>
            <p className="text-muted-foreground">
              Müştərilərimizin güvənini qazanmaq üçün keyfiyyət, təhlükəsizlik və müştəri məmnuniyyətini hər zaman ön planda tuturuq.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group">
              <Link href="/haqqimizda">
                Daha Ətraflı
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/layiheler">Layihələrimiz</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
