"use client"

import { ArrowUp } from "lucide-react"
import { navItems, socials, profile, contact } from "@/lib/data"
import { scrollToHash } from "@/components/providers/smooth-scroll"

export function Footer() {
  const year = 2026
  return (
    <footer className="relative border-t border-border/60 bg-card/30">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-violet/50 to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <button
              onClick={() => scrollToHash("#top")}
              className="flex items-center gap-2.5 font-display text-lg font-semibold"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-accent-violet to-accent-blue font-bold text-white">
                V
              </span>
              {profile.name}
            </button>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {profile.role} · {profile.location}. {profile.identity}
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-4 inline-block font-mono text-sm text-accent-violet underline-offset-4 hover:underline"
            >
              {contact.email}
            </a>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">Navigate</span>
            {navItems.map((n) => (
              <button
                key={n.href}
                onClick={() => scrollToHash(n.href)}
                className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </button>
            ))}
          </nav>

          {/* Connect */}
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">Connect</span>
            {socials.map((s) => {
              const Icon = s.icon
              return s.enabled && s.href ? (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="size-4 transition-colors group-hover:text-accent-violet" />
                  {s.label}
                </a>
              ) : (
                <span key={s.label} className="flex items-center gap-2.5 text-sm text-muted-foreground/60">
                  <Icon className="size-4" />
                  {s.label} <span className="text-[10px]">(soon)</span>
                </span>
              )
            })}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {profile.name}. Built with Next.js, Motion, GSAP &amp; Three.js.
          </p>
          <button
            onClick={() => scrollToHash("#top")}
            className="group inline-flex items-center gap-2 rounded-full border border-border/70 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
