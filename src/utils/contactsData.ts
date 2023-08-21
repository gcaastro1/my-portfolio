import WhatsApp from '@/assets/contacts/whatsapp.svg'
import Linkedin from '@/assets/contacts/linkedin.svg'
import Gmail from '@/assets/contacts/gmail.svg'

export interface ContactsData {
  img: any
  title: string
  subtitle: string
}

export const contactsData: ContactsData[] = [
  {
    img: WhatsApp,
    title: 'My Whatsapp.',
    subtitle:
      "I'm available for a voice chat or text, let's about creativity together?",
  },
  {
    img: Linkedin,
    title: 'My Linkedin.',
    subtitle:
      'We can create more constant interactions as well as a sharing network',
  },
  {
    img: Gmail,
    title: 'My Email.',
    subtitle: 'Send me an email reporting feedbacks, suggestions and ideas',
  },
]
