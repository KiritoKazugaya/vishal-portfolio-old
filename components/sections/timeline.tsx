"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring } from "motion/react"
import { Briefcase, GraduationCap } from "lucide-react"
import { Section, SectionHeading } from "@/components/ui/section"
import { Reveal } from "@/components/anim/reveal"
import { experience } from "@/lib/data"
import { cn } from "@/lib/utils"

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 })

  return (
    <Section id="experience" className="border-t border-border/40">
      <SectionHeading
        kicker="Journey"
        title={<>Experience &amp; <span className="text-gradient-accent">education</span>.</>}
        description="Five years across financial services, healthcare, and retail — and the degrees that anchor it."
      />

      <div ref={ref} className="relative mt-14">
        {/* rail */}
        <div className="absolute left-5 top-0 h-full w-px bg-border lg:left-1/2 lg:-translate-x-1/2">
          <motion.div
            style={{ scaleY: fill }}
            className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-accent-violet via-accent-blue to-accent-cyan"
          />
        </div>

        <div className="flex flex-col gap-10">
          {experience.map((item, i) => {
            const left = i % 2 === 0
            const isWork = item.kind === "work"
            return (
              <div
                key={`${item.org}-${item.start}`}
                className="relative grid grid-cols-1 lg:grid-cols-2 lg:gap-12"
              >
                {/* dot */}
                <span className="absolute left-5 top-1.5 z-10 -translate-x-1/2 lg:left-1/2">
                  <span
                    className={cn(
                      "grid size-9 place-items-center rounded-full border bg-card",
                      isWork ? "border-accent-violet/60 text-accent-violet" : "border-accent-cyan/60 text-accent-cyan"
                    )}
                  >
                    {isWork ? <Briefcase className="size-4" /> : <GraduationCap className="size-4" />}
                  </span>
                </span>

                <div
                  className={cn(
                    "pl-14 lg:pl-0",
                    left ? "lg:col-start-1 lg:pr-4 lg:text-right" : "lg:col-start-2 lg:pl-4"
                  )}
                >
                  <Reveal direction={left ? "left" : "right"}>
                    <div className="rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-border sm:p-6">
                      <div className={cn("flex items-center gap-2", left && "lg:justify-end")}>
                        <span className="font-mono text-xs text-accent-cyan">
                          {item.start} — {item.end}
                        </span>
                        <span className="rounded-full bg-muted/50 px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                          {item.kind}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">{item.role}</h3>
                      <p className="text-sm font-medium" style={{ color: "var(--accent-violet)" }}>
                        {item.org} · <span className="text-muted-foreground">{item.location}</span>
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                      <ul className={cn("mt-3 space-y-1.5", left && "lg:text-right")}>
                        {item.highlights.map((h, hi) => (
                          <li key={hi} className="text-xs leading-relaxed text-muted-foreground/80">
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className={cn("mt-4 flex flex-wrap gap-1.5", left && "lg:justify-end")}>
                        {item.tags.map((t) => (
                          <span key={t} className="rounded-md border border-border/60 bg-muted/30 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
