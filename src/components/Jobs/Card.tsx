import styles from './style.module.scss'
import Link from 'next/link'
import { ProjectData } from '@/utils/projectsData'

interface Props {
  project: ProjectData
}

const Card = ({ project }: Props) => {
  return (
    <li className={styles.card}>
      <div className={styles.card__header}>
        <h3>{project.title}</h3>
      </div>

      <p>{project.description}</p>
      <ul className={styles.card__stack} aria-label="Technologies used">
        {project.stack.map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <div className={styles.card__links}>
        <Link href={project.repository} target="_blank" rel="noreferrer">
          Repository
        </Link>
        <Link href={project.deploy} target="_blank" rel="noreferrer">
          Live project
        </Link>
      </div>
    </li>
  )
}

export default Card
