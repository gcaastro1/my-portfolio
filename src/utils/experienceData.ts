import type { LocalizedText } from './i18n'

export interface ExperienceData {
  company: string
  role: LocalizedText
  period: LocalizedText
  highlights: Record<'en' | 'pt', string[]>
}

const experienceData: ExperienceData[] = [
  {
    company: 'SBOnline Sistemas',
    role: {
      en: 'Front-End Developer / Software Engineer',
      pt: 'Desenvolvedor Front-End / Engenheiro de Software',
    },
    period: { en: 'Jan 2025 – Present', pt: 'Jan 2025 – Atual' },
    highlights: {
      en: [
        'Maintained and modernized business-critical ERP systems.',
        'Improved screens, filters, reports and business workflows used by real users.',
        'Worked with Delphi/VCL, SQL and front-end technologies to improve stability, usability and performance.',
      ],
      pt: [
        'Mantive e modernizei sistemas ERP críticos para o negócio.',
        'Aprimorei telas, filtros, relatórios e fluxos utilizados por usuários reais.',
        'Trabalhei com Delphi/VCL, SQL e tecnologias front-end para melhorar estabilidade, usabilidade e desempenho.',
      ],
    },
  },
  {
    company: 'NOVE HUB',
    role: { en: 'Front-End Developer', pt: 'Desenvolvedor Front-End' },
    period: { en: 'Jan 2024 – Nov 2024', pt: 'Jan 2024 – Nov 2024' },
    highlights: {
      en: [
        'Built and maintained landing pages and web applications using React.js and Firebase.',
        'Translated Figma interfaces into responsive, reusable and maintainable front-end components.',
        'Integrated modern front-end interfaces with no-code platforms such as Bubble.io and WordPress.',
      ],
      pt: [
        'Desenvolvi e mantive landing pages e aplicações web com React.js e Firebase.',
        'Transformei interfaces do Figma em componentes responsivos, reutilizáveis e fáceis de manter.',
        'Integrei interfaces front-end modernas a plataformas no-code como Bubble.io e WordPress.',
      ],
    },
  },
  {
    company: 'Kenzie Academy Brasil',
    role: {
      en: 'Technical Teaching Assistant',
      pt: 'Assistente de Ensino Técnico',
    },
    period: { en: 'Sep 2022 – Apr 2024', pt: 'Set 2022 – Abr 2024' },
    highlights: {
      en: [
        'Reviewed code and supported students in React, TypeScript, Python and web development.',
        'Provided technical feedback to improve code quality, architecture and problem-solving skills.',
      ],
      pt: [
        'Revisei código e apoiei estudantes em React, TypeScript, Python e desenvolvimento web.',
        'Forneci feedback técnico para melhorar qualidade de código, arquitetura e resolução de problemas.',
      ],
    },
  },
  {
    company: 'Invillia',
    role: { en: 'UX/UI Designer', pt: 'Designer UX/UI' },
    period: { en: 'May 2019 – Oct 2019', pt: 'Mai 2019 – Out 2019' },
    highlights: {
      en: [
        'Created user flows, wireframes and high-fidelity prototypes.',
        'Worked with Figma, Adobe XD and Illustrator to support product discovery and interface design.',
      ],
      pt: [
        'Criei fluxos de usuário, wireframes e protótipos de alta fidelidade.',
        'Trabalhei com Figma, Adobe XD e Illustrator em descoberta de produto e design de interfaces.',
      ],
    },
  },
]

export default experienceData
