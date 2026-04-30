import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance">
            Layihəniz Üçün Hazırıq
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-10">
            Tikinti layihənizi müzakirə etmək və pulsuz qiymət təklifi almaq üçün 
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
              className="bg-white text-black hover:bg-white/90 hover:text-primary"
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
  )
}
