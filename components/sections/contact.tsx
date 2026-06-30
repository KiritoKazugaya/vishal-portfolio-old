"use client"

import { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Send, Loader2, Check, ArrowUpRight } from "lucide-react"
import { Section, SectionHeading } from "@/components/ui/section"
import { Reveal } from "@/components/anim/reveal"
import { RiveAsset } from "@/components/anim/rive-asset"
import { contact, socials } from "@/lib/data"
import { cn } from "@/lib/utils"

type Status = "idle" | "sending" | "sent"

export function Contact() {
  const reduced = useReducedMotion()
  const [status, setStatus] = useState<Status>("idle")
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const valid = form.name.trim() && form.email.trim() && form.message.trim()

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid || status !== "idle") return
    setStatus("sending")
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
    window.setTimeout(() => {
      setStatus("sent")
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
      window.setTimeout(() => {
        setStatus("idle")
        setForm({ name: "", email: "", message: "" })
      }, 3500)
    }, 900)
  }

  return (
    <Section id="contact" className="border-t border-border/40">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* Left: invite + socials */}
        <div className="flex flex-col gap-8">
          <SectionHeading
            kicker="Contact"
            title={<>Let&apos;s build something <span className="text-gradient-accent">intelligent</span>.</>}
            description="Open to AI/ML and data roles, collaborations, and interesting problems. The fastest way to reach me is below."
          />
          <Reveal delay={0.1} className="flex flex-col gap-2">
            {socials.map((s) => {
              const Icon = s.icon
              const content = (
                <span className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card px-4 py-3 transition-colors hover:border-border">
                  <span className="grid size-10 place-items-center rounded-lg bg-muted/50 text-foreground/80 transition-colors group-hover:text-accent-violet">
                    <Icon className="size-4.5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium">{s.label}</span>
                    <span className="font-mono text-xs text-muted-foreground">{s.handle}</span>
                  </span>
                  {s.enabled && (
                    <ArrowUpRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                  {!s.enabled && (
                    <span className="ml-auto rounded-full bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground">soon</span>
                  )}
                </span>
              )
              return s.enabled && s.href ? (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <div key={s.label} aria-disabled className="cursor-not-allowed opacity-70">
                  {content}
                </div>
              )
            })}
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal direction="left">
          <form
            onSubmit={onSubmit}
            className="glass relative overflow-hidden rounded-3xl border border-border/70 p-6 sm:p-8"
          >
            <div className="absolute -right-20 -top-20 size-56 rounded-full bg-accent-violet/15 blur-3xl" />
            <div className="relative flex flex-col gap-5">
              <Field label="Name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="contact-input"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  className="contact-input"
                />
              </Field>
              <Field label="Message">
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What would you like to build or discuss?"
                  className="contact-input resize-none"
                />
              </Field>

              <button
                type="submit"
                disabled={!valid || status !== "idle"}
                className={cn(
                  "relative flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl text-sm font-medium text-white transition-all",
                  status === "sent"
                    ? "bg-accent-emerald"
                    : "bg-gradient-to-r from-accent-violet to-accent-blue shadow-[0_10px_40px_-14px_var(--accent-violet)]",
                  (!valid || status !== "idle") && status === "idle" && "cursor-not-allowed opacity-50"
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {status === "idle" && (
                    <motion.span key="idle" {...fade(reduced)} className="flex items-center gap-2">
                      <Send className="size-4" /> Send message
                    </motion.span>
                  )}
                  {status === "sending" && (
                    <motion.span key="sending" {...fade(reduced)} className="flex items-center gap-2">
                      <Loader2 className="size-4 animate-spin" /> Sending…
                    </motion.span>
                  )}
                  {status === "sent" && (
                    <motion.span key="sent" {...fade(reduced)} className="flex items-center gap-2">
                      <span className="grid size-5 place-items-center">
                        <RiveAsset
                          src="/rive/success.riv"
                          className="size-5"
                          fallback={
                            <motion.span
                              initial={reduced ? false : { scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 320, damping: 16 }}
                            >
                              <Check className="size-4" />
                            </motion.span>
                          }
                        />
                      </span>
                      Opening your email…
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <p className="text-center text-xs text-muted-foreground">
                This opens your email client, prefilled. Prefer direct?{" "}
                <a href={`mailto:${contact.email}`} className="text-accent-violet underline-offset-4 hover:underline">
                  {contact.email}
                </a>
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}

function fade(reduced: boolean | null) {
  if (reduced) return {}
  return {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
    transition: { duration: 0.18 },
  }
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}
