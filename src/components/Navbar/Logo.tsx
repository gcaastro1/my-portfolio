import Link from 'next/link'
import styles from './style.module.scss'

const Logo = () => {
  return (
    <Link className={styles.logo} href="#home" aria-label="Go to home">
      <span className={styles.logo__mark}>GL</span>
      <span className={styles.logo__text}>
        Gustavo
        <strong>Lima</strong>
      </span>
    </Link>
  )
}

export default Logo
