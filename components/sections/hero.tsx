"use client"

import { motion, useReducedMotion } from "motion/react"
import { ArrowDown, ArrowUpRight, FileDown } from "lucide-react"
import { HeroCanvas } from "@/components/three/hero-canvas"
import { SplitText } from "@/components/anim/split-text"
import { Magnetic } from "@/components/anim/magnetic"
import { profile } from "@/lib/data"
import { scrollToHash } from "@/components/providers/smooth-scroll"

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="top"
      className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-20 sm:px-8"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.10] mask-fade-b" />
        <div className="absolute left-1/2 top-[52%] h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 opacity-90">
          <HeroCanvas />
        </div>
        {/* Vignette + darkening so the orb reads as a contained glow, not a flood */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_60%_at_50%_46%,transparent_0%,var(--background)_74%)]" />
        <div className="absolute inset-0 bg-background/35" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative flex w-full max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 1.7, duration: 0.6 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/30 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-emerald opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accent-emerald" />
          </span>
          {profile.available}
        </motion.div>

        <h1 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-tight [filter:drop-shadow(0_4px_24px_rgba(0,0,0,0.55))]">
          <SplitText text="Vishal Naveen" type="words" className="text-gradient" delay={1.8} />
          <br />
          <SplitText text="Akkala" type="words" className="text-gradient-accent" delay={2.05} />
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 2.3, duration: 0.7 }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-xl"
        >
          {profile.identity}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 2.5, duration: 0.7 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Magnetic strength={0.35}>
            <button
              onClick={() => scrollToHash("#projects")}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-violet to-accent-blue px-6 py-3.5 text-sm font-medium text-white shadow-[0_10px_40px_-12px_var(--accent-violet)] transition-transform"
            >
              View my work
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="/resume/Vishal-Naveen-Akkala-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-muted/60"
            >
              <FileDown className="size-4" />
              Download résumé
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll cue */}
      {!reduced && (
        <motion.button
          onClick={() => scrollToHash("#about")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.9, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
          aria-label="Scroll to about"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="size-4" />
          </motion.span>
        </motion.button>
      )}
    </section>
  )
}
