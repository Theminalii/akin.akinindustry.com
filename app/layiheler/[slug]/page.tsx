'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, Building2, Ruler, Users, ArrowRight, ArrowLeft } from 'lucide-react'
import { categoryLabels } from '@/lib/data'
import { useAdmin } from '@/lib/admin/context'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'

interface Project {
  id: string
  slug: string
  title: string
  category: string
  description: string
  client: string
  location: string
  year: number
  area: string
  images: string[]
  featured?: boolean
}

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { projects } = useAdmin()

  const project = useMemo(() => projects.find((p) => p.slug === slug), [projects, slug])
  const relatedProjects = useMemo(() => {
    if (!project) return []
    const foundProject = projects.find((p) => p.slug === slug)
    return projects
      .filter((p) => project && p.category === project.category && p.id !== project.id)
      .slice(0, 3)
  }, [projects, project])

  if (!project) {
    notFound()
  }

  const details = [
    { icon: Users, label: 'Müştəri', value: project.client },
    { icon: MapPin, label: 'Məkan', value: project.location },
    { icon: Calendar, label: 'İl', value: project.year.toString() },
    { icon: Ruler, label: 'Sahə', value: project.area },
  ]

  return (
    <>
      <PageHeader
        title={project.title}
        description={categoryLabels[project.category]}
        breadcrumbs={[
          { label: 'Layihələr', href: '/layiheler' },
          { label: project.title }
        ]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Main Image */}
              <div className="aspect-video rounded-2xl overflow-hidden bg-primary/10 mb-8 relative">
                {project.images && project.images.length > 0 ? (
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent" />
                )}
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Layihə Haqqında</h2>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </div>

              {/* Gallery */}
              {project.images && project.images.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Qalereya</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {project.images.map((image, index) => (
                      <div key={index} className="aspect-4/3 rounded-xl overflow-hidden bg-primary/10 relative">
                        <Image
                          src={image}
                          alt={`${project.title} - ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Project Details Card */}
              <Card className="mb-8 sticky top-32">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-6">Layihə Məlumatları</h3>
                  <div className="space-y-4">
                    {details.map((detail, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                          <detail.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">{detail.label}</p>
                          <p className="font-medium text-foreground">{detail.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <span className="inline-block px-4 py-2 bg-accent/20 text-accent-foreground text-sm font-medium rounded-full">
                      {categoryLabels[project.category]}
                    </span>
                  </div>

                  <Button asChild className="w-full mt-6">
                    <Link href="/elaqe">
                      Layihə Sorğusu Göndər
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">Oxşar Layihələr</h2>
              <Button asChild variant="outline">
                <Link href="/layiheler">
                  Bütün Layihələr
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects.map((relProject) => (
                <Link key={relProject.id} href={`/layiheler/${relProject.slug}`}>
                  <Card className="group h-full overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-lg transition-all">
                    <div className="relative aspect-16/10 overflow-hidden">
                      <div className="absolute inset-0 bg-primary/20" />
                      <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {relProject.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">{relProject.location}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="py-8 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/layiheler">
              <ArrowLeft className="h-4 w-4" />
              Bütün Layihələrə Qayıt
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
