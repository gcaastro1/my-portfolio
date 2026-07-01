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

import { ContactType, contactsData } from '@/utils/contactsData'
import styles from './style.module.scss'

const icons = {
  email: EnvelopeSimple,
  linkedin: LinkedinLogo,
  github: GithubLogo,
  whatsapp: WhatsappLogo,
} satisfies Record<ContactType, typeof EnvelopeSimple>

const Contacts = () => {
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
          <p className={styles.contact__eyebrow}>05 / Let&apos;s talk</p>
          <h2>
            Have a challenge?
            <span>Let&apos;s make it clear.</span>
          </h2>
          <p>
            Interested in working together or discussing an opportunity? Feel
            free to contact me through LinkedIn, email, GitHub or WhatsApp.
          </p>
          <Link className={styles.contact__emailCta} href="mailto:gcaastro1@gmail.com">
            Start a conversation
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
                  aria-label={`Contact Gustavo via ${contact.title}`}
                >
                  <span className={styles.contact__icon}>
                    <Icon size={24} weight="duotone" />
                  </span>
                  <span className={styles.contact__linkCopy}>
                    <strong>{contact.title}</strong>
                    <small>{contact.subtitle}</small>
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
