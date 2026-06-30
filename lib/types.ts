import type { ComponentType } from "react"

type IconComponent = ComponentType<{ className?: string }>

export type SkillCategory = "Data" | "AI/ML" | "Frontend" | "Backend" | "Tools"

export interface Skill {
  name: string
  category: SkillCategory
  /** Short note on where/how this skill was applied — surfaced on hover. */
  usedIn: string
  /** Relative emphasis 1–3, drives node size in the constellation. */
  weight?: 1 | 2 | 3
}

export interface SkillGroup {
  category: SkillCategory
  label: string
  blurb: string
  skills: Skill[]
}

export interface ProjectMetric {
  label: string
  /** Numeric target for the count-up. */
  value: number
  /** Optional prefix/suffix, e.g. "+", "M", "%". */
  suffix?: string
  prefix?: string
}

export interface ArchitectureStep {
  title: string
  detail: string
}

export interface Project {
  slug: string
  title: string
  tagline: string
  /** One of the brief's 6 personal projects, or a resume "flagship" enterprise project. */
  flagship?: boolean
  /** bento sizing hint */
  size?: "sm" | "md" | "lg"
  domain: string
  year: string
  tech: string[]
  accent: string // css color token for the card glow, e.g. "var(--accent-violet)"
  /** Full case study */
  problem: string
  goal: string
  process: string[]
  architecture: ArchitectureStep[]
  challenges: string
  result: string
  learned: string
  metrics: ProjectMetric[]
  /** Real repo URL, or null → renders a disabled "private" state (never a broken link). */
  repo: string | null
  demo?: string | null
}

export interface ExperienceItem {
  kind: "work" | "education"
  role: string
  org: string
  location: string
  start: string
  end: string
  summary: string
  highlights: string[]
  tags: string[]
}

export interface SocialLink {
  label: string
  href: string | null
  handle: string
  icon: IconComponent
  /** When false, render as a styled-but-disabled "coming soon" chip. */
  enabled: boolean
}

export interface NavItem {
  label: string
  href: string
}
