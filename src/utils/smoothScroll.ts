import type Lenis from 'lenis'
import type { MouseEvent } from 'react'

let instance: Lenis | null = null

// Mantenha em sincronia com --titlebar-h (4.4rem = 44px com root 62.5%).
const TITLEBAR_OFFSET = 44

export const setSmoothScroll = (lenis: Lenis | null) => {
  instance = lenis
}

export function scrollToHash(hash: string): void {
  const target = document.querySelector<HTMLElement>(hash)
  if (!target) return

  if (instance) {
    instance.scrollTo(target, { offset: -TITLEBAR_OFFSET })
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
  window.history.pushState(null, '', hash)
}

export function onAnchorClick(event: MouseEvent<HTMLAnchorElement>): void {
  const hash = event.currentTarget.hash
  if (!hash) return
  event.preventDefault()
  scrollToHash(hash)
}
