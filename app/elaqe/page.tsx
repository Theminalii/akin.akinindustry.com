import type { Metadata } from 'next'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, Youtube, Send } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Əlaqə',
  description: 'Akin Industry ilə əlaqə saxlayın. Tikinti layihəniz üçün pulsuz məsləhət alın.',
}

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefon',
    details: ['+994 55 350 30 69', '+994 55 350 30 69'],
    action: 'tel:+994 55 350 30 69'
  },
  {
    icon: Mail,
    title: 'E-poçt',
    details: ['selim@akinindustry.com', 'sales@akinindustry.az'],
    action: 'mailto:selim@akinindustry.com'
  },
  {
    icon: MapPin,
    title: 'Ünvan',
    details: ['Bakı şəhəri, Nərimanov rayonu,', 'Atatürk prospekti 45'],
    action: null
  },
  {
    icon: Clock,
    title: 'İş Saatları',
    details: ['Bazar ertəsi - Cümə: 09:00 - 18:00', 'Şənbə: 10:00 - 14:00'],
    action: null
  },
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Əlaqə"
        description="Bizimlə əlaqə saxlayın, layihəniz haqqında danışaq"
        breadcrumbs={[{ label: 'Əlaqə' }]}
      />

      {/* Contact Info Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <Card key={index} className="text-center border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">{item.title}</h3>
                  <div className="space-y-1">
                    {item.details.map((detail, i) => (
                      item.action ? (
                        <a 
                          key={i} 
                          href={item.action}
                          className="block text-muted-foreground hover:text-primary transition-colors"
                        >
                          {detail}
                        </a>
                      ) : (
                        <p key={i} className="text-muted-foreground">{detail}</p>
                      )
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                  Əlaqə Formu
                </span>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Bizə Yazın
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Layihəniz haqqında məlumat verin, qısa müddətdə sizinlə əlaqə saxlayacağıq.
                </p>
              </div>

              <Card className="border-border/50">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Ad, Soyad *</Label>
                        <Input id="name" placeholder="Adınızı daxil edin" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-poçt *</Label>
                        <Input id="email" type="email" placeholder="email@example.com" required />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon *</Label>
                        <Input id="phone" placeholder="+994 XX XXX XX XX" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Mövzu</Label>
                        <Input id="subject" placeholder="Müraciətin mövzusu" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mesaj *</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Layihəniz haqqında ətraflı məlumat verin..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full group">
                      Göndər
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map & Info */}
            <div>
              <div className="mb-8">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                  Məkan
                </span>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Ofisimizi Ziyarət Edin
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Əsas ofisimiz Bakı şəhərinin mərkəzində yerləşir. Görüş üçün əvvəlcədən zəng edin.
                </p>
              </div>

              {/* Map Placeholder */}
              <Card className="border-border/50 overflow-hidden mb-8">
                <div className="aspect-4/3 bg-primary/10 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">Bakı şəhəri, Nərimanov rayonu</p>
                      <p className="text-muted-foreground">Atatürk prospekti 45</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-4">
                <span className="text-foreground font-medium">Bizi izləyin:</span>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Layihəniz Haqqında Danışaq
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Pulsuz məsləhət üçün bu gün bizimlə əlaqə saxlayın
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <a href="tel:+994553503069">
                <Phone className="mr-2 h-4 w-4" />
                +994 55 350 30 69
              </a>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <a href="mailto:selim@akinindustry.com">
                <Mail className="mr-2 h-4 w-4" />
                selim@akinindustry.com
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
