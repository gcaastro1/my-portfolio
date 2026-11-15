import type Lenis from 'lenis'
import type { MouseEvent } from 'react'

import { anchorScrollTop } from './anchorScroll'

let instance: Lenis | null = null

export const setSmoothScroll = (lenis: Lenis | null) => {
  instance = lenis
}

export function scrollToHash(hash: string): void {
  const target = document.querySelector<HTMLElement>(hash)
  if (!target) return

  const top =
    hash === '#home'
      ? 0
      : anchorScrollTop(
          target.getBoundingClientRect().top,
          window.scrollY,
          parseFloat(getComputedStyle(target).paddingTop) || 0,
        )

  if (instance) {
    instance.scrollTo(top)
  } else {
    window.scrollTo({ top, behavior: 'smooth' })
  }
  window.history.pushState(null, '', hash)
}

export function onAnchorClick(event: MouseEvent<HTMLAnchorElement>): void {
  const hash = event.currentTarget.hash
  if (!hash) return
  event.preventDefault()
  scrollToHash(hash)
}
