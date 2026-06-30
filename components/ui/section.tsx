import { type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/anim/reveal"

export function Section({
  id,
  className,
  containerClassName,
  children,
}: {
  id?: string
  className?: string
  containerClassName?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={cn("relative w-full scroll-mt-24 py-24 sm:py-32", className)}>
      <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  )
}

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 font-mono text-xs tracking-wide text-muted-foreground uppercase",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-accent-violet shadow-[0_0_8px_var(--accent-violet)]" />
      {children}
    </span>
  )
}

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className,
}: {
  kicker?: string
  title: ReactNode
  description?: ReactNode
  align?: "left" | "center"
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {kicker && <Kicker>{kicker}</Kicker>}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
