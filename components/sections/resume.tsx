"use client"

import { FileDown, Eye, FileText } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Reveal } from "@/components/anim/reveal"
import { Magnetic } from "@/components/anim/magnetic"
import { profile } from "@/lib/data"

const RESUME = "/resume/Vishal-Naveen-Akkala-Resume.pdf"

const highlights = [
  "5+ years building production ML & GenAI systems",
  "RAG, NLP, forecasting, and MLOps at enterprise scale",
  "M.S. Information Systems — University of Florida",
]

export function Resume() {
  return (
    <Section id="resume" className="border-t border-border/40">
      <Reveal>
        <div className="glow-violet relative overflow-hidden rounded-3xl border border-border/70 bg-card p-8 sm:p-12">
          <div className="absolute -right-24 -top-24 size-72 rounded-full bg-accent-violet/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-accent-cyan/15 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                <FileText className="size-3.5" /> Résumé
              </span>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                The one-page version of <span className="text-gradient-accent">{profile.firstName}</span>.
              </h2>
              <ul className="mt-6 space-y-2.5">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-accent-violet" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Magnetic strength={0.3}>
                  <a
                    href={RESUME}
                    download
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-violet to-accent-blue px-6 py-3.5 text-sm font-medium text-white shadow-[0_10px_40px_-12px_var(--accent-violet)]"
                  >
                    <FileDown className="size-4" /> Download PDF
                  </a>
                </Magnetic>
                <a
                  href={RESUME}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-6 py-3.5 text-sm font-medium transition-colors hover:bg-muted/60"
                >
                  <Eye className="size-4" /> View in browser
                </a>
              </div>
            </div>

            {/* Paper preview */}
            <Reveal direction="left" className="hidden lg:block">
              <div className="relative mx-auto aspect-[8.5/11] w-56 rotate-2 rounded-lg border border-border bg-gradient-to-b from-muted/60 to-card p-4 shadow-2xl transition-transform duration-500 hover:rotate-0">
                <div className="h-3 w-2/3 rounded bg-foreground/70" />
                <div className="mt-1.5 h-2 w-1/3 rounded bg-accent-violet/70" />
                <div className="mt-4 space-y-1.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="h-1.5 rounded bg-muted-foreground/20" style={{ width: `${90 - (i % 4) * 14}%` }} />
                  ))}
                </div>
                <div className="mt-4 h-2 w-1/4 rounded bg-accent-cyan/60" />
                <div className="mt-2 space-y-1.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-1.5 rounded bg-muted-foreground/20" style={{ width: `${85 - (i % 3) * 18}%` }} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
