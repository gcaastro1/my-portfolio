import styles from './style.module.scss'
import { ReposType } from '.'
import Link from 'next/link'

interface Props {
  job: ReposType
}

const Card = ({ job }: Props) => {
  return (
    <li className={styles.card}>
      <div className={styles.card__header}>
        <h3>{job.name}</h3>
        {job.language && <span>{job.language}</span>}
      </div>

      <p>{job.description}</p>
      <div className={styles.card__links}>
        <Link href={job.html_url}>Repo</Link>
        {job.homepage && <Link href={job.homepage}>Deploy</Link>}
      </div>
    </li>
  )
}

export default Card
