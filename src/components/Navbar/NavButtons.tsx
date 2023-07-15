'use client'

import { useContext, useState } from "react"
import { motion } from "framer-motion"

import style from "./style.module.scss"
import { ThemeContext } from "@/contexts/ThemeContext"

const navItems = [
    {
        id: 1,
        title: "Home"
    },
    {
        id: 2,
        title: "About"
    },
    {
        id: 3,
        title: "Work"
    },
    {
        id: 4,
        title: "Contact"
    },
]

const NavButtons = () => {
    const [active, setActive] = useState(1)

    return (
        <motion.div className={`${style.buttons__link} background`}>
            { 
                navItems.map((item) => (
                    <button className={style.buttons__link__default} key={`button-${item.id}`} onClick={() => setActive(item.id)}>                       
                        <span className={active == item.id ? 'text__active' : 'text'}>
                            {item.title}
                        </span>
                        {active == item.id && (
                            <motion.div layoutId="nav-bg" className={`${style.buttons__link__default__active} reversebg`}> 
                            </motion.div>
                        )}
                    </button>
                ))
            }            
        </motion.div>
    )
}

export default NavButtons