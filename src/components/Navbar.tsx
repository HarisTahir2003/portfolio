"use client";

// hello this is navbar

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // Icons for mobile toggle

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Navigation Logic
  const shouldReplace = pathname !== "/";
  
  const navLinks = [
    { name: "Experience", href: "/experience" },
    { name: "Projects", href: "/projects" },
    { name: "Skills", href: "/skills" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="w-full px-6 md:px-10 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="font-bold text-xl tracking-tighter text-white z-[110]">
          HARIS<span className="text-indigo-500">.AI</span>
        </Link>
        
        {/* DESKTOP MENU (Hidden on Mobile) */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              replace={shouldReplace} 
              className="hover:text-indigo-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/contact" 
            replace={shouldReplace} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* MOBILE TOGGLE BUTTON (Hidden on Desktop) */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-white p-2 z-[110]"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* MOBILE MENU OVERLAY */}
        {isOpen && (
          <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center space-y-8 text-xl font-semibold text-white md:hidden z-[100]">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                replace={shouldReplace} 
                onClick={() => setIsOpen(false)} // Close menu on click
                className="hover:text-indigo-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact" 
              replace={shouldReplace} 
              onClick={() => setIsOpen(false)}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;