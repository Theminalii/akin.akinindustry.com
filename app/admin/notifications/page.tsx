'use client'

import { useEffect, useState } from 'react'
import { BellRing, Mail, MessageCircleMore, Send } from 'lucide-react'

import {
  defaultCareerNotificationSettings,
  type CareerNotificationSettings,
} from '@/lib/career-notifications'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function AdminNotificationsPage() {
  const [config, setConfig] = useState<CareerNotificationSettings>(defaultCareerNotificationSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await fetch('/api/admin/career-notifications')
        const data = (await response.json()) as CareerNotificationSettings
        setConfig(data)
      } catch {
        setMessage('Bildiriş ayarları yüklənə bilmədi.')
      } finally {
        setLoading(false)
      }
    }

    loadConfig()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/career-notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      })

      if (!response.ok) {
        throw new Error('save_failed')
      }

      const data = (await response.json()) as CareerNotificationSettings
      setConfig(data)
      setMessage('Bildiriş ayarları yadda saxlanıldı.')
    } catch {
      setMessage('Yadda saxlama zamanı xəta baş verdi.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm text-sm text-slate-500">
        Bildiriş ayarları yüklənir...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <BellRing className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Vakansiya bildirişləri</h1>
            <p className="mt-2 text-sm text-slate-500">
              Müraciət forması göndəriləndə hansı kanallara bildiriş getsin, buradan idarə et.
            </p>
          </div>
        </div>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Gmail</CardTitle>
          <CardDescription>
            Gmail App Password ilə emailə müraciət məlumatlarını və CV-ni göndər.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-slate-500" />
              <div>
                <p className="font-medium text-slate-900">Gmail bildirişi aktivdir</p>
                <p className="text-sm text-slate-500">CV əlavə ilə email göndərişi</p>
              </div>
            </div>
            <Switch
              checked={config.gmail.enabled}
              onCheckedChange={(checked) =>
                setConfig((prev) => ({ ...prev, gmail: { ...prev.gmail, enabled: checked } }))
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Göndərən Gmail</Label>
              <Input
                value={config.gmail.senderEmail}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    gmail: { ...prev.gmail, senderEmail: e.target.value },
                  }))
                }
                placeholder="yourgmail@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Qəbul edən Gmail</Label>
              <Input
                value={config.gmail.recipientEmail}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    gmail: { ...prev.gmail, recipientEmail: e.target.value },
                  }))
                }
                placeholder="hr@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Gmail App Password</Label>
              <Input
                type="password"
                value={config.gmail.appPassword}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    gmail: { ...prev.gmail, appPassword: e.target.value },
                  }))
                }
                placeholder="16 rəqəmli App Password"
              />
            </div>
            <div className="space-y-2">
              <Label>Subject prefix</Label>
              <Input
                value={config.gmail.subjectPrefix}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    gmail: { ...prev.gmail, subjectPrefix: e.target.value },
                  }))
                }
                placeholder="Akin Career"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Telegram</CardTitle>
          <CardDescription>
            Bot token və chat ID ilə müraciəti mətni və CV faylı kimi Telegram-a ötür.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <Send className="h-5 w-5 text-slate-500" />
              <div>
                <p className="font-medium text-slate-900">Telegram bildirişi aktivdir</p>
                <p className="text-sm text-slate-500">Bot API üzərindən mesaj və CV göndərişi</p>
              </div>
            </div>
            <Switch
              checked={config.telegram.enabled}
              onCheckedChange={(checked) =>
                setConfig((prev) => ({ ...prev, telegram: { ...prev.telegram, enabled: checked } }))
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Bot token</Label>
              <Input
                type="password"
                value={config.telegram.botToken}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    telegram: { ...prev.telegram, botToken: e.target.value },
                  }))
                }
                placeholder="123456:ABC..."
              />
            </div>
            <div className="space-y-2">
              <Label>Chat ID</Label>
              <Input
                value={config.telegram.chatId}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    telegram: { ...prev.telegram, chatId: e.target.value },
                  }))
                }
                placeholder="-100xxxxxxxxxx"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>WhatsApp</CardTitle>
          <CardDescription>
            Meta WhatsApp Cloud API ilə mətni və CV sənədini seçilmiş nömrəyə ötür.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <MessageCircleMore className="h-5 w-5 text-slate-500" />
              <div>
                <p className="font-medium text-slate-900">WhatsApp bildirişi aktivdir</p>
                <p className="text-sm text-slate-500">Cloud API ilə text + document göndərişi</p>
              </div>
            </div>
            <Switch
              checked={config.whatsapp.enabled}
              onCheckedChange={(checked) =>
                setConfig((prev) => ({ ...prev, whatsapp: { ...prev.whatsapp, enabled: checked } }))
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Access token</Label>
              <Input
                type="password"
                value={config.whatsapp.accessToken}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    whatsapp: { ...prev.whatsapp, accessToken: e.target.value },
                  }))
                }
                placeholder="EAA..."
              />
            </div>
            <div className="space-y-2">
              <Label>Phone number ID</Label>
              <Input
                value={config.whatsapp.phoneNumberId}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    whatsapp: { ...prev.whatsapp, phoneNumberId: e.target.value },
                  }))
                }
                placeholder="106540352242922"
              />
            </div>
            <div className="space-y-2">
              <Label>Qəbul edən WhatsApp nömrəsi</Label>
              <Input
                value={config.whatsapp.recipientPhone}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    whatsapp: { ...prev.whatsapp, recipientPhone: e.target.value },
                  }))
                }
                placeholder="+9945XXXXXXXX"
              />
            </div>
            <div className="space-y-2">
              <Label>Graph API versiyası</Label>
              <Input
                value={config.whatsapp.apiVersion}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    whatsapp: { ...prev.whatsapp, apiVersion: e.target.value },
                  }))
                }
                placeholder="v23.0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm">
        <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-slate-500">
            Gmail üçün 2-Step Verification və App Password lazımdır. WhatsApp üçün Meta Cloud API
            access token və phone number ID tələb olunur.
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Yadda saxlanır...' : 'Ayarları yadda saxla'}
          </Button>
        </CardContent>
      </Card>

      {message && (
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          {message}
        </div>
      )}
    </div>
  )
}
