"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const shouldReplace = pathname !== "/";
  
const navLinks = [
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "Resume", href: "/resume" }, 
];

  return (
    <nav className="fixed top-0 w-full z-[100] bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="w-full px-6 md:px-10 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="font-bold text-xl tracking-tighter text-white z-[110]">
          HARIS<span className="text-indigo-500">.AI</span>
        </Link>
        
        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} replace={shouldReplace} className="hover:text-indigo-400 transition-colors">
              {link.name}
            </Link>
          ))}
          <Link href="/contact" replace={shouldReplace} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Contact
          </Link>
        </div>

        {/* MOBILE TOGGLE BUTTON */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 z-[110] relative"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* MOBILE SIDEBAR OVERLAY (The Darkening Background) */}
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onClick={() => setIsOpen(false)}
        />

        {/* SLIDING SIDEBAR PANEL */}
        <div className={`fixed top-0 right-0 h-full w-[280px] bg-slate-900 border-l border-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden z-[105] ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex flex-col h-full pt-24 px-8">            
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  replace={shouldReplace} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-200 hover:text-indigo-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/contact" 
                replace={shouldReplace} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-slate-200 hover:text-indigo-400 transition-colors"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;