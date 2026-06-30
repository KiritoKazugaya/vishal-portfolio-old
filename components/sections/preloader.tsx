"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { profile } from "@/lib/data"

export function Preloader() {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    if (reduced) return
    document.body.style.overflow = "hidden"
    const start = performance.now()
    const duration = 1400
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      setPct(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    // Guaranteed dismissal via timers (rAF can be throttled in background tabs).
    const finish = setTimeout(() => {
      setPct(100)
      setDone(true)
    }, duration + 250)
    // Hard cutoff: remove entirely even if the exit animation is frozen.
    const hard = setTimeout(() => setGone(true), duration + 1600)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(finish)
      clearTimeout(hard)
      document.body.style.overflow = ""
    }
  }, [reduced])

  useEffect(() => {
    if (done) document.body.style.overflow = ""
  }, [done])

  if (reduced || gone) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 bg-grid opacity-[0.18] mask-fade-b" />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col items-center gap-6"
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {profile.role}
            </span>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-6xl">
              <span className="text-gradient">{profile.firstName}</span>
            </h1>
            <div className="mt-2 h-px w-56 overflow-hidden bg-border sm:w-72">
              <motion.div
                className="h-full bg-gradient-to-r from-accent-violet to-accent-cyan"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              {pct.toString().padStart(3, "0")}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
