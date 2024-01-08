import { contactsData } from '@/utils/contactsData'
import styles from './style.module.scss'
import Image from 'next/image'
import Link from 'next/link'

const Contacts = () => {
  const data = contactsData

  return (
    <section className={styles.contacts} id='contacts'>
      <div className={`${styles.contacts__container} container`}>
        <div className={styles.about__content}>
          <h1 className={styles.contacts__content__title}>Contacts.</h1>
          <p className={styles.contacts__content__text}>
            Let&apos;s talk and develop solutions for your company, together!
          </p>
        </div>
        <ul className={styles.contacts__list}>
          {data.map((contact, i) => (
            <li key={i} className={styles.contacts__list__item}>
              <Link
                className={styles.contacts__list__item__icon}
                style={{ backgroundColor: contact.bg }}
                href={contact.link}
                target='_blank'
              >
                <Image alt={`${contact.title} logo`} src={contact.img} />
              </Link>
              <div className={styles.contacts__list__item__text}>
                <h3>{contact.title}</h3>
                <p>{contact.subtitle}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Contacts
