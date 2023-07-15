'use client'

import { Moon, Sun } from "@phosphor-icons/react"
import style from './style.module.scss'
import { useContext, useState } from "react"
import { ThemeContext } from "@/contexts/ThemeContext"
import { motion } from "framer-motion"

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

const ThemeSwitch = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const Icon = theme === 'light' ? Moon : Sun;

    const handleSwitch = () => {
        if(theme === 'dark') setTheme('light')
        if(theme === 'light') setTheme('dark')
    }

    return (
        <div className={style.switch} data-theme={theme} onClick={handleSwitch}>
            <motion.div className={style.switch__handle} layout transition={spring}>
                <Icon size={15}/>
            </motion.div>
        </div>
    )
}



export default ThemeSwitch