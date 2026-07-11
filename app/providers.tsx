'use client'

import { useEffect } from 'react'
import { AdminProvider } from '@/lib/admin/context'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return

    navigator.serviceWorker.register('/sw.js').catch(() => {
      // The website must continue normally when service workers are unavailable.
    })
  }, [])

  return (
    <AdminProvider>
      {children}
    </AdminProvider>
  )
}
