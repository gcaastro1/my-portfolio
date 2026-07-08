'use client'

import {
  ArrowUpRight,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  WhatsappLogo,
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useContext } from 'react'

import { LanguageContext } from '@/contexts/LanguageContext'
import { ContactType, contactsData } from '@/utils/contactsData'
import { translations } from '@/utils/i18n'
import styles from './style.module.scss'

const icons = {
  email: EnvelopeSimple,
  linkedin: LinkedinLogo,
  github: GithubLogo,
  whatsapp: WhatsappLogo,
} satisfies Record<ContactType, typeof EnvelopeSimple>

const Contacts = () => {
  const { language } = useContext(LanguageContext)
  const copy = translations[language].contact

  return (
    <section className={`${styles.contact} section`} id="contact">
      <div className={`${styles.contact__container} container`}>
        <motion.div
          className={styles.contact__intro}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.contact__eyebrow}>{copy.eyebrow}</p>
          <h2>
            {copy.title}
            <span>{copy.titleAccent}</span>
          </h2>
          <p>{copy.description}</p>
          <Link className={styles.contact__emailCta} href="mailto:gcaastro1@gmail.com">
            {copy.cta}
            <ArrowUpRight size={20} weight="bold" />
          </Link>
        </motion.div>

        <div className={styles.contact__links}>
          {contactsData.map((contact, index) => {
            const Icon = icons[contact.type]
            const isExternal = !contact.link.startsWith('mailto:')

            return (
              <motion.div
                key={contact.type}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
              >
                <Link
                  className={styles.contact__link}
                  href={contact.link}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  aria-label={`${copy.contactVia} ${contact.title[language]}`}
                >
                  <span className={styles.contact__icon}>
                    <Icon size={24} weight="duotone" />
                  </span>
                  <span className={styles.contact__linkCopy}>
                    <strong>{contact.title[language]}</strong>
                    <small>{contact.subtitle[language]}</small>
                  </span>
                  <ArrowUpRight
                    className={styles.contact__arrow}
                    size={20}
                    weight="bold"
                  />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Contacts
