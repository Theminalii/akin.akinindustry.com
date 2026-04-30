import type { Metadata } from 'next'

import { NewsPageClient } from './news-page-client'

export const metadata: Metadata = {
  title: 'Xəbərlər',
  description: 'Akin Industry - Şirkət xəbərləri, layihə yenilikləri və sektordakı son inkişaflar.',
}

export default function NewsPage() {
  return <NewsPageClient />
}
