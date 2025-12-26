"use client"; // This must be a client component to use usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  // If we are on the Home page, we want to PUSH a new entry.
  // If we are already on a sub-page, we want to REPLACE the current sub-page.
  const shouldReplace = pathname !== "/";

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="w-full px-6 md:px-10 h-16 flex items-center justify-between">
        
        <Link href="/" className="font-bold text-xl tracking-tighter text-white">
          HARIS<span className="text-indigo-500">.AI</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          {/* <Link href="/about" replace={shouldReplace} className="hover:text-indigo-400 transition-colors">About</Link> */}
          <Link href="/experience" replace={shouldReplace} className="hover:text-indigo-400 transition-colors">Experience</Link>
          <Link href="/projects" replace={shouldReplace} className="hover:text-indigo-400 transition-colors">Projects</Link>
          <Link href="/skills" replace={shouldReplace} className="hover:text-indigo-400 transition-colors">Skills</Link>
          {/* <Link href="/blog" replace={shouldReplace} className="hover:text-indigo-400 transition-colors">Blog</Link> */}
          <Link href="/contact" replace={shouldReplace} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;