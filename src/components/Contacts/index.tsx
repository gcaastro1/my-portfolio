import { contactsData } from '@/utils/contactsData'
import styles from './style.module.scss'
import Image from 'next/image'

const Contacts = () => {
  const data = contactsData

  return (
    <section className={styles.contacts}>
      <div className={`${styles.contacts__container} container`}>
        <div className={styles.about__content}>
          <h1 className={styles.contacts__content__title}>Contacts.</h1>
          <p className={styles.contacts__content__text}>
            Let&apos;s talk and develop solutions for your company, together!
          </p>
        </div>
        <ul>
          {data.map((contact, i) => (
            <li key={i}>
              <Image alt={`${contact.title} logo`} src={contact.img} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Contacts
