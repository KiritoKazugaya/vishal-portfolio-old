"use client"

import Image from "next/image"
import { MapPin } from "lucide-react"
import { Section, Kicker } from "@/components/ui/section"
import { Reveal } from "@/components/anim/reveal"
import { CountUp } from "@/components/anim/count-up"
import { profile } from "@/lib/data"

export function About() {
  return (
    <Section id="about" className="border-t border-border/40">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Photo */}
        <Reveal direction="right" className="order-2 lg:order-1">
          <div className="group relative mx-auto max-w-sm">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-accent-violet/30 via-accent-blue/10 to-accent-cyan/20 opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative overflow-hidden rounded-3xl border border-border/70">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={profile.photo}
                  alt={profile.photoAlt}
                  fill
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1.5 text-xs backdrop-blur">
                <MapPin className="size-3.5 text-accent-cyan" />
                {profile.location}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <Reveal>
            <Kicker>About</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {profile.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {profile.summary}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-2 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/40 sm:grid-cols-4">
              {profile.stats.map((s) => (
                <div key={s.label} className="bg-card p-5">
                  <dd className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </dd>
                  <dt className="mt-1 text-xs leading-tight text-muted-foreground">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
