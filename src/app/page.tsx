import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* Hero floats over the fixed 3D background */}
      <Hero />

      {/*
        Everything below sits on the solid page background so content stays
        legible over the 3D scene. A hairline top border separates it from
        the hero.
      */}
      <div className="relative border-t border-border bg-bg/95 backdrop-blur-sm">
        <About />
        <Divider />
        <Experience />
        <Divider />
        <Education />
        <Divider />
        <Projects />
        <Divider />
        <Skills />
        <Divider />
        <Contact />
      </div>
    </>
  );
}

function Divider() {
  return (
    <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-border to-transparent" />
  );
}
