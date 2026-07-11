import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, PencilRuler, Wrench, Route, ClipboardCheck, Factory, CheckCircle2, ArrowRight, Phone } from 'lucide-react'
import { services } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Xidmətlər',
  description: 'Akin Industry - Tikinti, layihələndirmə, təmir, infrastruktur və konsaltinq xidmətləri.',
}

const iconMap: Record<string, React.ElementType> = {
  'building': Building2,
  'pencil-ruler': PencilRuler,
  'wrench': Wrench,
  'road': Route,
  'clipboard-check': ClipboardCheck,
  'factory': Factory,
}

const processSteps = [
  {
    step: '01',
    title: 'İlkin Məsləhət',
    description: 'Layihənizin tələblərini və gözləntilərinizi müzakirə edirik.'
  },
  {
    step: '02',
    title: 'Layihələndirmə',
    description: 'Memarlıq və mühəndislik həllərini hazırlayırıq.'
  },
  {
    step: '03',
    title: 'Büdcə Təqdimatı',
    description: 'Ətraflı qiymət təklifi və iş qrafiki təqdim edirik.'
  },
  {
    step: '04',
    title: 'Tikinti',
    description: 'Keyfiyyət nəzarəti ilə tikinti işlərini icra edirik.'
  },
  {
    step: '05',
    title: 'Təhvil',
    description: 'Layihəni sənədləşmə ilə birlikdə təhvil veririk.'
  },
]

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Xidmətlərimiz"
        description="Tikintinin bütün mərhələlərində hərtərəfli xidmətlər"
        breadcrumbs={[{ label: 'Xidmətlər' }]}
      />

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Nə Təklif Edirik
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Hərtərəfli Tikinti Həlləri
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Layihələndirmədən tikintiyə, bərpadandan konsaltinqə qədər bütün xidmətləri bir çatı altında təqdim edirik.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Building2
              return (
                <Card 
                  key={service.id}
                  className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              İş Prosesimiz
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Necə İşləyirik
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Hər layihədə ardıcıl və şəffaf iş prosesi tətbiq edirik.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {processSteps.map((item, index) => (
              <div key={index} className="relative text-center">
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-border" />
                )}
                
                {/* Step Circle */}
                <div className="relative z-10 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 text-balance">
              Layihəniz Üçün Pulsuz Qiymət Təklifi Alın
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed mb-10">
              Tikinti layihənizi müzakirə etmək və ətraflı qiymət təklifi almaq üçün 
              bu gün bizimlə əlaqə saxlayın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 group"
              >
                <Link href="/elaqe">
                  Bizimlə Əlaqə
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <a href="tel:+994123456789">
                  <Phone className="mr-2 h-4 w-4" />
                  +994 55 350 30 69
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
