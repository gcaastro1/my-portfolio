export type ContactType = 'email' | 'linkedin' | 'github' | 'whatsapp'

export interface ContactData {
  type: ContactType
  title: string
  subtitle: string
  link: string
}

export const contactsData: ContactData[] = [
  {
    type: 'email',
    title: 'Email',
    subtitle: 'gcaastro1@gmail.com',
    link: 'mailto:gcaastro1@gmail.com',
  },
  {
    type: 'linkedin',
    title: 'LinkedIn',
    subtitle: 'Professional experience and connections',
    link: 'https://www.linkedin.com/in/gucaastro1/',
  },
  {
    type: 'github',
    title: 'GitHub',
    subtitle: 'Code, experiments and repositories',
    link: 'https://github.com/gcaastro1',
  },
  {
    type: 'whatsapp',
    title: 'WhatsApp',
    subtitle: 'A direct conversation about opportunities',
    link: 'https://wa.me/5516981293398',
  },
]
