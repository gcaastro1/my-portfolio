import type { LocalizedText } from './i18n'

export interface ProjectData {
  id: number
  title: string
  label: LocalizedText
  description: LocalizedText
  stack: string[]
  repository?: string
  deploy?: string
  image?: string
  status: 'live' | 'coming-soon'
  visible: boolean
}

const projectsData: ProjectData[] = [
  {
    id: 1,
    title: 'Portfolio Website',
    label: { en: 'Featured / 2026', pt: 'Destaque / 2026' },
    description: {
      en: 'Personal portfolio redesigned with Next.js, TypeScript, Sass and Framer Motion to present my experience, technical skills and selected front-end projects.',
      pt: 'Portfólio pessoal redesenhado com Next.js, TypeScript, Sass e Framer Motion para apresentar minha experiência, habilidades técnicas e projetos front-end selecionados.',
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Sass', 'Framer Motion'],
    repository: 'https://github.com/gcaastro1/my-portfolio',
    deploy: 'https://gustavolima.vercel.app',
    status: 'live',
    visible: true,
  },
  {
    id: 2,
    title: 'FinanceFlow',
    label: { en: 'Cash Flow Dashboard', pt: 'Dashboard de Fluxo de Caixa' },
    description: {
      en: 'Financial overview and cash flow management experience.',
      pt: 'Experiência para visão financeira e gestão do fluxo de caixa.',
    },
    stack: ['Next.js', 'TypeScript', 'Charts'],
    status: 'coming-soon',
    visible: false,
  },
  {
    id: 3,
    title: 'Stockly ERP',
    label: {
      en: 'Products, Inventory and Orders',
      pt: 'Produtos, Estoque e Pedidos',
    },
    description: {
      en: 'ERP interface focused on inventory and order workflows.',
      pt: 'Interface ERP focada nos fluxos de estoque e pedidos.',
    },
    stack: ['React', 'TypeScript', 'SQL'],
    status: 'coming-soon',
    visible: false,
  },
  {
    id: 4,
    title: 'HelpDesk Pro',
    label: { en: 'Support Ticket System', pt: 'Sistema de Chamados' },
    description: {
      en: 'Support operation dashboard for tickets and service levels.',
      pt: 'Dashboard de suporte para chamados e níveis de serviço.',
    },
    stack: ['Next.js', 'Firebase', 'TypeScript'],
    status: 'coming-soon',
    visible: false,
  },
  {
    id: 5,
    title: 'Dropmailer',
    label: { en: 'Temporary Email Service', pt: 'Serviço de Email Temporário' },
    description: {
      en: 'A temporary email service generator to protect your real inbox from spam.',
      pt: 'Um gerador de serviço de email temporário para proteger sua caixa de entrada principal contra spam.',
    },
    stack: ['Angular v18', 'TypeScript', 'TailwindCSS', 'Apollo GraphQL', 'FontAwesome', 'Dropmail.me'],
    repository: 'https://github.com/gcaastro1/tempmail-gen',
    deploy: 'https://dropmailer-gen.vercel.app/',
    image: '/dropmailer.png',
    status: 'live',
    visible: true,
  },
  {
    id: 6,
    title: 'Study Hub',
    label: { en: 'Learning Platform', pt: 'Plataforma de Estudos' },
    description: {
      en: 'A comprehensive platform to manage studies, courses and learning progress.',
      pt: 'Uma plataforma abrangente para gerenciar estudos, cursos e progresso de aprendizado.',
    },
    stack: ['Next.js', 'React', 'TypeScript'],
    status: 'coming-soon',
    visible: false,
  },
]

export default projectsData
