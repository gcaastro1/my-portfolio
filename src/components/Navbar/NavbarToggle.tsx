'use client'

import { motion } from "framer-motion"
import style from "./style.module.scss"
import { List, X } from "@phosphor-icons/react"

interface ToggleProps {
    menuToggle: () => void
    isOpen: boolean
}

const NavbarToggle = ({ menuToggle, isOpen }: ToggleProps) => {
    const Icon = isOpen ? X : List 

    return (
        <motion.div className={style.toggle} onClick={() => menuToggle()} whileTap={{ scale: 0.6 }}>
            <Icon size={32} className="text"/>
        </motion.div>
    )
}

export default NavbarToggle