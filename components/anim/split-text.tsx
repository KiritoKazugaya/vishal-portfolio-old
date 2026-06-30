"use client"

import { useEffect, useRef } from "react"
import { gsap, SplitText as GSAPSplitText, ScrollTrigger } from "@/lib/gsap"
import { cn } from "@/lib/utils"

interface SplitTextProps {
  text: string
  className?: string
  /** Reveal granularity. */
  type?: "chars" | "words" | "lines"
  delay?: number
  stagger?: number
  /** Animate on scroll-into-view instead of on mount. */
  onScroll?: boolean
}

/** GSAP SplitText reveal for headings. Falls back to a plain element under reduced motion. */
export function SplitText({
  text,
  className,
  type = "words",
  delay = 0,
  stagger = 0.045,
  onScroll = false,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Reduced motion (or no GSAP): just reveal the text — never leave it hidden.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1"
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 1 })
      // Re-apply the visual class (e.g. gradient) to the split parts: SplitText
      // moves the text into child nodes, which otherwise lose a parent's
      // `background-clip: text` gradient and paint nothing.
      const split = new GSAPSplitText(el, {
        type,
        wordsClass: type === "words" ? className : undefined,
        charsClass: type === "chars" ? className : undefined,
        linesClass: type === "lines" ? `overflow-hidden ${className ?? ""}` : "overflow-hidden",
      })
      const targets =
        type === "chars" ? split.chars : type === "lines" ? split.lines : split.words

      gsap.from(targets, {
        yPercent: 120,
        opacity: 0,
        rotateX: -40,
        duration: 0.9,
        ease: "power3.out",
        stagger,
        delay,
        ...(onScroll
          ? { scrollTrigger: { trigger: el, start: "top 82%", once: true } }
          : {}),
      })

      return () => split.revert()
    }, ref)

    return () => {
      ctx.revert()
      ScrollTrigger.refresh()
    }
  }, [text, type, delay, stagger, onScroll, className])

  return (
    <span
      ref={ref}
      className={cn("inline-block opacity-0 [perspective:600px]", className)}
      aria-label={text}
    >
      {text}
    </span>
  )
}
