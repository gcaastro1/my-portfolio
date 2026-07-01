import Link from 'next/link'

import styles from './style.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer__container} container`}>
        <div>
          <p>Designed and developed by Gustavo Lima.</p>
          <span>Built with Next.js, TypeScript and Sass.</span>
        </div>
        <Link href="#home" aria-label="Back to top">
          Back to top <span aria-hidden="true">↑</span>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
