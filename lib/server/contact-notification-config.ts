import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

import {
  defaultContactNotificationSettings,
  type ContactNotificationSettings,
} from '@/lib/contact-notifications'
import { readContactNotificationEnv } from '@/lib/server/env'

const DATA_DIR = path.join(process.cwd(), 'data')
const CONFIG_PATH = path.join(DATA_DIR, 'contact-notifications.json')

function mergeConfig(
  config?: Partial<ContactNotificationSettings>
): ContactNotificationSettings {
  const envConfig = readContactNotificationEnv()

  return {
    gmail: {
      ...defaultContactNotificationSettings.gmail,
      ...config?.gmail,
      ...envConfig.gmail,
    },
    whatsapp: {
      ...defaultContactNotificationSettings.whatsapp,
      ...config?.whatsapp,
      ...envConfig.whatsapp,
    },
  }
}

export async function readContactNotificationConfig(): Promise<ContactNotificationSettings> {
  try {
    const content = await readFile(CONFIG_PATH, 'utf8')
    return mergeConfig(JSON.parse(content))
  } catch {
    return defaultContactNotificationSettings
  }
}

export async function writeContactNotificationConfig(
  config: ContactNotificationSettings
): Promise<ContactNotificationSettings> {
  const normalized = mergeConfig(config)
  await mkdir(DATA_DIR, { recursive: true })
  await writeFile(CONFIG_PATH, JSON.stringify(normalized, null, 2), 'utf8')
  return normalized
}
