import NavButtons from './NavButtons'
import styles from './style.module.scss'
import Logo from './Logo'

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className={styles.navbar__content}>
        <Logo />
        <NavButtons />
      </div>
    </header>
  )
}

export default Navbar
