import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

import {
  defaultContact,
  ensureDefaultAdminAccount,
  getDefaultAdminContent,
} from '@/lib/admin/defaults'
import type { AdminContentData } from '@/lib/admin/types'

const DATA_DIR = path.join(process.cwd(), 'data')
const CONFIG_PATH = path.join(DATA_DIR, 'admin-content.json')

function mergeAdminContent(config?: Partial<AdminContentData>): AdminContentData {
  const defaults = getDefaultAdminContent()

  return {
    projects: config?.projects ?? defaults.projects,
    news: config?.news ?? defaults.news,
    team: config?.team ?? defaults.team,
    services: config?.services ?? defaults.services,
    jobs: config?.jobs ?? defaults.jobs,
    certificates: config?.certificates ?? defaults.certificates,
    partners: config?.partners ?? defaults.partners,
    contact: {
      ...defaults.contact,
      ...config?.contact,
    },
    stats: config?.stats ?? defaults.stats,
    adminAccounts: ensureDefaultAdminAccount(config?.adminAccounts),
  }
}

export async function readAdminContentConfig() {
  try {
    const content = await readFile(CONFIG_PATH, 'utf8')
    return {
      data: mergeAdminContent(JSON.parse(content) as Partial<AdminContentData>),
      hasStoredData: true,
    }
  } catch {
    return {
      data: getDefaultAdminContent(),
      hasStoredData: false,
    }
  }
}

export async function writeAdminContentConfig(config: AdminContentData) {
  const normalized = mergeAdminContent(config)
  await mkdir(DATA_DIR, { recursive: true })
  await writeFile(CONFIG_PATH, JSON.stringify(normalized, null, 2), 'utf8')
  return normalized
}
