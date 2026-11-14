'use client'

import {
  ArrowDownRight,
  DownloadSimple,
  EnvelopeSimple,
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useContext } from 'react'

import HeroScene from '@/components/HeroScene'
import { LanguageContext } from '@/contexts/LanguageContext'
import { translations } from '@/utils/i18n'
import { onAnchorClick } from '@/utils/smoothScroll'
import styles from './style.module.scss'

const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
}

const itemAnimation = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const Header = () => {
  const { language } = useContext(LanguageContext)
  const copy = translations[language].hero
  const currentCv =
    language === 'en' ? '/Gustavo_Lima_CV_EN.docx' : '/Gustavo_Lima_CV_PT.docx'
  const alternativeCv =
    language === 'en' ? '/Gustavo_Lima_CV_PT.docx' : '/Gustavo_Lima_CV_EN.docx'

  return (
    <section className={styles.hero} id="home">
      <div className={styles.hero__glow} aria-hidden="true" />
      <HeroScene />

      <div className={`${styles.hero__container} container`}>
        <motion.div
          className={styles.hero__content}
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
        >
          <motion.p className={styles.hero__eyebrow} variants={itemAnimation}>
            <span aria-hidden="true" />
            {copy.availability}
          </motion.p>

          <motion.h1 className={styles.hero__title} variants={itemAnimation}>
            {copy.greeting.pre} <em>{copy.greeting.accent}</em>{' '}
            {copy.greeting.post}
          </motion.h1>

          <motion.p className={styles.hero__description} variants={itemAnimation}>
            {copy.description}
          </motion.p>

          <motion.div className={styles.hero__actions} variants={itemAnimation}>
            <a
              className={styles.hero__primaryAction}
              href="#projects"
              onClick={onAnchorClick}
            >
              {copy.viewProjects} <ArrowDownRight size={18} weight="bold" />
            </a>
            <a className={styles.hero__secondaryAction} href={currentCv} download>
              {copy.downloadCv} <DownloadSimple size={18} weight="bold" />
            </a>
            <a
              className={styles.hero__textAction}
              href="#contact"
              onClick={onAnchorClick}
            >
              {copy.contactMe} <EnvelopeSimple size={17} />
            </a>
          </motion.div>

          <motion.p className={styles.hero__cvNote} variants={itemAnimation}>
            {copy.cvNote}{' '}
            <a href={alternativeCv} download>
              {copy.cvAlternative}
            </a>
          </motion.p>
        </motion.div>
      </div>

      <div className={styles.hero__scroll} aria-hidden="true">
        <span>{copy.scroll}</span>
        <i />
      </div>
    </section>
  )
}

export default Header
