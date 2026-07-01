'use client'

import Image from 'next/image'
import mypic from '../../assets/mypic.jpeg'

import styles from './style.module.scss'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { ThemeContext } from '@/contexts/ThemeContext'
import {
  ArrowDown,
  DownloadSimple,
  EnvelopeSimple,
} from '@phosphor-icons/react'
import Link from 'next/link'

const spinTransition = {
  repeat: Infinity,
  duration: 2,
  ease: 'linear',
}

const Header = () => {
  const { theme } = useContext(ThemeContext)

  const scroll = () => {
    document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={`${styles.header} container ${theme}`} id="header">
      <div className={styles.header__avatar}>
        <motion.span
          className={`${styles.header__avatar__circle} border`}
          animate={{ rotate: 360 }}
          transition={spinTransition}
        />
        <Image src={mypic} alt={'Picture of author'} priority={true} />
      </div>
      <motion.div
        className={styles.header__intro}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={`${styles.header__title} text`}>Gustavo Lima</h1>
        <p className={`${styles.header__role} text`}>
          Front-End Developer | React.js, Next.js &amp; TypeScript
        </p>
        <p className={`${styles.header__description} text`}>
          Building modern web applications, business interfaces and ERP-focused
          solutions with strong UI/UX foundations.
        </p>
      </motion.div>

      <div className={styles.header__actions}>
        <button
          className={`${styles.header__button} buttonbg`}
          type="button"
          onClick={scroll}
        >
          View Projects <ArrowDown size={16} />
        </button>
        <Link
          className={`${styles.header__button} ${styles.header__buttonSecondary} text border`}
          href="#contacts"
        >
          Contact Me <EnvelopeSimple size={16} />
        </Link>
      </div>

      <div className={`${styles.header__cv} text`}>
        <span>
          <DownloadSimple size={16} /> Download CV
        </span>
        <Link href="/Gustavo_Lima_CV_PT.docx" download>
          Português (DOCX)
        </Link>
        <Link href="/Gustavo_Lima_CV_EN.docx" download>
          English (DOCX)
        </Link>
      </div>
    </div>
  )
}

export default Header
