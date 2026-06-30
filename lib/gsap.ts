"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

// Register once on the client. GSAP 3.13+ ships ScrollTrigger and SplitText for free.
if (typeof window !== "undefined" && !(window as unknown as { __gsapReg?: boolean }).__gsapReg) {
  gsap.registerPlugin(ScrollTrigger, SplitText)
  ;(window as unknown as { __gsapReg?: boolean }).__gsapReg = true
}

export { gsap, ScrollTrigger, SplitText }
