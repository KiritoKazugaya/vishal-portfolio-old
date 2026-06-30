"use client"

import { useEffect, useState, type ReactNode } from "react"
import { useRive } from "@rive-app/react-canvas"
import { cn } from "@/lib/utils"

interface RiveAssetProps {
  /** Path to a .riv file under /public (e.g. "/rive/badge.riv"). */
  src: string
  stateMachine?: string
  className?: string
  /** Rendered when no .riv asset is available, or while it can't load. */
  fallback: ReactNode
}

/**
 * Renders a real Rive animation when the .riv asset exists; otherwise shows the
 * Motion-driven fallback. This makes Rive a genuine drop-in: add a file to
 * /public/rive/ and the upgrade is automatic, with no broken/empty UI today.
 */
export function RiveAsset({ src, stateMachine, className, fallback }: RiveAssetProps) {
  const [assetExists, setAssetExists] = useState<boolean | null>(null)

  useEffect(() => {
    let active = true
    fetch(src, { method: "HEAD" })
      .then((res) => {
        if (active) setAssetExists(res.ok)
      })
      .catch(() => {
        if (active) setAssetExists(false)
      })
    return () => {
      active = false
    }
  }, [src])

  if (assetExists) {
    return <RiveCanvas src={src} stateMachine={stateMachine} className={className} />
  }
  return <div className={cn("grid place-items-center", className)}>{fallback}</div>
}

function RiveCanvas({
  src,
  stateMachine,
  className,
}: {
  src: string
  stateMachine?: string
  className?: string
}) {
  const { RiveComponent } = useRive({
    src,
    autoplay: true,
    ...(stateMachine ? { stateMachines: stateMachine } : {}),
  })
  return <RiveComponent className={className} />
}
