import NavButtons from "./NavButtons"
import styles from "./style.module.scss"
import Logo from "./Logo"

const Navbar = () => {
  
    return (
        <div className={`${styles.navbar} background`}>
            <div className={styles.navbar__content}>
                <Logo />
                <NavButtons />
            </div>
        </div>
    )
}

export default Navbar