'use client'

import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useContext } from 'react'

import { LanguageContext } from '@/contexts/LanguageContext'
import { translations } from '@/utils/i18n'
import { ProjectData } from '@/utils/projectsData'
import ProjectPreview from './ProjectPreview'
import styles from './style.module.scss'

interface ProjectCardProps {
  project: ProjectData
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { language } = useContext(LanguageContext)
  const copy = translations[language].projects

  return (
    <motion.article
      className={styles.project}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65 }}
    >
      <div className={styles.project__visual}>
        <ProjectPreview />
      </div>

      <div className={styles.project__content}>
        <div className={styles.project__meta}>
          <span>{project.label[language]}</span>
          <span className={styles.project__status}>
            <i />{' '}
            {project.status === 'live' ? copy.live : copy.comingSoon}
          </span>
        </div>

        <h3>{project.title}</h3>
        <p>{project.description[language]}</p>

        <ul className={styles.project__stack} aria-label={copy.technologies}>
          {project.stack.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        <div className={styles.project__links}>
          {project.repository && (
            <Link href={project.repository} target="_blank" rel="noreferrer">
              <GithubLogo size={18} weight="bold" />
              {copy.repository}
            </Link>
          )}
          {project.deploy && (
            <Link href={project.deploy} target="_blank" rel="noreferrer">
              {copy.liveDemo}
              <ArrowUpRight size={18} weight="bold" />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
