import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThreeScene from "@/components/ThreeScene"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haris | Portfolio",
  description: "Senior CS Student specializing in ML and Data Science",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen flex flex-col relative">
        {/* 1. Add the 3D Background here with fixed positioning */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ThreeScene /> 
        </div>

        {/* 2. Ensure content sits ABOVE the background */}
        <div className="relative z-10 flex flex-col flex-grow">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}