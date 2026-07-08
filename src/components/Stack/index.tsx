'use client'

import { BracketsCurly, CheckCircle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useContext } from 'react'

import SectionHeading from '@/components/SectionHeading'
import { LanguageContext } from '@/contexts/LanguageContext'
import { translations } from '@/utils/i18n'
import stackData from '@/utils/stackData'
import styles from './style.module.scss'

const Stack = () => {
  const { language } = useContext(LanguageContext)
  const copy = translations[language].stack

  return (
    <section className={`${styles.stack} section`} id="stack">
      <div className="container">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          align="right"
        />

        <div className={styles.stack__grid}>
          {stackData.map((category, index) => (
            <motion.article
              className={styles.stack__card}
              key={category.code}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ y: -5 }}
            >
              <div className={styles.stack__header}>
                <BracketsCurly size={22} weight="duotone" />
                <span>{category.code}</span>
              </div>
              <h3>{category.title[language]}</h3>
              <ul>
                {category.technologies.map((technology) => {
                  const label =
                    typeof technology === 'string'
                      ? technology
                      : technology[language]

                  return (
                    <li key={label}>
                      <CheckCircle size={15} weight="fill" />
                      {label}
                    </li>
                  )
                })}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stack
