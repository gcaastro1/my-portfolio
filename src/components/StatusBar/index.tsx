'use client'

import {
  ArrowRight,
  Command,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
} from '@phosphor-icons/react'
import { useContext } from 'react'

import { LanguageContext } from '@/contexts/LanguageContext'
import { useLocalTime } from '@/hooks/useLocalTime'
import { contactsData } from '@/utils/contactsData'
import { OPEN_PALETTE_EVENT } from '@/utils/events'
import { translations } from '@/utils/i18n'
import { onAnchorClick } from '@/utils/smoothScroll'
import styles from './style.module.scss'

const socialIcons = {
  email: EnvelopeSimple,
  linkedin: LinkedinLogo,
  github: GithubLogo,
} as const

const socials = contactsData.filter(
  (contact): contact is typeof contact & { type: keyof typeof socialIcons } =>
    contact.type in socialIcons,
)

const StatusBar = () => {
  const { language } = useContext(LanguageContext)
  const copy = translations[language].statusBar
  const time = useLocalTime()

  return (
    <footer className={styles.status}>
      <span className={styles.status__dot} aria-hidden="true" />

      <p className={styles.status__place}>
        <span className={styles.status__basedIn}>{copy.basedIn} </span>
        {copy.place}
        <span className={styles.status__time}>
          <span aria-hidden="true"> · </span>
          {copy.localTime} <time>{time}</time>
        </span>
      </p>

      <div className={styles.status__actions}>
        <ul className={styles.status__social} aria-label={copy.social}>
          {socials.map((contact) => {
            const Icon = socialIcons[contact.type]
            const isExternal = !contact.link.startsWith('mailto:')

            return (
              <li key={contact.type}>
                <a
                  href={contact.link}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  aria-label={contact.title[language]}
                >
                  <Icon size={16} />
                </a>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className={styles.status__palette}
          onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
          aria-label={copy.palette}
        >
          <Command size={14} />
          <span>K</span>
        </button>

        <a className={styles.status__cta} href="#contact" onClick={onAnchorClick}>
          {copy.cta} <ArrowRight size={12} weight="bold" />
        </a>
      </div>
    </footer>
  )
}

export default StatusBar
