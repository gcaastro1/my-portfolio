'use client'

import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { useEffect } from 'react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { setSmoothScroll } from '@/utils/smoothScroll'

const SmoothScroll = () => {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    if (reducedMotion) return

    const lenis = new Lenis({ lerp: 0.1 })
    setSmoothScroll(lenis)

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    })

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      setSmoothScroll(null)
    }
  }, [reducedMotion])

  return null
}

export default SmoothScroll
