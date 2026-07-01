export interface ProjectData {
  id: number
  title: string
  label: string
  description: string
  stack: string[]
  repository?: string
  deploy?: string
  status: 'live' | 'coming-soon'
  visible: boolean
}

const projectsData: ProjectData[] = [
  {
    id: 1,
    title: 'Portfolio Website',
    label: 'Featured / 2026',
    description:
      'Personal portfolio redesigned with Next.js, TypeScript, Sass and Framer Motion to present my experience, technical skills and selected front-end projects.',
    stack: ['Next.js', 'React', 'TypeScript', 'Sass', 'Framer Motion'],
    repository: 'https://github.com/gcaastro1/my-portfolio',
    deploy: 'https://gustavolima.vercel.app',
    status: 'live',
    visible: true,
  },
  {
    id: 2,
    title: 'FinanceFlow',
    label: 'Cash Flow Dashboard',
    description: 'Financial overview and cash flow management experience.',
    stack: ['Next.js', 'TypeScript', 'Charts'],
    status: 'coming-soon',
    visible: false,
  },
  {
    id: 3,
    title: 'Stockly ERP',
    label: 'Products, Inventory and Orders',
    description: 'ERP interface focused on inventory and order workflows.',
    stack: ['React', 'TypeScript', 'SQL'],
    status: 'coming-soon',
    visible: false,
  },
  {
    id: 4,
    title: 'HelpDesk Pro',
    label: 'Support Ticket System',
    description: 'Support operation dashboard for tickets and service levels.',
    stack: ['Next.js', 'Firebase', 'TypeScript'],
    status: 'coming-soon',
    visible: false,
  },
]

export default projectsData
