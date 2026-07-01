export interface ProjectData {
  id: number
  title: string
  description: string
  stack: string[]
  repository: string
  deploy: string
}

const projectsData: ProjectData[] = [
  {
    id: 1,
    title: 'Portfolio Website',
    description:
      'Personal portfolio built with Next.js and TypeScript to present my experience, technical skills and selected front-end projects.',
    stack: ['Next.js', 'React', 'TypeScript', 'Sass', 'Framer Motion'],
    repository: 'https://github.com/gcaastro1/my-portfolio',
    deploy: 'https://gustavolima.vercel.app',
  },
]

/*
  Planned projects:
  - FinanceFlow — Cash Flow Dashboard
  - Stockly ERP — Products, Inventory and Orders
  - HelpDesk Pro — Support Ticket System
*/

export default projectsData
