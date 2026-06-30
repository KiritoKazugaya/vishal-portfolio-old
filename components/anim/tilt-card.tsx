"use client"

import { useRef, type ReactNode } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Max rotation in degrees. */
  max?: number
  /** Show a cursor-following glow highlight. */
  glow?: boolean
  glowColor?: string
}

/** 3D hover-tilt card with an optional cursor-following glow. */
export function TiltCard({
  children,
  className,
  max = 8,
  glow = true,
  glowColor = "var(--accent-violet)",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rotX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 150, damping: 18 })
  const rotY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 150, damping: 18 })
  const glowBackground = useTransform(
    () =>
      `radial-gradient(420px circle at ${px.get() * 100}% ${py.get() * 100}%, color-mix(in oklch, ${glowColor} 22%, transparent), transparent 60%)`
  )

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  function reset() {
    px.set(0.5)
    py.set(0.5)
  }

  if (reduced) {
    return (
      <div className={cn("relative", className)}>{children}</div>
    )
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className={cn("relative will-change-transform", className)}
    >
      {glow && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glowBackground }}
        />
      )}
      {children}
    </motion.div>
  )
}
