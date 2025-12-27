"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const shouldReplace = pathname !== "/";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

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
        <Link href="/" className="font-bold text-xl tracking-tighter text-white z-[120]">
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
          className="md:hidden text-white p-2 z-[120] relative"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* MOBILE SIDEBAR OVERLAY */}
        <div 
          className={`fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500 md:hidden z-[110] ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* FULL SLIDING SIDEBAR PANEL */}
        <div className={`fixed top-0 right-0 h-screen w-[85%] sm:w-[400px] bg-slate-950 border-l border-slate-800 shadow-2xl transform transition-transform duration-500 ease-out md:hidden z-[115] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="flex flex-col h-full pt-32 px-10">            
            
            <p className="text-xs uppercase tracking-[0.3em] text-indigo-500 font-bold mb-8">Navigation</p>
            
            <div className="flex flex-col space-y-8">
              {navLinks.map((link, index) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  replace={shouldReplace} 
                  onClick={() => setIsOpen(false)}
                  className={`text-3xl font-bold text-white hover:text-indigo-400 transition-all duration-300 transform ${
                    isOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {link.name}
                </Link>
              ))}
              
              <Link 
                href="/contact" 
                replace={shouldReplace} 
                onClick={() => setIsOpen(false)}
                className={`text-3xl font-bold text-indigo-500 hover:text-white transition-all duration-300 transform ${
                  isOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                }`}
                style={{ transitionDelay: `${navLinks.length * 100}ms` }}
              >
                Get In Touch
              </Link>
            </div>

            {/* Footer section of Sidebar */}
            <div className="mt-auto mb-12">
              <div className="flex gap-6 mb-6">
                <a href="https://github.com/HarisTahir2003" target="_blank" className="text-slate-400 hover:text-white transition-colors">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/haristahirrana/" target="_blank" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin size={24} />
                </a>
                <a href="mailto:haristahirrana@gmail.com" className="text-slate-400 hover:text-white transition-colors">
                  <Mail size={24} />
                </a>
              </div>
              <p className="text-slate-600 text-xs">© 2025 HARIS.AI — ML & DATA SCIENCE</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;