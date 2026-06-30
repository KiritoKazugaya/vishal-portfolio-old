"use client"

import { motion, useReducedMotion } from "motion/react"
import { type CSSProperties, type ReactNode } from "react"

type Direction = "up" | "down" | "left" | "right" | "none"

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
}

interface RevealProps {
  children: ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  once?: boolean
  amount?: number
  className?: string
  style?: CSSProperties
  id?: string
}

/** Scroll-triggered reveal. Honors prefers-reduced-motion (renders static). */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  once = true,
  amount = 0.3,
  className,
  style,
  id,
}: RevealProps) {
  const reduced = useReducedMotion()
  if (reduced)
    return (
      <div className={className} style={style} id={id}>
        {children}
      </div>
    )

  const o = offset[direction]
  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, ...o }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Staggered container — pair with <RevealItem> children. */
export function RevealGroup({
  children,
  stagger = 0.08,
  delay = 0,
  className,
}: {
  children: ReactNode
  stagger?: number
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode
  className?: string
  direction?: Direction
}) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  const o = offset[direction]
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...o },
        show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  )
}
