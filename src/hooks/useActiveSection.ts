'use client'

import { useEffect, useState } from 'react'
import { SectionId, sectionIds } from '@/utils/sections'

export function useActiveSection(): [SectionId, (id: SectionId) => void] {
  const [active, setActive] = useState<SectionId>('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId)
        })
      },
      // faixa de 20% no meio da tela: seções altas também disparam
      { rootMargin: '-40% 0px -40% 0px' },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return [active, setActive]
}
