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
  status: 'live' | 'completed'
  visible: boolean
}

// Os 4 projetos do perfil do LinkedIn (descrições condensadas para o card) e o próprio portfólio.
const projectsData: ProjectData[] = [
  {
    id: 1,
    title: 'Disputa VM',
    label: { en: 'Nov 2026 – Present', pt: 'nov. 2026 – o momento' },
    description: {
      en: 'Weekly music competition web app used by a group of friends, with a weekly ranking, missions, achievements and a profile for each participant. It integrates Last.fm and Spotify, uses a signed HttpOnly cookie session and has automated tests for the scoring rules and security.',
      pt: 'Aplicação web de competição musical semanal usada por um grupo de amigos, com ranking semanal, missões, conquistas e perfil de cada participante. Integra Last.fm e Spotify, usa sessão por cookie HttpOnly assinado e tem testes automatizados das regras de pontuação e da segurança.',
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    deploy: 'https://disputa-vm-xldt.vercel.app',
    image: '/projects/disputa-vm.png',
    status: 'live',
    visible: true,
  },
  {
    id: 2,
    title: 'DropMailer',
    label: { en: 'Aug 2023 – Jul 2026', pt: 'ago. 2023 – jul. 2026' },
    description: {
      en: 'Temporary email generator built with Angular 18 and TypeScript. It creates a disposable address instantly and shows the inbox in real time, without reloading the page, to keep your main email safe from spam.',
      pt: 'Gerador de e-mails temporários feito em Angular 18 e TypeScript. Cria um endereço descartável na hora e mostra a caixa de entrada em tempo real, sem recarregar a página, para proteger o e-mail principal de spam.',
    },
    stack: ['Angular 18', 'TypeScript', 'Tailwind CSS', 'Apollo GraphQL'],
    repository: 'https://github.com/gcaastro1/tempmail-gen',
    deploy: 'https://dropmailer-gen.vercel.app/',
    image: '/projects/dropmailer.png',
    status: 'live',
    visible: true,
  },
  {
    id: 3,
    title: 'MyConts',
    label: { en: 'May 2023 – Jun 2023', pt: 'mai. 2023 – jun. 2023' },
    description: {
      en: 'A contacts book app: users create an account, then add, edit and delete contacts. The back end uses NestJS with JWT authentication, Swagger, Zod and Prisma on PostgreSQL. The front end uses Next.js, React Hook Form and Tailwind CSS.',
      pt: 'Agenda de contatos: o usuário cria uma conta e cadastra, edita e exclui contatos. O back-end usa NestJS com autenticação JWT, Swagger, Zod e Prisma com PostgreSQL. O front-end usa Next.js, React Hook Form e Tailwind CSS.',
    },
    stack: ['NestJS', 'Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    status: 'completed',
    visible: true,
  },
  {
    id: 4,
    title: 'Startemy',
    label: { en: 'Jan 2023', pt: 'jan. 2023' },
    description: {
      en: 'A project where users create an account, buy technology courses and watch the courses they bought from their profile.',
      pt: 'Projeto em que o usuário cria uma conta, compra cursos de tecnologia e assiste aos cursos comprados pelo perfil.',
    },
    stack: ['React', 'TypeScript', 'JSON Server'],
    repository: 'https://github.com/gcaastro1/startemy-project',
    image: '/projects/startemy.png',
    status: 'completed',
    visible: true,
  },
  {
    id: 5,
    title: 'Portfolio Website',
    label: { en: '2026', pt: '2026' },
    description: {
      en: 'Personal portfolio with an IDE-style layout, built with Next.js, TypeScript, Sass, Framer Motion and Three.js. It has light and dark themes, English and Portuguese, and a command menu (Ctrl+K).',
      pt: 'Portfólio pessoal com layout inspirado em editor de código, feito com Next.js, TypeScript, Sass, Framer Motion e Three.js. Tem tema claro e escuro, inglês e português e menu de comandos (Ctrl+K).',
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Sass', 'Framer Motion', 'Three.js'],
    repository: 'https://github.com/gcaastro1/my-portfolio',
    deploy: 'https://gustavolima.vercel.app',
    image: '/projects/portfolio.png',
    status: 'live',
    visible: true,
  },
]

export default projectsData
