"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Command, Menu, X } from "lucide-react"
import { navItems, profile } from "@/lib/data"
import { scrollToHash } from "@/components/providers/smooth-scroll"
import { Magnetic } from "@/components/anim/magnetic"
import { cn } from "@/lib/utils"

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function go(href: string) {
    scrollToHash(href)
    setMobileOpen(false)
  }

  const openPalette = () => window.dispatchEvent(new CustomEvent("open-command-palette"))

  return (
    <motion.header
      initial={reduced ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: reduced ? 0 : 1.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between gap-4 rounded-2xl border border-transparent px-4 py-2.5 transition-all duration-300",
          scrolled && "glass border-border/60"
        )}
      >
        <button
          onClick={() => go("#top")}
          className="group flex items-center gap-2.5 font-display text-sm font-semibold"
          aria-label="Back to top"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-accent-violet to-accent-blue font-bold text-white shadow-[0_0_18px_-4px_var(--accent-violet)]">
            V
          </span>
          <span className="hidden sm:block">
            {profile.firstName}
            <span className="text-muted-foreground">.dev</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Magnetic key={item.href} strength={0.25}>
              <button
                onClick={() => go(item.href)}
                className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </button>
            </Magnetic>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openPalette}
            className="hidden items-center gap-2 rounded-lg border border-border bg-muted/40 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
            aria-label="Open command palette"
          >
            <Command className="size-3.5" />
            <span className="font-mono">K</span>
          </button>
          <Magnetic strength={0.2}>
            <button
              onClick={() => go("#contact")}
              className="hidden rounded-lg bg-foreground px-3.5 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:block"
            >
              Let&apos;s talk
            </button>
          </Magnetic>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="grid size-9 place-items-center rounded-lg border border-border md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass absolute inset-x-4 top-[4.5rem] rounded-2xl border border-border/60 p-2 md:hidden"
        >
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => go(item.href)}
              className="block w-full rounded-lg px-4 py-3 text-left text-sm text-foreground/80 hover:bg-accent"
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.header>
  )
}
