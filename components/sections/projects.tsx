"use client"

import { useState } from "react"
import { ArrowUpRight, Star, Lock } from "lucide-react"
import { Github } from "@/components/ui/brand-icons"
import { Section, SectionHeading } from "@/components/ui/section"
import { Reveal } from "@/components/anim/reveal"
import { TiltCard } from "@/components/anim/tilt-card"
import { ProjectModal } from "@/components/sections/project-modal"
import { projects } from "@/lib/data"
import type { Project } from "@/lib/types"
import { cn } from "@/lib/utils"

const SPAN: Record<string, string> = {
  "enterprise-rag-assistant": "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  "churn-mlops-platform": "lg:col-span-2",
  "celebrity-face-classification": "lg:col-span-2",
  "whatsapp-supplement-agent": "lg:col-span-2",
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <Section id="projects" className="border-t border-border/40">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          kicker="Selected work"
          title={<>Projects that <span className="text-gradient-accent">shipped</span>.</>}
          description="From enterprise RAG systems to data dashboards and automation. Open any card for the full case study."
        />
        <Reveal delay={0.1}>
          <span className="hidden font-mono text-sm text-muted-foreground sm:block">
            {projects.length.toString().padStart(2, "0")} projects
          </span>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[13.5rem] lg:grid-flow-dense">
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={Math.min(i * 0.05, 0.3)}
            className={cn("group h-full min-h-[13.5rem]", SPAN[project.slug])}
          >
            <ProjectCard
              project={project}
              big={project.slug === "enterprise-rag-assistant"}
              onOpen={() => setSelected(project)}
            />
          </Reveal>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}

function ProjectCard({
  project,
  big,
  onOpen,
}: {
  project: Project
  big?: boolean
  onOpen: () => void
}) {
  const maxTech = big ? 6 : 4
  return (
    <TiltCard className="h-full" glowColor={project.accent}>
      <button
        onClick={onOpen}
        aria-label={`Open case study: ${project.title}`}
        className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-5 text-left transition-colors duration-300 hover:border-border sm:p-6"
      >
        {/* accent wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
          style={{ background: `radial-gradient(circle, ${project.accent}, transparent 70%)` }}
        />

        <div className="relative flex items-center gap-2">
          <span
            className="rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide"
            style={{ borderColor: `color-mix(in oklch, ${project.accent} 45%, transparent)`, color: project.accent }}
          >
            {project.domain}
          </span>
          {project.flagship && (
            <span className="flex items-center gap-1 rounded-full bg-accent-amber/15 px-2 py-0.5 text-[10px] font-medium text-accent-amber">
              <Star className="size-3 fill-current" /> Flagship
            </span>
          )}
          <span className="ml-auto font-mono text-xs text-muted-foreground">{project.year}</span>
        </div>

        <h3 className={cn("relative mt-4 font-display font-semibold tracking-tight", big ? "text-2xl sm:text-3xl" : "text-lg")}>
          {project.title}
        </h3>
        <p className={cn("relative mt-2 text-sm leading-relaxed text-muted-foreground", big ? "max-w-md" : "line-clamp-2")}>
          {project.tagline}
        </p>

        {big && (
          <p className="relative mt-3 hidden max-w-md text-sm leading-relaxed text-muted-foreground/80 lg:line-clamp-3 lg:block">
            {project.problem}
          </p>
        )}

        <div className="relative mt-auto flex items-end justify-between gap-3 pt-5">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, maxTech).map((t, ti) => (
              <span
                key={t}
                className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground transition-transform group-hover:-translate-y-0.5"
                style={{ transitionDelay: `${ti * 30}ms` }}
              >
                {t}
              </span>
            ))}
            {project.tech.length > maxTech && (
              <span className="rounded-md px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                +{project.tech.length - maxTech}
              </span>
            )}
          </div>
          <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-foreground/70 transition-colors group-hover:text-foreground">
            {project.repo ? <Github className="size-3.5" /> : <Lock className="size-3" />}
            Case study
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </button>
    </TiltCard>
  )
}
