"use client"

import dynamic from "next/dynamic"
import { Component, type ReactNode } from "react"
import { useReducedMotion } from "motion/react"

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => <GradientFallback />,
})

/** Static aurora-gradient fallback for reduced-motion / no-WebGL / loading. */
function GradientFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-1/2 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--accent-violet)_55%,transparent),transparent_62%)] blur-2xl" />
      <div className="absolute right-[12%] top-[22%] size-80 rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--accent-cyan)_45%,transparent),transparent_60%)] blur-2xl" />
    </div>
  )
}

class WebGLBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export function HeroCanvas() {
  const reduced = useReducedMotion()
  if (reduced) return <GradientFallback />
  return (
    <WebGLBoundary fallback={<GradientFallback />}>
      <HeroScene />
    </WebGLBoundary>
  )
}
