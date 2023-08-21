'use client'

import { ThemeContext } from '@/contexts/ThemeContext'
import { useContext } from 'react'
import styles from './style.module.scss'
import Carousel from './Carousel'

const Jobs = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <section className={`container ${theme} ${styles.jobs}`}>
      <div className={styles.jobs__last}>
        <h1 className={`${styles.jobs__last__title} text`}>My last jobs.</h1>
      </div>

      <Carousel />
    </section>
  )
}

export default Jobs
