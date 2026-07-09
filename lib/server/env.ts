function readBooleanEnv(name: string, fallback: boolean) {
  const value = process.env[name]

  if (value === undefined) {
    return fallback
  }

  return value === 'true' || value === '1'
}

function readStringEnv(name: string, fallback = '') {
  return process.env[name]?.trim() || fallback
}

export function readContactNotificationEnv() {
  return {
    gmail: {
      enabled: readBooleanEnv('CONTACT_GMAIL_ENABLED', true),
      recipientEmail: readStringEnv('CONTACT_GMAIL_RECIPIENT_EMAIL'),
      senderEmail: readStringEnv('CONTACT_GMAIL_SENDER_EMAIL'),
      appPassword: readStringEnv('CONTACT_GMAIL_APP_PASSWORD'),
      subjectPrefix: readStringEnv('CONTACT_GMAIL_SUBJECT_PREFIX', 'Akin Contact'),
    },
    whatsapp: {
      enabled: readBooleanEnv('CONTACT_WHATSAPP_ENABLED', false),
      accessToken: readStringEnv('CONTACT_WHATSAPP_ACCESS_TOKEN'),
      phoneNumberId: readStringEnv('CONTACT_WHATSAPP_PHONE_NUMBER_ID'),
      recipientPhone: readStringEnv('CONTACT_WHATSAPP_RECIPIENT_PHONE'),
      apiVersion: readStringEnv('CONTACT_WHATSAPP_API_VERSION', 'v23.0'),
    },
  }
}

export function readCareerNotificationEnv() {
  return {
    gmail: {
      enabled: readBooleanEnv('CAREER_GMAIL_ENABLED', true),
      recipientEmail: readStringEnv('CAREER_GMAIL_RECIPIENT_EMAIL'),
      senderEmail: readStringEnv('CAREER_GMAIL_SENDER_EMAIL'),
      appPassword: readStringEnv('CAREER_GMAIL_APP_PASSWORD'),
      subjectPrefix: readStringEnv('CAREER_GMAIL_SUBJECT_PREFIX', 'Akin Career'),
    },
    telegram: {
      enabled: readBooleanEnv('CAREER_TELEGRAM_ENABLED', false),
      botToken: readStringEnv('CAREER_TELEGRAM_BOT_TOKEN'),
      chatId: readStringEnv('CAREER_TELEGRAM_CHAT_ID'),
    },
    whatsapp: {
      enabled: readBooleanEnv('CAREER_WHATSAPP_ENABLED', false),
      accessToken: readStringEnv('CAREER_WHATSAPP_ACCESS_TOKEN'),
      phoneNumberId: readStringEnv('CAREER_WHATSAPP_PHONE_NUMBER_ID'),
      recipientPhone: readStringEnv('CAREER_WHATSAPP_RECIPIENT_PHONE'),
      apiVersion: readStringEnv('CAREER_WHATSAPP_API_VERSION', 'v23.0'),
    },
  }
}
