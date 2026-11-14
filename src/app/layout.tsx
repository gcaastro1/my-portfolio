import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import '../scss/main.scss'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

const themeScript = `try{var t=localStorage.getItem('@Theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`

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
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <LanguageProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
