import type { LocalizedText } from './i18n'

export interface StackCategory {
  title: LocalizedText
  code: string
  technologies: Array<string | LocalizedText>
}

const stackData: StackCategory[] = [
  {
    title: { en: 'Frontend', pt: 'Frontend' },
    code: 'frontend.ts',
    technologies: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Sass',
    ],
  },
  {
    title: { en: 'UI & Styling', pt: 'UI e Estilização' },
    code: 'interface.fig',
    technologies: [
      'Tailwind CSS',
      'Styled Components',
      'Material UI',
      'Figma',
    ],
  },
  {
    title: { en: 'Backend & Data', pt: 'Backend e Dados' },
    code: 'services.sql',
    technologies: ['SQL', 'Firebase', 'Node.js', 'Docker'],
  },
  {
    title: { en: 'Legacy & Business', pt: 'Legado e Negócios' },
    code: 'business.pas',
    technologies: [
      'Delphi/VCL',
      { en: 'ERP Systems', pt: 'Sistemas ERP' },
      { en: 'Business Rules', pt: 'Regras de Negócio' },
    ],
  },
  {
    title: { en: 'Tools & Delivery', pt: 'Ferramentas e Entrega' },
    code: 'workflow.yml',
    technologies: ['Git', 'GitHub', 'Vercel', 'Scrum', 'Kanban'],
  },
]

export default stackData
