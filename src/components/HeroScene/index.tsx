'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import SceneBoundary from './SceneBoundary'
import styles from './style.module.scss'

const Scene = dynamic(() => import('./Scene'), { ssr: false })

const HeroScene = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [failed, setFailed] = useState(false)
  const [inView, setInView] = useState(true)
  const wrapper = useRef<HTMLDivElement>(null)
  const enabled = isDesktop && !reducedMotion && !failed

  useEffect(() => {
    const el = wrapper.current
    if (!enabled || !el) return
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [enabled])

  if (!enabled) return null

  return (
    <div ref={wrapper} className={styles.scene} aria-hidden="true">
      <SceneBoundary>
        <Scene active={inView} onFail={() => setFailed(true)} />
      </SceneBoundary>
    </div>
  )
}

export default HeroScene
