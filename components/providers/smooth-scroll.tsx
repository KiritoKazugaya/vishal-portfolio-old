"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { gsap, ScrollTrigger } from "@/lib/gsap"

let lenisInstance: Lenis | null = null

/** Smoothly scroll to a hash target (`#about`) or the page top (`#top`). */
export function scrollToHash(hash: string) {
  const id = hash.replace("#", "")
  if (id === "top" || id === "") {
    if (lenisInstance) lenisInstance.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: "smooth" })
    return
  }
  const el = document.getElementById(id)
  if (!el) return
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -72 })
  } else {
    el.scrollIntoView({ behavior: "smooth" })
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    lenisInstance = lenis
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    lenis.on("scroll", ScrollTrigger.update)

    const onRaf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onRaf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onRaf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return <>{children}</>
}
