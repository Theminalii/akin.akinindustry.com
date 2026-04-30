'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const slides = [
  {
    id: 1,
    title: 'Keyfiyyətli Tikinti Həlləri',
    description: 'Müasir texnologiyalar və peşəkar komandamızla arzularınızı reallığa çeviririk.',
    image: '/images/hero/hero-1.png'
  },
  {
    id: 2,
    title: 'Sənaye Tikintisində Lider',
    description: 'Zavodlar, anbarlar və sənaye komplekslərinin inşasında güvənilir tərəfdaş.',
    image: '/images/hero/hero-2.png'
  },
  {
    id: 3,
    title: 'Müasir Yaşayış Məkanları',
    description: 'Ailənizdən hər kəs üçün komfortlu və müasir yaşayış məkanları yaradırıq.',
    image: '/images/hero/hero-3.png'
  }
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }


  return (
    <section className="relative h-screen min-h-150 max-h-225 overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          )}
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-primary/90 via-primary/70 to-primary/40" />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <div className={cn(
              'max-w-2xl text-white transition-all duration-700 delay-300',
              index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
                {slide.description}
              </p>
            </div>
          </div>
        </div>
      ))}


      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              'h-3 rounded-full transition-all',
              index === currentSlide ? 'w-8 bg-accent' : 'w-3 bg-white/50 hover:bg-white/70'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-white/70">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-white animate-pulse" />
        </div>
      </div>
    </section>
  )
}
