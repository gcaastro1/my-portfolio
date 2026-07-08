'use client'

import { ArrowUpRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useContext } from 'react'

import SectionHeading from '@/components/SectionHeading'
import { LanguageContext } from '@/contexts/LanguageContext'
import experienceData from '@/utils/experienceData'
import { translations } from '@/utils/i18n'
import styles from './style.module.scss'

const Experience = () => {
  const { language } = useContext(LanguageContext)
  const copy = translations[language].experience

  return (
    <section className={`${styles.experience} section`} id="experience">
      <div className="container">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          align="right"
        />

        <div className={styles.experience__timeline}>
          {experienceData.map((experience, index) => (
            <motion.article
              className={styles.experience__item}
              key={`${experience.company}-${experience.period}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
            >
              <div className={styles.experience__marker}>
                <span>0{index + 1}</span>
              </div>
              <div className={styles.experience__card}>
                <div className={styles.experience__heading}>
                  <div>
                    <p className={styles.experience__company}>
                      {experience.company}
                    </p>
                    <h3>{experience.role[language]}</h3>
                  </div>
                  <time>{experience.period[language]}</time>
                </div>
                <ul>
                  {experience.highlights[language].map((highlight) => (
                    <li key={highlight}>
                      <ArrowUpRight size={14} weight="bold" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
