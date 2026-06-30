"use client"

import { useMemo, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Section, SectionHeading } from "@/components/ui/section"
import { Reveal } from "@/components/anim/reveal"
import { skillGroups } from "@/lib/data"
import type { Skill, SkillCategory } from "@/lib/types"
import { cn } from "@/lib/utils"

const CAT_COLOR: Record<SkillCategory, string> = {
  "AI/ML": "var(--accent-violet)",
  Data: "var(--accent-cyan)",
  Backend: "var(--accent-emerald)",
  Frontend: "var(--accent-blue)",
  Tools: "var(--accent-amber)",
}

const CENTER = { x: 500, y: 340 }
const VIEW = { w: 1000, h: 680 }

type Node = Skill & { x: number; y: number; r: number; color: string }
type Hub = { category: SkillCategory; label: string; x: number; y: number; color: string; nodes: Node[] }

function buildGraph(): Hub[] {
  const n = skillGroups.length
  return skillGroups.map((group, gi) => {
    const angle = (-90 + (gi * 360) / n) * (Math.PI / 180)
    const hx = CENTER.x + 285 * Math.cos(angle)
    const hy = CENTER.y + 235 * Math.sin(angle)
    const color = CAT_COLOR[group.category]
    const count = group.skills.length
    const spread = 118
    const nodes: Node[] = group.skills.map((s, si) => {
      const a = angle + ((si - (count - 1) / 2) / Math.max(count, 1)) * Math.PI * 1.15
      const ring = spread + (si % 2) * 34
      return {
        ...s,
        color,
        r: 5 + (s.weight ?? 1) * 2.2,
        x: hx + ring * Math.cos(a),
        y: hy + ring * Math.sin(a),
      }
    })
    return { category: group.category, label: group.label, x: hx, y: hy, color, nodes }
  })
}

