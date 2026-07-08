'use client'

import {
  ArrowDownRight,
  DownloadSimple,
  EnvelopeSimple,
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

import { LanguageContext } from '@/contexts/LanguageContext'
import { translations } from '@/utils/i18n'
import mypic from '../../assets/mypic.jpeg'
import styles from './style.module.scss'

const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
}

const itemAnimation = {
  hidden: { opacity: 0, y: 10 },
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
    language === 'en'
      ? '/Gustavo_Lima_CV_EN.docx'
      : '/Gustavo_Lima_CV_PT.docx'
  const alternativeCv =
    language === 'en'
      ? '/Gustavo_Lima_CV_PT.docx'
      : '/Gustavo_Lima_CV_EN.docx'

  return (
    <section className={styles.hero} id="home">
      <div className={styles.hero__glow} aria-hidden="true" />
      <div className={`${styles.hero__container} container`}>
        <motion.div
          className={styles.hero__content}
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.hero__eyebrow} variants={itemAnimation}>
            <span />
            {copy.availability}
          </motion.div>

          <motion.h1 className={styles.hero__title} variants={itemAnimation}>
            Gustavo
            <span>Lima</span>
          </motion.h1>

          <motion.p className={styles.hero__role} variants={itemAnimation}>
            {copy.role}
          </motion.p>

          <motion.p className={styles.hero__stack} variants={itemAnimation}>
            React.js <span>•</span> Next.js <span>•</span> TypeScript
          </motion.p>

          <motion.p className={styles.hero__description} variants={itemAnimation}>
            {copy.description}
          </motion.p>

          <motion.div className={styles.hero__actions} variants={itemAnimation}>
            <Link className={styles.hero__primaryAction} href="#projects">
              {copy.viewProjects} <ArrowDownRight size={18} weight="bold" />
            </Link>
            <Link
              className={styles.hero__secondaryAction}
              href={currentCv}
              download
            >
              {copy.downloadCv} <DownloadSimple size={18} weight="bold" />
            </Link>
            <Link className={styles.hero__textAction} href="#contact">
              {copy.contactMe} <EnvelopeSimple size={17} />
            </Link>
          </motion.div>

          <motion.p className={styles.hero__cvNote} variants={itemAnimation}>
            {copy.cvNote}{' '}
            <Link href={alternativeCv} download>
              {copy.cvAlternative}
            </Link>
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.terminal}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <div className={styles.terminal__bar}>
            <span />
            <span />
            <span />
            <p>{copy.terminalFile}</p>
          </div>
          <div
            className={styles.terminal__code}
            aria-label={copy.terminalHeadline}
          >
            <p>
              <span className={styles.keyword}>const</span>{' '}
              <span className={styles.variable}>developer</span> = {'{'}
            </p>
            <p>
              &nbsp;&nbsp;name:{' '}
              <span className={styles.string}>&quot;Gustavo Lima&quot;</span>,
            </p>
            <p>
              &nbsp;&nbsp;role:{' '}
              <span className={styles.string}>
                &quot;{copy.terminalRole}&quot;
              </span>
              ,
            </p>
            <p>
              &nbsp;&nbsp;stack: [
              <span className={styles.string}>&quot;React.js&quot;</span>,{' '}
              <span className={styles.string}>&quot;Next.js&quot;</span>,{' '}
              <span className={styles.string}>&quot;TypeScript&quot;</span>],
            </p>
            <p>
              &nbsp;&nbsp;focus:{' '}
              <span className={styles.string}>
                &quot;{copy.terminalFocus}&quot;
              </span>
            </p>
            <p>{'}'}</p>
            <p className={styles.terminal__cursor}>
              <span>›</span> developer.build()
              <i aria-hidden="true" />
            </p>
          </div>

          <div className={styles.terminal__profile}>
            <div className={styles.terminal__avatar}>
              <Image
                src={mypic}
                alt="Gustavo Lima, Front-End Developer"
                priority
                sizes="72px"
              />
            </div>
            <div>
              <strong>{copy.terminalHeadline}</strong>
              <span>{copy.terminalSubtitle}</span>
            </div>
          </div>

          <motion.div
            className={styles.terminal__orbit}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
            aria-hidden="true"
          >
            <span />
          </motion.div>
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
