'use client'

import { ThemeContext } from '@/contexts/ThemeContext'
import { useContext, useEffect, useState } from 'react'
import styles from './style.module.scss'
import Card from './Card'

export interface ReposType {
  id: number
  name: string
  language: string
  description: string
  html_url: string
  homepage: string
}

const Jobs = () => {
  const { theme } = useContext(ThemeContext)
  const [repositories, setRepositories] = useState<ReposType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://api.github.com/users/gcaastro1/repos?sort=created&direction=desc`
      )

      const json = await data.json()

      setRepositories(json)

      return json
    }

    fetchData()
  }, [])

  return (
    <section className={`container ${theme} ${styles.jobs}`} id="works">
      <div className={styles.jobs__last}>
        <h1 className={`${styles.jobs__last__title} text`}>My last jobs.</h1>
      </div>
      <ul className={styles.jobs__list}>
        {repositories &&
          repositories.map((repository) => (
            <Card key={repository.id} job={repository} />
          ))}
      </ul>
    </section>
  )
}

export default Jobs