export function Skills() {
  const reduced = useReducedMotion()
  const hubs = useMemo(() => buildGraph(), [])
  const [activeCat, setActiveCat] = useState<SkillCategory | null>(null)
  const [hovered, setHovered] = useState<Skill | null>(null)

  const isDim = (cat: SkillCategory) => activeCat !== null && activeCat !== cat

  return (
    <Section id="skills" className="border-t border-border/40">
      <SectionHeading
        kicker="Capabilities"
        title={<>A connected stack, not a <span className="text-gradient-accent">list of chips</span>.</>}
        description="Five domains that work together — hover any node to see where it was actually used."
      />

      {/* Category filters */}
      <Reveal delay={0.05} className="mt-8 flex flex-wrap gap-2">
        <FilterChip active={activeCat === null} color="var(--foreground)" onClick={() => setActiveCat(null)}>
          All
        </FilterChip>
        {hubs.map((h) => (
          <FilterChip
            key={h.category}
            active={activeCat === h.category}
            color={h.color}
            onClick={() => setActiveCat((c) => (c === h.category ? null : h.category))}
          >
            {h.label}
          </FilterChip>
        ))}
      </Reveal>

      {/* Desktop constellation */}
      <div className="relative mt-8 hidden md:block">
        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          className="w-full"
          role="img"
          aria-label="Interactive skills constellation"
        >
          {/* edges */}
          {hubs.map((h) => (
            <g key={`edges-${h.category}`} className="transition-opacity duration-300" style={{ opacity: isDim(h.category) ? 0.12 : 1 }}>
              <line x1={CENTER.x} y1={CENTER.y} x2={h.x} y2={h.y} stroke={h.color} strokeOpacity={0.35} strokeWidth={1.2} />
              {h.nodes.map((node) => (
                <line
                  key={`e-${node.name}`}
                  x1={h.x}
                  y1={h.y}
                  x2={node.x}
                  y2={node.y}
                  stroke={h.color}
                  strokeOpacity={hovered?.name === node.name ? 0.8 : 0.18}
                  strokeWidth={1}
                />
              ))}
            </g>
          ))}

          {/* core */}
          <circle cx={CENTER.x} cy={CENTER.y} r={30} fill="var(--card)" stroke="var(--accent-violet)" strokeWidth={1.5} />
          <text x={CENTER.x} y={CENTER.y + 5} textAnchor="middle" className="fill-foreground font-display" fontSize={18} fontWeight={600}>
            VA
          </text>

          {/* hubs + nodes */}
          {hubs.map((h, hi) => (
            <g key={h.category} style={{ opacity: isDim(h.category) ? 0.18 : 1 }} className="transition-opacity duration-300">
              {/* hub label */}
              <g>
                <rect x={h.x - 46} y={h.y - 16} width={92} height={32} rx={16} fill="var(--card)" stroke={h.color} strokeOpacity={0.5} />
                <text x={h.x} y={h.y + 4} textAnchor="middle" fontSize={13} className="fill-foreground" fontWeight={600}>
                  {h.label}
                </text>
              </g>
              {h.nodes.map((node, ni) => (
                <motion.g
                  key={node.name}
                  initial={reduced ? false : { opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduced ? 0 : 0.2 + hi * 0.05 + ni * 0.02, type: "spring", stiffness: 200, damping: 18 }}
                  onMouseEnter={() => setHovered(node)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={hovered?.name === node.name ? node.r + 3 : node.r}
                    fill={node.color}
                    className="transition-all duration-200"
                    style={{ filter: hovered?.name === node.name ? `drop-shadow(0 0 8px ${node.color})` : "none" }}
                  />
                  <text x={node.x} y={node.y - node.r - 7} textAnchor="middle" fontSize={12} className="pointer-events-none fill-muted-foreground" style={{ opacity: hovered ? (hovered.name === node.name ? 1 : 0.25) : 0.85 }}>
                    {node.name}
                  </text>
                </motion.g>
              ))}
            </g>
          ))}
        </svg>

        {/* Detail card */}
        <div className="pointer-events-none absolute bottom-2 left-2 w-64">
          <motion.div
            key={hovered?.name ?? "idle"}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl border border-border/60 p-4"
          >
            {hovered ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ background: CAT_COLOR[hovered.category] }} />
                  <span className="font-display text-sm font-semibold">{hovered.name}</span>
                  <span className="ml-auto font-mono text-[10px] uppercase text-muted-foreground">{hovered.category}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{hovered.usedIn}</p>
              </>
            ) : (
              <p className="text-xs leading-relaxed text-muted-foreground">
                Hover a node to see where each skill shipped.
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile grouped list */}
      <div className="mt-8 grid gap-4 md:hidden">
        {skillGroups
          .filter((g) => activeCat === null || g.category === activeCat)
          .map((group) => (
            <div key={group.category} className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full" style={{ background: CAT_COLOR[group.category] }} />
                <h3 className="font-display text-sm font-semibold">{group.label}</h3>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{group.blurb}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <MobileSkill key={s.name} skill={s} color={CAT_COLOR[group.category]} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </Section>
  )
}

function FilterChip({
  children,
  active,
  color,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  color: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        active ? "border-transparent text-background" : "border-border/70 text-muted-foreground hover:text-foreground"
      )}
      style={active ? { background: color } : undefined}
    >
      {children}
    </button>
  )
}

function MobileSkill({ skill, color }: { skill: Skill; color: string }) {
  const [open, setOpen] = useState(false)
  return (
    <button
      onClick={() => setOpen((o) => !o)}
      className="rounded-lg border border-border/60 bg-muted/30 px-2.5 py-1.5 text-left text-xs"
    >
      <span className="flex items-center gap-1.5">
        <span className="size-1.5 rounded-full" style={{ background: color }} />
        {skill.name}
      </span>
      {open && <span className="mt-1 block max-w-[14rem] text-[11px] leading-snug text-muted-foreground">{skill.usedIn}</span>}
    </button>
  )
}
