'use client'

import { useEffect, useState } from 'react'
import { formatLocalTime } from '@/utils/localTime'

export function useLocalTime(): string {
  const [time, setTime] = useState('--:--')

  useEffect(() => {
    const tick = () => setTime(formatLocalTime(new Date()))
    tick()
    const id = window.setInterval(tick, 15000)
    return () => window.clearInterval(id)
  }, [])

  return time
}
