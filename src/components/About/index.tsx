'use client'

import {
  ArrowsClockwise,
  Browser,
  Database,
  Palette,
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useContext } from 'react'

import SectionHeading from '@/components/SectionHeading'
import { LanguageContext } from '@/contexts/LanguageContext'
import { translations } from '@/utils/i18n'
import styles from './style.module.scss'

const highlights = [
  {
    icon: Browser,
    index: '01',
  },
  {
    icon: Database,
    index: '02',
  },
  {
    icon: Palette,
    index: '03',
  },
  {
    icon: ArrowsClockwise,
    index: '04',
  },
]

const About = () => {
  const { language } = useContext(LanguageContext)
  const copy = translations[language].about

  return (
    <section className={`${styles.about} section`} id="about">
      <div className="container">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className={styles.about__layout}>
          <motion.div
            className={styles.about__copy}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className={styles.about__signature}>
              <span>{copy.currentFocus}</span>
              <strong>{copy.signature}</strong>
            </div>
          </motion.div>

          <div className={styles.about__cards}>
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon
              const content = copy.highlights[index]

              return (
                <motion.article
                  className={styles.about__card}
                  key={content.title}
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
                  <h3>{content.title}</h3>
                  <p>{content.description}</p>
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
