export type ContactType = 'email' | 'linkedin' | 'github' | 'whatsapp'

export interface ContactData {
  type: ContactType
  title: LocalizedText
  subtitle: LocalizedText
  link: string
}

export const contactsData: ContactData[] = [
  {
    type: 'email',
    title: { en: 'Email', pt: 'Email' },
    subtitle: { en: 'gcaastro1@gmail.com', pt: 'gcaastro1@gmail.com' },
    link: 'mailto:gcaastro1@gmail.com',
  },
  {
    type: 'linkedin',
    title: { en: 'LinkedIn', pt: 'LinkedIn' },
    subtitle: {
      en: 'Professional experience and connections',
      pt: 'Experiência profissional e conexões',
    },
    link: 'https://www.linkedin.com/in/gucaastro1/',
  },
  {
    type: 'github',
    title: { en: 'GitHub', pt: 'GitHub' },
    subtitle: {
      en: 'Code, experiments and repositories',
      pt: 'Código, experimentos e repositórios',
    },
    link: 'https://github.com/gcaastro1',
  },
  {
    type: 'whatsapp',
    title: { en: 'WhatsApp', pt: 'WhatsApp' },
    subtitle: {
      en: 'A direct conversation about opportunities',
      pt: 'Uma conversa direta sobre oportunidades',
    },
    link: 'https://wa.me/5516981293398',
  },
]
import type { LocalizedText } from './i18n'
