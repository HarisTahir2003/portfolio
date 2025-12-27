"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const socials = [
    {
      name: "GitHub",
      href: "https://github.com/HarisTahir2003",
      icon: <Github size={20} />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/haristahirrana/",
      icon: <Linkedin size={20} />,
    },
    {
      name: "Email",
      href: "mailto:haristahirrana@gmail.com",
      icon: <Mail size={20} />,
    },
  ];

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Branding/Copyright */}
        <div className="text-slate-500 text-sm">
          <span className="text-white font-semibold tracking-tighter">HARIS<span className="text-indigo-500">.AI</span></span>
          <p className="mt-1">© 2025 Haris Tahir Rana. All rights reserved.</p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-indigo-400 transition-all transform hover:scale-110"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}