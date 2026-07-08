'use client'

import SectionHeading from '@/components/SectionHeading'
import { LanguageContext } from '@/contexts/LanguageContext'
import projectsData from '@/utils/projectsData'
import { translations } from '@/utils/i18n'
import { useContext } from 'react'
import ProjectCard from './Card'
import styles from './style.module.scss'

const Projects = () => {
  const { language } = useContext(LanguageContext)
  const copy = translations[language].projects
  const visibleProjects = projectsData.filter((project) => project.visible)

  return (
    <section className={`${styles.projects} section`} id="projects">
      <div className="container">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className={styles.projects__list}>
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <p className={styles.projects__note}>
          {copy.nextLab}
        </p>
      </div>
    </section>
  )
}

export default Projects
