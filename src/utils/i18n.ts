import type { Language } from '@/contexts/LanguageContext/props'

export type LocalizedText = Record<Language, string>

export const translations = {
  en: {
    skipToContent: 'Skip to content',
    nav: {
      label: 'Main navigation',
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      stack: 'Stack',
      contact: 'Contact',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      switchToDark: 'Switch to dark theme',
      switchToLight: 'Switch to light theme',
      languageLabel: 'Select language',
    },
    hero: {
      availability: 'Available for Front-End opportunities',
      role: 'Front-End Developer',
      description:
        'I build modern, responsive and business-oriented web applications with strong UI/UX foundations and experience in ERP systems, SQL and legacy application modernization.',
      viewProjects: 'View Projects',
      downloadCv: 'Download CV',
      contactMe: 'Contact Me',
      cvNote: 'Prefer Portuguese?',
      cvAlternative: 'Download CV in PT-BR',
      terminalFile: 'developer.ts',
      terminalRole: 'Front-End Developer',
      terminalFocus: 'Business interfaces & ERP solutions',
      terminalHeadline: 'Building for real users',
      terminalSubtitle: 'UI craft meets business logic',
      scroll: 'Scroll to explore',
    },
    about: {
      eyebrow: '01 / About',
      title: 'Complex systems, made human.',
      description:
        'I combine front-end engineering, product design and business context to build interfaces people can trust.',
      paragraphs: [
        'I am a Front-End Developer with experience building and maintaining web applications and business systems using React.js, Next.js, TypeScript and Delphi/VCL.',
        'My background combines UI/UX design, modern front-end development and experience with ERP systems, SQL routines, reports, filters and business rules. I enjoy transforming complex workflows into clear, reliable and user-friendly interfaces.',
        'Currently, I work on the modernization and maintenance of corporate systems, improving usability, performance and stability in applications used by real business users.',
      ],
      currentFocus: 'Current focus',
      signature: 'Modern interfaces for real-world operations.',
      highlights: [
        {
          title: 'Front-End Development',
          description: 'Responsive React and Next.js interfaces built for clarity.',
        },
        {
          title: 'Business Systems',
          description: 'ERP workflows, SQL routines, reports and business rules.',
        },
        {
          title: 'UI/UX Background',
          description:
            'Product thinking that connects user needs to clean execution.',
        },
        {
          title: 'Legacy Modernization',
          description:
            'Safer, more usable experiences for business-critical software.',
        },
      ],
    },
    experience: {
      eyebrow: '02 / Experience',
      title: 'Built in the real world.',
      description:
        'From product design to teaching and business-critical systems, each role sharpened how I solve problems through interfaces.',
    },
    projects: {
      eyebrow: '03 / Selected work',
      title: 'Projects with a point of view.',
      description:
        'A curated selection of interfaces where engineering, usability and business context meet.',
      nextLab: 'Next in the lab: FinanceFlow, Stockly ERP and HelpDesk Pro.',
      live: 'Live',
      comingSoon: 'Coming soon',
      repository: 'Repository',
      liveDemo: 'Live Demo',
      technologies: 'Technologies used',
      previewLabel: 'Portfolio interface preview',
      previewKicker: 'FRONT-END DEVELOPER',
      previewTitle: 'Interfaces for',
      previewAccent: 'real business.',
      metrics: ['Projects', 'Experience', 'Focus'],
    },
    stack: {
      eyebrow: '04 / Stack',
      title: 'The tools behind the work.',
      description:
        'A practical stack shaped by modern front-end delivery and years of working close to business systems.',
    },
    contact: {
      eyebrow: "05 / Let's talk",
      title: 'Have a challenge?',
      titleAccent: "Let's make it clear.",
      description:
        'Interested in working together or discussing an opportunity? Feel free to contact me through LinkedIn, email, GitHub or WhatsApp.',
      cta: 'Start a conversation',
      contactVia: 'Contact Gustavo via',
    },
    footer: {
      designed: 'Designed and developed by Gustavo Lima.',
      built: 'Built with Next.js, TypeScript and Sass.',
      backToTop: 'Back to top',
    },
  },
  pt: {
    skipToContent: 'Pular para o conteúdo',
    nav: {
      label: 'Navegação principal',
      home: 'Início',
      about: 'Sobre',
      experience: 'Experiência',
      projects: 'Projetos',
      stack: 'Tecnologias',
      contact: 'Contato',
      openMenu: 'Abrir menu de navegação',
      closeMenu: 'Fechar menu de navegação',
      switchToDark: 'Mudar para o tema escuro',
      switchToLight: 'Mudar para o tema claro',
      languageLabel: 'Selecionar idioma',
    },
    hero: {
      availability: 'Disponível para oportunidades Front-End',
      role: 'Desenvolvedor Front-End',
      description:
        'Desenvolvo aplicações web modernas, responsivas e orientadas a negócios, com bases sólidas de UI/UX e experiência em sistemas ERP, SQL e modernização de aplicações legadas.',
      viewProjects: 'Ver Projetos',
      downloadCv: 'Baixar Currículo',
      contactMe: 'Fale Comigo',
      cvNote: 'Prefere inglês?',
      cvAlternative: 'Baixar currículo em inglês',
      terminalFile: 'desenvolvedor.ts',
      terminalRole: 'Desenvolvedor Front-End',
      terminalFocus: 'Interfaces de negócio e soluções ERP',
      terminalHeadline: 'Desenvolvendo para usuários reais',
      terminalSubtitle: 'UI bem feita aliada à lógica de negócio',
      scroll: 'Role para explorar',
    },
    about: {
      eyebrow: '01 / Sobre',
      title: 'Sistemas complexos, experiências simples.',
      description:
        'Combino engenharia front-end, design de produto e contexto de negócio para criar interfaces confiáveis.',
      paragraphs: [
        'Sou Desenvolvedor Front-End com experiência na criação e manutenção de aplicações web e sistemas de negócio usando React.js, Next.js, TypeScript e Delphi/VCL.',
        'Minha trajetória combina design de UI/UX, desenvolvimento front-end moderno e experiência com sistemas ERP, rotinas SQL, relatórios, filtros e regras de negócio. Gosto de transformar fluxos complexos em interfaces claras, confiáveis e fáceis de usar.',
        'Atualmente, trabalho na modernização e manutenção de sistemas corporativos, melhorando usabilidade, desempenho e estabilidade em aplicações utilizadas por usuários reais.',
      ],
      currentFocus: 'Foco atual',
      signature: 'Interfaces modernas para operações do mundo real.',
      highlights: [
        {
          title: 'Desenvolvimento Front-End',
          description:
            'Interfaces responsivas em React e Next.js construídas com clareza.',
        },
        {
          title: 'Sistemas de Negócio',
          description:
            'Fluxos ERP, rotinas SQL, relatórios e regras de negócio.',
        },
        {
          title: 'Experiência em UI/UX',
          description:
            'Visão de produto que conecta necessidades do usuário à execução.',
        },
        {
          title: 'Modernização de Legados',
          description:
            'Experiências mais seguras e usáveis para softwares críticos.',
        },
      ],
    },
    experience: {
      eyebrow: '02 / Experiência',
      title: 'Construído no mundo real.',
      description:
        'Do design de produto ao ensino e aos sistemas críticos, cada função aperfeiçoou minha forma de resolver problemas por meio de interfaces.',
    },
    projects: {
      eyebrow: '03 / Trabalhos selecionados',
      title: 'Projetos com propósito.',
      description:
        'Uma seleção de interfaces onde engenharia, usabilidade e contexto de negócio se encontram.',
      nextLab:
        'Próximos no laboratório: FinanceFlow, Stockly ERP e HelpDesk Pro.',
      live: 'Publicado',
      comingSoon: 'Em breve',
      repository: 'Repositório',
      liveDemo: 'Ver Projeto',
      technologies: 'Tecnologias utilizadas',
      previewLabel: 'Prévia da interface do portfólio',
      previewKicker: 'DESENVOLVEDOR FRONT-END',
      previewTitle: 'Interfaces para',
      previewAccent: 'negócios reais.',
      metrics: ['Projetos', 'Experiência', 'Foco'],
    },
    stack: {
      eyebrow: '04 / Tecnologias',
      title: 'As ferramentas por trás do trabalho.',
      description:
        'Uma stack prática, moldada pelo front-end moderno e por anos trabalhando próximo a sistemas de negócio.',
    },
    contact: {
      eyebrow: '05 / Vamos conversar',
      title: 'Tem um desafio?',
      titleAccent: 'Vamos torná-lo claro.',
      description:
        'Tem interesse em trabalharmos juntos ou conversar sobre uma oportunidade? Entre em contato pelo LinkedIn, email, GitHub ou WhatsApp.',
      cta: 'Iniciar uma conversa',
      contactVia: 'Contatar Gustavo via',
    },
    footer: {
      designed: 'Projetado e desenvolvido por Gustavo Lima.',
      built: 'Construído com Next.js, TypeScript e Sass.',
      backToTop: 'Voltar ao topo',
    },
  },
} as const
