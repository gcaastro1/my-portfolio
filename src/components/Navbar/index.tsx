'use client'

import Avatar from "./Avatar"
import ThemeSwitch from "./ThemeSwitcher"
import NavButtons from "./NavButtons"
import styles from "./style.module.scss"
import NavbarToggle from "./NavbarToggle"
import { useEffect, useState } from "react"

interface PageSizeProps {
    width: number | undefined
    height: number | undefined
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [size, setSize] = useState<PageSizeProps>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (size.width! > 768 && isOpen) {
            setIsOpen(false);
        }
    }, [size.width, isOpen]);

    const menuToggleHandler = () => {
        setIsOpen((p) => !p);
    };
    
    return (
        <div className={`${styles.navbar} background`}>
            <div className={styles.navbar__content}>
                <Avatar />
                <div className={`${styles.buttons} ${
                        isOpen && size.width! < 768 ? styles.isMenu : ""
                    } background`}>
                    <NavButtons />
                    <ThemeSwitch />
                </div>
                <NavbarToggle menuToggle={menuToggleHandler} isOpen={isOpen}/>
            </div>
        </div>
    )
}

export default Navbar