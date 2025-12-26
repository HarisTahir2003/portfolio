import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Haris | Portfolio",
  description: "Senior CS Student specializing in ML and Data Science",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased`}>
        {/* The Navbar will now show up on every page */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}