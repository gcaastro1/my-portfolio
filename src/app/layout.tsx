import type { Metadata } from 'next'
import '../scss/main.scss'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  metadataBase: new URL('https://gustavolima.vercel.app'),
  title: 'Gustavo Lima | Front-End Developer',
  description:
    'Front-End Developer focused on React.js, Next.js and TypeScript, building modern web applications, business interfaces and ERP-focused solutions.',
  keywords: [
    'Front-End Developer',
    'React.js',
    'Next.js',
    'TypeScript',
    'UI/UX',
    'ERP',
  ],
  authors: [{ name: 'Gustavo Lima' }],
  openGraph: {
    title: 'Gustavo Lima | Front-End Developer',
    description:
      'Modern web applications, business interfaces and ERP-focused solutions built with React.js, Next.js and TypeScript.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
