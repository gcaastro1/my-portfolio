import styles from './style.module.scss'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'right'
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) => {
  return (
    <div
      className={`${styles.heading} ${
        align === 'right' ? styles.headingRight : ''
      }`}
    >
      <p className={styles.heading__eyebrow}>{eyebrow}</p>
      <h2 className={styles.heading__title}>{title}</h2>
      {description && <p className={styles.heading__description}>{description}</p>}
    </div>
  )
}

export default SectionHeading
