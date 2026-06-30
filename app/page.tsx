import { Nav } from "@/components/sections/nav"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Timeline } from "@/components/sections/timeline"
import { Resume } from "@/components/sections/resume"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
