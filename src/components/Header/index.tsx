'use client'

import Image from 'next/image'
import mypic from "../../assets/mypic.jpeg"

import styles from "./style.module.scss"
import { motion } from 'framer-motion'
import { useContext } from 'react'
import { ThemeContext } from '@/contexts/ThemeContext'

const spinTransition = {
    repeat: Infinity,
    duration: 2,
    ease: "linear"
}

const Header = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <div className={`${styles.header} container ${theme}`}>
            <div className={styles.header__avatar}>
                <motion.span 
                    className={`${styles.header__avatar__circle} border`} 
                    animate={ {rotate: 360} }
                    transition={spinTransition}
                />
                <Image src={mypic} alt={'Picture of author'} priority={true}/>
            </div>
        </div>
    )
}

export default Header