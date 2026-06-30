"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  Search,
  CornerDownLeft,
  FileDown,
  Mail,
  Home,
  User,
  Sparkles,
  FolderGit2,
  GanttChart,
  Send,
} from "lucide-react"
import { Github, Linkedin } from "@/components/ui/brand-icons"
import { navItems, contact } from "@/lib/data"
import { scrollToHash } from "@/components/providers/smooth-scroll"
import { cn } from "@/lib/utils"

type Item = {
  id: string
  label: string
  hint?: string
  icon: React.ComponentType<{ className?: string }>
  run: () => void
  keywords?: string
}

const sectionIcon: Record<string, Item["icon"]> = {
  About: User,
  Skills: Sparkles,
  Projects: FolderGit2,
  Experience: GanttChart,
  Resume: FileDown,
  Contact: Send,
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const items = useMemo<Item[]>(() => {
    const nav: Item[] = [
      { id: "top", label: "Home", icon: Home, run: () => scrollToHash("#top") },
      ...navItems.map((n) => ({
        id: n.href,
        label: n.label,
        hint: "Jump to section",
        icon: sectionIcon[n.label] ?? Home,
        run: () => scrollToHash(n.href),
      })),
    ]
    const actions: Item[] = [
      { id: "resume", label: "Download résumé (PDF)", icon: FileDown, keywords: "cv pdf", run: () => window.open("/resume/Vishal-Naveen-Akkala-Resume.pdf", "_blank") },
      { id: "email", label: "Email Vishal", hint: contact.email, icon: Mail, run: () => (window.location.href = `mailto:${contact.email}`) },
      { id: "github", label: "Open GitHub", icon: Github, run: () => window.open(contact.github, "_blank") },
      { id: "linkedin", label: "Open LinkedIn", icon: Linkedin, run: () => window.open(contact.linkedin, "_blank") },
    ]
    return [...nav, ...actions]
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (i) => `${i.label} ${i.hint ?? ""} ${i.keywords ?? ""}`.toLowerCase().includes(q)
    )
  }, [items, query])

  const close = useCallback(() => {
    setOpen(false)
    setQuery("")
    setActive(0)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setActive(0)
        setOpen((o) => !o)
      } else if (e.key === "Escape") {
        close()
      }
    }
    const onOpen = () => {
      setActive(0)
      setOpen(true)
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("open-command-palette", onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("open-command-palette", onOpen)
    }
  }, [close])

  useEffect(() => {
    if (!open) return
    const id = setTimeout(() => inputRef.current?.focus(), 30)
    return () => clearTimeout(id)
  }, [open])

  function onListKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      const item = filtered[active]
      if (item) {
        item.run()
        close()
      }
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            aria-label="Close command palette"
            className="absolute inset-0 cursor-default bg-background/70 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onKeyDown={onListKey}
            className="glow-violet relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                }}
                placeholder="Jump to a section or action…"
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
                ESC
              </kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No matches found.
                </li>
              )}
              {filtered.map((item, i) => {
                const Icon = item.icon
                return (
                  <li key={item.id}>
                    <button
                      onMouseEnter={() => setActive(i)}
                      onClick={() => {
                        item.run()
                        close()
                      }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                        i === active ? "bg-accent text-accent-foreground" : "text-foreground/80"
                      )}
                    >
                      <Icon className="size-4 shrink-0 text-muted-foreground" />
                      <span className="flex-1">{item.label}</span>
                      {item.hint && (
                        <span className="truncate font-mono text-xs text-muted-foreground">
                          {item.hint}
                        </span>
                      )}
                      {i === active && <CornerDownLeft className="size-3.5 text-muted-foreground" />}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
