import WhatsApp from '@/assets/contacts/whatsapp.svg'
import Linkedin from '@/assets/contacts/linkedin.svg'
import Gmail from '@/assets/contacts/gmail.svg'
import type { ImageProps } from 'next/image'

export interface ContactsData {
  img: ImageProps['src']
  title: string
  subtitle: string
  bg: string
  link: string
}

export const contactsData: ContactsData[] = [
  {
    img: WhatsApp,
    title: 'WhatsApp',
    subtitle:
      'Send me a message to discuss an opportunity, project or collaboration.',
    bg: '#5AA640',
    link: 'https://wa.me/5516981293398',
  },
  {
    img: Linkedin,
    title: 'LinkedIn',
    subtitle:
      'Connect with me and learn more about my professional experience.',
    bg: '#1F62A6',
    link: 'https://www.linkedin.com/in/gucaastro1/',
  },
  {
    img: Gmail,
    title: 'Email',
    subtitle: 'Contact me directly at gcaastro1@gmail.com.',
    bg: '#C03B3B',
    link: 'mailto:gcaastro1@gmail.com',
  },
]
