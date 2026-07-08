'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './style.module.scss'

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Check if we are on a device with a pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)')
    if (!mediaQuery.matches) return // Do not show on touch devices

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      const target = e.target as HTMLElement
      const isInteractable = target.closest('a, button, [role="button"]') !== null
      setIsHovering(isInteractable)
    }

    document.documentElement.classList.add('hasCustomCursor')
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.classList.remove('hasCustomCursor')
    }
  }, [])

  // Don't render server-side to avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <motion.div
        className={styles.cursorDot}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      <motion.div
        className={styles.cursorRing}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(97, 218, 251, 0.15)' : 'transparent',
          borderColor: isHovering ? 'rgba(97, 218, 251, 0.4)' : 'var(--accent)',
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
      />
    </>
  )
}

export default CustomCursor
