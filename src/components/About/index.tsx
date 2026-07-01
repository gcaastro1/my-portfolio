'use client'

import {
  ArrowsClockwise,
  Browser,
  Database,
  Palette,
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'

import SectionHeading from '@/components/SectionHeading'
import styles from './style.module.scss'

const highlights = [
  {
    title: 'Front-End Development',
    description: 'Responsive React and Next.js interfaces built for clarity.',
    icon: Browser,
    index: '01',
  },
  {
    title: 'Business Systems',
    description: 'ERP workflows, SQL routines, reports and business rules.',
    icon: Database,
    index: '02',
  },
  {
    title: 'UI/UX Background',
    description: 'Product thinking that connects user needs to clean execution.',
    icon: Palette,
    index: '03',
  },
  {
    title: 'Legacy Modernization',
    description: 'Safer, more usable experiences for business-critical software.',
    icon: ArrowsClockwise,
    index: '04',
  },
]

const About = () => {
  return (
    <section className={`${styles.about} section`} id="about">
      <div className="container">
        <SectionHeading
          eyebrow="01 / About"
          title="Complex systems, made human."
          description="I combine front-end engineering, product design and business context to build interfaces people can trust."
        />

        <div className={styles.about__layout}>
          <motion.div
            className={styles.about__copy}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p>
              I am a Front-End Developer with experience building and maintaining
              web applications and business systems using React.js, Next.js,
              TypeScript and Delphi/VCL.
            </p>
            <p>
              My background combines UI/UX design, modern front-end development
              and experience with ERP systems, SQL routines, reports, filters and
              business rules. I enjoy transforming complex workflows into clear,
              reliable and user-friendly interfaces.
            </p>
            <p>
              Currently, I work on the modernization and maintenance of corporate
              systems, improving usability, performance and stability in
              applications used by real business users.
            </p>
            <div className={styles.about__signature}>
              <span>Current focus</span>
              <strong>Modern interfaces for real-world operations.</strong>
            </div>
          </motion.div>

          <div className={styles.about__cards}>
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon

              return (
                <motion.article
                  className={styles.about__card}
                  key={highlight.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  <div className={styles.about__cardTop}>
                    <Icon size={24} weight="duotone" />
                    <span>{highlight.index}</span>
                  </div>
                  <h3>{highlight.title}</h3>
                  <p>{highlight.description}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
