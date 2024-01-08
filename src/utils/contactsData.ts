import WhatsApp from '@/assets/contacts/whatsapp.svg'
import Linkedin from '@/assets/contacts/linkedin.svg'
import Gmail from '@/assets/contacts/gmail.svg'

export interface ContactsData {
  img: any
  title: string
  subtitle: string
  bg: string
  link: string
}

export const contactsData: ContactsData[] = [
  {
    img: WhatsApp,
    title: 'My Whatsapp.',
    subtitle:
      "I'm available for a voice chat or text, let's about creativity together?",
    bg: '#5AA640',
    link: 'https://wa.me/+5516981293398',
  },
  {
    img: Linkedin,
    title: 'My Linkedin.',
    subtitle:
      'We can create more constant interactions as well as a sharing network',
    bg: '#1F62A6',
    link: 'https://www.linkedin.com/in/gucaastro1/',
  },
  {
    img: Gmail,
    title: 'My Email.',
    subtitle: 'Send me an email reporting feedbacks, suggestions and ideas',
    bg: '#C03B3B',
    link: 'mailto=gcaastro1@gmail.com',
  },
]
