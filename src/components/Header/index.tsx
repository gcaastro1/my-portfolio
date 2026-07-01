'use client'

import {
  ArrowDownRight,
  DownloadSimple,
  EnvelopeSimple,
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

const Header = () => {
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
            Available for Front-End opportunities
          </motion.div>

          <motion.h1 className={styles.hero__title} variants={itemAnimation}>
            Gustavo
            <span>Lima</span>
          </motion.h1>

          <motion.p className={styles.hero__role} variants={itemAnimation}>
            Front-End Developer
          </motion.p>

          <motion.p className={styles.hero__stack} variants={itemAnimation}>
            React.js <span>•</span> Next.js <span>•</span> TypeScript
          </motion.p>

          <motion.p className={styles.hero__description} variants={itemAnimation}>
            I build modern, responsive and business-oriented web applications
            with strong UI/UX foundations and experience in ERP systems, SQL
            and legacy application modernization.
          </motion.p>

          <motion.div className={styles.hero__actions} variants={itemAnimation}>
            <Link className={styles.hero__primaryAction} href="#projects">
              View Projects <ArrowDownRight size={18} weight="bold" />
            </Link>
            <Link
              className={styles.hero__secondaryAction}
              href="/Gustavo_Lima_CV_EN.docx"
              download
            >
              Download CV <DownloadSimple size={18} weight="bold" />
            </Link>
            <Link className={styles.hero__textAction} href="#contact">
              Contact Me <EnvelopeSimple size={17} />
            </Link>
          </motion.div>

          <motion.p className={styles.hero__cvNote} variants={itemAnimation}>
            Prefer Portuguese?{' '}
            <Link href="/Gustavo_Lima_CV_PT.docx" download>
              Download CV in PT-BR
            </Link>
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.terminal}
          initial={{ opacity: 0, scale: 0.94, rotate: 1.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.terminal__bar}>
            <span />
            <span />
            <span />
            <p>developer.ts</p>
          </div>
          <div className={styles.terminal__code} aria-label="Developer profile code">
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
                &quot;Front-End Developer&quot;
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
                &quot;Business interfaces &amp; ERP solutions&quot;
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
              <strong>Building for real users</strong>
              <span>UI craft meets business logic</span>
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
        <span>Scroll to explore</span>
        <i />
      </div>
    </section>
  )
}

export default Header
