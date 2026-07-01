'use client'

import { BracketsCurly, CheckCircle } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

import SectionHeading from '@/components/SectionHeading'
import stackData from '@/utils/stackData'
import styles from './style.module.scss'

const Stack = () => {
  return (
    <section className={`${styles.stack} section`} id="stack">
      <div className="container">
        <SectionHeading
          eyebrow="04 / Stack"
          title="The tools behind the work."
          description="A practical stack shaped by modern front-end delivery and years of working close to business systems."
          align="right"
        />

        <div className={styles.stack__grid}>
          {stackData.map((category, index) => (
            <motion.article
              className={styles.stack__card}
              key={category.title}
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
              <h3>{category.title}</h3>
              <ul>
                {category.technologies.map((technology) => (
                  <li key={technology}>
                    <CheckCircle size={15} weight="fill" />
                    {technology}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stack
