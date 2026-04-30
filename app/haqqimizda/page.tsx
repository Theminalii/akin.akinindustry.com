'use client'

import { PageHeader } from '@/components/shared/page-header'
import { CheckCircle2, Target, Eye, Shield, Award, Users, Building2, Clock, Image as ImageIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useAdmin } from '@/lib/admin/context'

const values = [
  {
    icon: Shield,
    title: 'Keyfiyyət',
    description: 'Beynəlxalq standartlara uyğun yüksək keyfiyyətli tikinti həlləri təqdim edirik.'
  },
  {
    icon: Clock,
    title: 'Vaxtında Təhvil',
    description: 'Layihələri razılaşdırılmış müddətdə, büdcə daxilində tamamlayırıq.'
  },
  {
    icon: Users,
    title: 'Peşəkarlıq',
    description: 'Təcrübəli və ixtisaslı mütəxəssislərdən ibarət güclü komanda.'
  },
  {
    icon: Award,
    title: 'Etibarlılıq',
    description: '25 illik təcrübə və yüzlərlə uğurlu layihə ilə qazanılmış etibar.'
  },
]

const timeline = [
  { year: '1999', title: 'Şirkətin Yaranması', description: 'Akin Industry kiçik bir tikinti şirkəti olaraq fəaliyyətə başladı.' },
  { year: '2005', title: 'İlk İri Layihə', description: 'Bakıda ilk böyük kommersiya tikinti layihəsini uğurla tamamladıq.' },
  { year: '2010', title: 'Sənaye Sektoruna Giriş', description: 'Sənaye tikintisi sahəsinə daxil olaraq portfelimizi genişləndirdik.' },
  { year: '2015', title: 'ISO Sertifikasiyası', description: 'ISO 9001 keyfiyyət idarəetmə sertifikatını aldıq.' },
  { year: '2020', title: 'BIM Texnologiyası', description: 'Müasir BIM texnologiyasını tətbiq edərək layihələndirmə prosesini təkmilləşdirdik.' },
  { year: '2024', title: '500+ Layihə', description: '25 il ərzində 500-dən çox layihəni uğurla tamamladıq.' },
]

const certifications = [
  'ISO 9001:2015 Keyfiyyət İdarəetmə',
  'ISO 14001:2015 Ətraf Mühit İdarəetmə',
  'ISO 45001:2018 İş Sağlamlığı və Təhlükəsizliyi',
  'Dövlət Tikinti Lisenziyası (I Dərəcə)',
]

export default function AboutPage() {
  const { team, stats: companyStats } = useAdmin()

  return (
    <>
      <PageHeader
        title="Haqqımızda"
        description="Azərbaycanda tikinti sektorunun etibarlı tərəfdaşı"
        breadcrumbs={[{ label: 'Haqqımızda' }]}
      />

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-card rounded-2xl p-8 border border-border/50">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Missiyamız</h2>
              <p className="text-muted-foreground leading-relaxed">
                Müştərilərimizin ehtiyaclarına uyğun yüksək keyfiyyətli, innovativ və davamlı 
                tikinti həlləri təqdim etməklə Azərbaycanın infrastrukturunun inkişafına töhfə 
                vermək. Hər layihədə mükəmməllik, etika və müştəri məmnuniyyətini əsas tuturuq.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-card rounded-2xl p-8 border border-border/50">
              <div className="w-14 h-14 bg-accent/20 rounded-lg flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Vizyonumuz</h2>
              <p className="text-muted-foreground leading-relaxed">
                Regionda tikinti sektorunun lider şirkəti olmaq və beynəlxalq standartlara 
                uyğun xidmətlərimizlə qlobal bazarlarda tanınmaq. Texnoloji yenilikləri 
                tətbiq edərək gələcəyin tikinti həllərini bu gündən formalaşdırırıq.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                Tariximiz
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
                25 İllik Uğur Yolu
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                1999-cu ildə kiçik bir tikinti şirkəti olaraq fəaliyyətə başlayan Akin Industry, 
                bu gün Azərbaycanın ən etibarlı tikinti şirkətlərindən birinə çevrilmişdir.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                İllər ərzində yaşayış binalarından sənaye komplekslərinə, yol infrastrukturundan 
                kommersiya mərkəzlərinə qədər müxtəlif sahələrdə 500-dən çox layihəni uğurla 
                tamamlamışıq. Hər layihədə keyfiyyət və müştəri məmnuniyyətini əsas tutaraq, 
                sektorda etibarlı bir mövqe qazanmışıq.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <div className="text-3xl font-bold text-primary mb-1">{companyStats.years}+</div>
                  <div className="text-muted-foreground text-sm">İllik Təcrübə</div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <div className="text-3xl font-bold text-primary mb-1">{companyStats.projects}+</div>
                  <div className="text-muted-foreground text-sm">Tamamlanmış Layihə</div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <div className="text-3xl font-bold text-primary mb-1">{companyStats.employees}+</div>
                  <div className="text-muted-foreground text-sm">Peşəkar İşçi</div>
                </div>
                <div className="text-center p-4 bg-card rounded-xl border border-border/50">
                  <div className="text-3xl font-bold text-primary mb-1">{companyStats.clients}+</div>
                  <div className="text-muted-foreground text-sm">Razı Müştəri</div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Dəyərlərimiz
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Bizə Rəhbərlik Edən Prinsiplər
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Hər layihədə bu dəyərlərə sadiq qalaraq müştərilərimizin güvənini qazanırıq.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Tarix
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              İnkişaf Yolumuz
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

              {/* Items */}
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm">
                      <span className="inline-block px-3 py-1 bg-accent/20 text-accent-foreground text-sm font-semibold rounded-full mb-3">
                        {item.year}
                      </span>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Komandamız
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              Rəhbərlik Heyəti
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Təcrübəli peşəkarlardan ibarət rəhbərlik komandamız.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.id} className="overflow-hidden border-border/50 group">
                <div className="aspect-[4/5] bg-primary/10 relative">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-primary/40">
                      <ImageIcon className="h-12 w-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-3">{member.position}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
              Sertifikatlar və Lisenziyalar
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              Beynəlxalq standartlara uyğunluğumuzu təsdiq edən sertifikatlar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4"
              >
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="text-primary-foreground font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
