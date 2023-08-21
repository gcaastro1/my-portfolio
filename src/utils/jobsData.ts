import { StaticImageData } from 'next/image'
import wheelsCover from '../assets/jobs/wheels_cover.png'

export interface JobData {
  id: number
  title: string
  img: StaticImageData
  description: string
  stacks: Array<string>
  repo: string
  repo2: string | null
  deploy: string
}

const jobsData: JobData[] = [
  {
    id: 1,
    title: 'Wheels on Sale',
    img: wheelsCover,
    description:
      'Mussum Ipsum, cacilds vidis litro abertis.  Per aumento de cachacis, eu reclamis. A ordem dos tratores não altera o pão duris. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Quem manda na minha terra sou euzis!',
    stacks: ['React', 'TypeScript'],
    repo: 'https://github.com/grupo27t14/front-wheels-on-sale',
    repo2: 'https://github.com/grupo27t14/back-wheels-on-sale',
    deploy: 'https://front-wheels-on-sale.vercel.app',
  },
  {
    id: 2,
    title: 'Wheels on Sale',
    img: wheelsCover,
    description:
      'Mussum Ipsum, cacilds vidis litro abertis.  Per aumento de cachacis, eu reclamis. A ordem dos tratores não altera o pão duris. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Quem manda na minha terra sou euzis!',
    stacks: ['React', 'TypeScript'],
    repo: 'https://github.com/grupo27t14/front-wheels-on-sale',
    repo2: 'https://github.com/grupo27t14/back-wheels-on-sale',
    deploy: 'https://front-wheels-on-sale.vercel.app',
  },
  {
    id: 3,
    title: 'Wheels on Sale',
    img: wheelsCover,
    description:
      'Mussum Ipsum, cacilds vidis litro abertis.  Per aumento de cachacis, eu reclamis. A ordem dos tratores não altera o pão duris. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Quem manda na minha terra sou euzis!',
    stacks: ['React', 'TypeScript'],
    repo: 'https://github.com/grupo27t14/front-wheels-on-sale',
    repo2: null,
    deploy: 'https://front-wheels-on-sale.vercel.app',
  },
  {
    id: 4,
    title: 'Wheels on Sale',
    img: wheelsCover,
    description:
      'Mussum Ipsum, cacilds vidis litro abertis.  Per aumento de cachacis, eu reclamis. A ordem dos tratores não altera o pão duris. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Quem manda na minha terra sou euzis!',
    stacks: ['React', 'TypeScript'],
    repo: 'https://github.com/grupo27t14/front-wheels-on-sale',
    repo2: null,
    deploy: 'https://front-wheels-on-sale.vercel.app',
  },
  {
    id: 5,
    title: 'Wheels on Sale',
    img: wheelsCover,
    description:
      'Mussum Ipsum, cacilds vidis litro abertis.  Per aumento de cachacis, eu reclamis. A ordem dos tratores não altera o pão duris. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Quem manda na minha terra sou euzis!',
    stacks: ['React', 'TypeScript'],
    repo: 'https://github.com/grupo27t14/front-wheels-on-sale',
    repo2: null,
    deploy: 'https://front-wheels-on-sale.vercel.app',
  },
  {
    id: 6,
    title: 'Wheels on Sale',
    img: wheelsCover,
    description:
      'Mussum Ipsum, cacilds vidis litro abertis.  Per aumento de cachacis, eu reclamis. A ordem dos tratores não altera o pão duris. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Quem manda na minha terra sou euzis!',
    stacks: ['React', 'TypeScript'],
    repo: 'https://github.com/grupo27t14/front-wheels-on-sale',
    repo2: null,
    deploy: 'https://front-wheels-on-sale.vercel.app',
  },
]

export default jobsData
