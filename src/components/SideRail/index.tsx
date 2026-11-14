'use client'

import {
  Briefcase,
  EnvelopeSimple,
  House,
  SquaresFour,
  Stack as StackIcon,
  User,
} from '@phosphor-icons/react'
import { useContext } from 'react'

import { LanguageContext } from '@/contexts/LanguageContext'
import { useActiveSection } from '@/hooks/useActiveSection'
import { translations } from '@/utils/i18n'
import { SectionId } from '@/utils/sections'
import { onAnchorClick } from '@/utils/smoothScroll'
import styles from './style.module.scss'

const icons: Record<SectionId, typeof House> = {
  home: House,
  about: User,
  experience: Briefcase,
  projects: SquaresFour,
  stack: StackIcon,
  contact: EnvelopeSimple,
}

const order: SectionId[] = [
  'home',
  'about',
  'experience',
  'projects',
  'stack',
  'contact',
]

const SideRail = () => {
  const { language } = useContext(LanguageContext)
  const copy = translations[language].nav
  const [active, setActive] = useActiveSection()

  return (
    <nav className={styles.rail} aria-label={copy.label}>
      {order.map((id) => {
        const Icon = icons[id]
        const isActive = active === id

        return (
          <a
            key={id}
            href={`#${id}`}
            className={`${styles.rail__link} ${
              isActive ? styles.rail__linkActive : ''
            }`}
            data-label={copy[id]}
            aria-label={copy[id]}
            aria-current={isActive ? 'true' : undefined}
            onClick={(event) => {
              onAnchorClick(event)
              setActive(id)
            }}
          >
            <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
          </a>
        )
      })}
    </nav>
  )
}

export default SideRail
