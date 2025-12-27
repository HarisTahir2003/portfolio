import ThreeScene from "@/components/ThreeScene";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-transparent">
      {/* 3D Animated Background */}
      <ThreeScene />

      <div className="z-10 text-center px-4">
        {/* Name/Heading */}
        <h1 className="text-6xl md:text-8xl font-extrabold text-white tracking-tighter">
          Hi, I'm <span className="text-indigo-500">Haris</span>
        </h1>

        {/* Tagline */}
        <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
          Senior CS Student | Specializing in Machine Learning & Data Science
        </p>
        
        {/* Navigation Buttons */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center max-w-3xl mx-auto">
          <Link 
            href="/about" 
            className="px-8 py-4 bg-white text-slate-950 hover:bg-slate-200 rounded-full font-bold transition-all transform hover:scale-105"
          >
            About Me
          </Link>
          
          {/* <Link 
            href="/projects" 
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition-all transform hover:scale-105"
          >
            View Projects
          </Link>

          <Link 
            href="/experience" 
            className="px-8 py-4 border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 rounded-full font-bold transition-all transform hover:scale-105"
          >
            Work Experience
          </Link>

          <Link 
            href="/skills" 
            className="px-8 py-4 border border-slate-700 hover:border-slate-400 text-white rounded-full font-bold transition-all transform hover:scale-105"
          >
            Skills
          </Link> */}

          <Link 
            href="/contact" 
            className="px-8 py-4 border border-slate-700 hover:border-slate-400 text-white rounded-full font-bold transition-all transform hover:scale-105"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </main>
  );
}