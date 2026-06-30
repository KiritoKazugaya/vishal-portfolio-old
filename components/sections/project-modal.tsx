"use client"

import { useEffect } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { X, Lock, ArrowRight, Target, AlertTriangle, Trophy, GraduationCap, ExternalLink } from "lucide-react"
import { Github } from "@/components/ui/brand-icons"
import { CountUp } from "@/components/anim/count-up"
import type { Project } from "@/lib/types"
import { cn } from "@/lib/utils"

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-start justify-center overflow-y-auto p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Close case study"
            className="fixed inset-0 cursor-default bg-background/80 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.article
            initial={reduced ? false : { opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative my-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
          >
            {/* Header */}
            <header className="relative overflow-hidden border-b border-border/60 p-6 sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full opacity-40 blur-3xl"
                style={{ background: `radial-gradient(circle, ${project.accent}, transparent 70%)` }}
              />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide"
                      style={{ borderColor: `color-mix(in oklch, ${project.accent} 45%, transparent)`, color: project.accent }}
                    >
                      {project.domain}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground">{project.tagline}</p>
                </div>
                <button
                  onClick={onClose}
                  className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-background/60 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* tech */}
              <div className="relative mt-5 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </header>

            {/* Body */}
            <div className="space-y-8 p-6 sm:p-8">
              {/* metrics */}
              {project.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/40 sm:grid-cols-3">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="bg-card p-4 text-center">
                      <div className="font-display text-xl font-semibold sm:text-2xl" style={{ color: project.accent }}>
                        <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} />
                      </div>
                      <div className="mt-1 text-[11px] leading-tight text-muted-foreground">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <Block icon={<Target className="size-4" />} label="Problem" accent={project.accent}>
                {project.problem}
              </Block>
              <Block icon={<ArrowRight className="size-4" />} label="Goal" accent={project.accent}>
                {project.goal}
              </Block>

              {/* architecture */}
              <div>
                <Label accent={project.accent}>Architecture</Label>
                <div className="mt-4 flex flex-col gap-2 lg:flex-row lg:items-stretch">
                  {project.architecture.map((step, i) => (
                    <div key={step.title} className="flex flex-1 items-stretch gap-2">
                      <motion.div
                        initial={reduced ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.12, duration: 0.4 }}
                        className="flex-1 rounded-xl border border-border/60 bg-muted/20 p-3"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="grid size-5 place-items-center rounded-full font-mono text-[10px] font-bold text-background"
                            style={{ background: project.accent }}
                          >
                            {i + 1}
                          </span>
                          <span className="font-display text-sm font-semibold">{step.title}</span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
                      </motion.div>
                      {i < project.architecture.length - 1 && (
                        <ArrowRight className="hidden size-4 shrink-0 self-center text-muted-foreground/50 lg:block" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* process */}
              <div>
                <Label accent={project.accent}>Process</Label>
                <ol className="mt-3 space-y-2">
                  {project.process.map((p, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="font-mono text-xs" style={{ color: project.accent }}>
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Block icon={<AlertTriangle className="size-4" />} label="Challenges" accent={project.accent}>
                  {project.challenges}
                </Block>
                <Block icon={<Trophy className="size-4" />} label="Result" accent={project.accent}>
                  {project.result}
                </Block>
              </div>

              <div className="rounded-2xl border border-border/60 bg-muted/20 p-5">
                <Label accent={project.accent}>
                  <span className="flex items-center gap-2">
                    <GraduationCap className="size-4" /> What I learned
                  </span>
                </Label>
                <p className="mt-2 text-sm italic leading-relaxed text-foreground/90">“{project.learned}”</p>
              </div>
            </div>

            {/* Footer */}
            <footer className="flex items-center justify-between gap-4 border-t border-border/60 p-6 sm:px-8">
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  <Github className="size-4" /> View repository
                </a>
              ) : (
                <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-sm font-medium text-muted-foreground" title="Repository is private">
                  <Lock className="size-4" /> Private repository
                </span>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Live demo <ExternalLink className="size-3.5" />
                </a>
              )}
            </footer>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Label({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <span className="font-mono text-xs uppercase tracking-wide" style={{ color: accent }}>
      {children}
    </span>
  )
}

function Block({
  icon,
  label,
  accent,
  children,
}: {
  icon: React.ReactNode
  label: string
  accent: string
  children: React.ReactNode
}) {
  return (
    <div>
      <span className={cn("inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide")} style={{ color: accent }}>
        {icon}
        {label}
      </span>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  )
}
