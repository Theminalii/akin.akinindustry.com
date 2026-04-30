'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Facebook,
  Image as ImageIcon,
  Linkedin,
  Share2,
  Twitter,
  User,
} from 'lucide-react'

import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAdmin } from '@/lib/admin/context'

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('az-AZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function NewsDetailClient({ slug }: { slug: string }) {
  const { news, isReady } = useAdmin()

  const sortedNews = [...news].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const article = sortedNews.find((item) => item.slug === slug)

  if (!isReady) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl border border-border/50 bg-card p-8 text-center text-muted-foreground">
            Xəbər yüklənir...
          </div>
        </div>
      </section>
    )
  }

  if (!article) {
    return (
      <>
        <PageHeader
          title="Xəbər tapılmadı"
          breadcrumbs={[
            { label: 'Xəbərlər', href: '/xeberler' },
            { label: 'Tapılmadı' },
          ]}
        />

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl rounded-3xl border border-border/50 bg-card p-10 text-center">
              <h2 className="text-2xl font-bold text-foreground">Bu xəbər tapılmadı</h2>
              <p className="mt-3 text-muted-foreground">
                Slug dəyişibsə və ya xəbər silinibsə, siyahıya geri dönüb yenidən yoxla.
              </p>
              <Button asChild className="mt-6">
                <Link href="/xeberler">Bütün xəbərlərə qayıt</Link>
              </Button>
            </div>
          </div>
        </section>
      </>
    )
  }

  const relatedArticles = sortedNews
    .filter((item) => item.category === article.category && item.id !== article.id)
    .slice(0, 3)

  const currentIndex = sortedNews.findIndex((item) => item.id === article.id)
  const prevArticle = currentIndex > 0 ? sortedNews[currentIndex - 1] : null
  const nextArticle = currentIndex < sortedNews.length - 1 ? sortedNews[currentIndex + 1] : null

  return (
    <>
      <PageHeader
        title={article.title}
        breadcrumbs={[
          { label: 'Xəbərlər', href: '/xeberler' },
          { label: article.title },
        ]}
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="px-4 py-2 bg-accent/20 text-accent-foreground text-sm font-medium rounded-full">
                {article.category}
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {formatDate(article.date)}
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                Akin Industry
              </span>
            </div>

            <div className="aspect-video rounded-2xl overflow-hidden bg-primary/10 mb-10 relative">
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-primary/40">
                  <ImageIcon className="h-14 w-14" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            </div>

            <div className="prose prose-lg max-w-none mb-10">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex items-center gap-4 py-6 border-t border-b border-border">
              <span className="flex items-center gap-2 text-foreground font-medium">
                <Share2 className="h-4 w-4" />
                Paylaş:
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center py-8">
              {prevArticle ? (
                <Link
                  href={`/xeberler/${prevArticle.slug}`}
                  className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <span className="text-xs uppercase tracking-wider">Əvvəlki</span>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1 max-w-[200px]">
                      {prevArticle.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextArticle ? (
                <Link
                  href={`/xeberler/${nextArticle.slug}`}
                  className="group flex items-center gap-3 text-right text-muted-foreground hover:text-primary transition-colors"
                >
                  <div>
                    <span className="text-xs uppercase tracking-wider">Növbəti</span>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1 max-w-[200px]">
                      {nextArticle.title}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8">Oxşar Xəbərlər</h2>

              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((relArticle) => (
                  <Link key={relArticle.id} href={`/xeberler/${relArticle.slug}`}>
                    <Card className="group h-full overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-lg transition-all">
                      <div className="relative aspect-[16/10] overflow-hidden bg-primary/10">
                        {relArticle.image ? (
                          <img
                            src={relArticle.image}
                            alt={relArticle.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-primary/40">
                            <ImageIcon className="h-10 w-10" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <span className="text-xs text-muted-foreground">{formatDate(relArticle.date)}</span>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mt-1 line-clamp-2">
                          {relArticle.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-8 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/xeberler">
              <ArrowLeft className="h-4 w-4" />
              Bütün Xəbərlərə Qayıt
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
