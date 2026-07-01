'use client'

import { ArrowUpRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

import SectionHeading from '@/components/SectionHeading'
import experienceData from '@/utils/experienceData'
import styles from './style.module.scss'

const Experience = () => {
  return (
    <section className={`${styles.experience} section`} id="experience">
      <div className="container">
        <SectionHeading
          eyebrow="02 / Experience"
          title="Built in the real world."
          description="From product design to teaching and business-critical systems, each role sharpened how I solve problems through interfaces."
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
                    <h3>{experience.role}</h3>
                  </div>
                  <time>{experience.period}</time>
                </div>
                <ul>
                  {experience.highlights.map((highlight) => (
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
