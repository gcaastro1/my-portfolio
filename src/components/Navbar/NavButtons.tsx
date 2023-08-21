'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import styles from './style.module.scss'
import ThemeSwitch from './ThemeSwitcher'
import NavbarToggle from './NavbarToggle'

interface PageSizeProps {
  width: number | undefined
  height: number | undefined
}

const navItems = [
  {
    id: 1,
    title: 'Home',
  },
  {
    id: 2,
    title: 'About',
  },
  {
    id: 3,
    title: 'Work',
  },
  {
    id: 4,
    title: 'Contact',
  },
]

const NavButtons = () => {
  const [active, setActive] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [size, setSize] = useState<PageSizeProps>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (size.width! > 768 && isOpen) {
      setIsOpen(false)
    }
  }, [size.width, isOpen])

  const menuToggleHandler = () => {
    setIsOpen((p) => !p)
  }

  return (
    <>
      <span className={isOpen && size.width! < 768 ? styles.isMenu : ''}></span>
      <div
        className={`${styles.buttons} ${
          isOpen && size.width! < 768 ? styles.isMenu : ''
        } background`}
      >
        <motion.div className={`${styles.buttons__link} background`}>
          {navItems.map((item) => (
            <button
              className={styles.buttons__link__default}
              key={`button-${item.id}`}
              onClick={() => setActive(item.id)}
            >
              <span className={active == item.id ? 'text__active' : 'text'}>
                {item.title}
              </span>
              {active == item.id && (
                <motion.div
                  layoutId="nav-bg"
                  className={`${styles.buttons__link__default__active} reversebg`}
                ></motion.div>
              )}
            </button>
          ))}
        </motion.div>
        <ThemeSwitch />
      </div>
      <NavbarToggle menuToggle={menuToggleHandler} isOpen={isOpen} />
    </>
  )
}

export default NavButtons
