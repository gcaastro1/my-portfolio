'use client'

import { ThemeContext } from '@/contexts/ThemeContext'
import projectsData from '@/utils/projectsData'
import { useContext } from 'react'
import styles from './style.module.scss'
import Card from './Card'

const Jobs = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <section className={`container ${theme} ${styles.jobs}`} id="works">
      <div className={styles.jobs__last}>
        <h1 className={`${styles.jobs__last__title} text`}>
          Featured Projects.
        </h1>
      </div>
      <ul className={styles.jobs__list}>
        {projectsData.map((project) => (
          <Card key={project.id} project={project} />
        ))}
      </ul>
    </section>
  )
}

export default Jobs
