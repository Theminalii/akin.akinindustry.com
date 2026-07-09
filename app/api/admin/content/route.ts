import { NextResponse } from 'next/server'

import type { AdminContentData } from '@/lib/admin/types'
import {
  readAdminContentConfig,
  writeAdminContentConfig,
} from '@/lib/server/admin-content-config'

export const runtime = 'nodejs'

export async function GET() {
  const { data, hasStoredData } = await readAdminContentConfig()
  return NextResponse.json({ data, hasStoredData })
}

export async function POST(request: Request) {
  const body = (await request.json()) as AdminContentData
  const data = await writeAdminContentConfig(body)
  return NextResponse.json({ success: true, data })
}
