export interface StackCategory {
  title: string
  code: string
  technologies: string[]
}

const stackData: StackCategory[] = [
  {
    title: 'Frontend',
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
    title: 'UI & Styling',
    code: 'interface.fig',
    technologies: [
      'Tailwind CSS',
      'Styled Components',
      'Material UI',
      'Figma',
    ],
  },
  {
    title: 'Backend & Data',
    code: 'services.sql',
    technologies: ['SQL', 'Firebase', 'Node.js', 'Docker'],
  },
  {
    title: 'Legacy & Business',
    code: 'business.pas',
    technologies: ['Delphi/VCL', 'ERP Systems', 'Business Rules'],
  },
  {
    title: 'Tools & Delivery',
    code: 'workflow.yml',
    technologies: ['Git', 'GitHub', 'Vercel', 'Scrum', 'Kanban'],
  },
]

export default stackData
