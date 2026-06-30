"use client"

import { useEffect, useRef } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

interface CountUpProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
  decimals?: number
}

/** Counts up to `value` the first time it scrolls into view. */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduced = useReducedMotion()

  const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (reduced || !inView) {
      if (inView) node.textContent = format(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        node.textContent = format(v)
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduced])

  return (
    <span ref={ref} className={className}>
      {format(0)}
    </span>
  )
}
