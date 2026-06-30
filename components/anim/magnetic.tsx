"use client"

import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

interface MagneticProps {
  children: ReactNode
  className?: string
  /** How far the element drifts toward the cursor (px of pull). */
  strength?: number
}

/** Wraps children so they magnetically drift toward the pointer on hover. */
export function Magnetic({ children, className, strength = 0.4 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 170, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 170, damping: 15, mass: 0.4 })

  if (reduced) return <div className={className}>{children}</div>

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn("inline-flex will-change-transform", className)}
    >
      {children}
    </motion.div>
  )
}
