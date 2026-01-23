import Image from "next/image";
import { MapPin, GraduationCap } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-6 bg-slate-950 text-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          {/* Left Side: Description */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              About <span className="text-indigo-500">Me</span>
            </h2>
            
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                I am Haris, a Senior Computer Science student at the Lahore University of Management Sciences (LUMS), 
                with a passion for building intelligent systems and exploring the depths of Machine Learning. 
              </p>
              <p>
                Currently, I am focused on building AI-powered systems for a variety of applications, ranging from healthcare to
                finance. I believe that the future of technology lies in the seamless 
                integration of AI into our daily workflows, making complex data analysis 
                accessible to everyone.
              </p>
              <p>
                In my free time, I enjoy playing tennis or cricket, reading history books and poetry, and exploring new technologies.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium">
              <div className="flex items-center justify-center md:justify-start gap-3 text-slate-300">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <MapPin size={18} className="text-indigo-400" />
                </div>
                <span>Lahore, Pakistan</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3 text-slate-300">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <GraduationCap size={18} className="text-indigo-400" />
                </div>
                <span>B.S. Computer Science</span>
              </div>
            </div>
          </div>

          {/* Right Side: Rectangular Profile Image */}
          <div className="relative w-full max-w-sm flex-shrink-0 aspect-[2/3]">
            <Image
              src="/img.jpg"
              alt="Haris Profile Photo"
              fill
              className="rounded-lg object-cover shadow-lg transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>


        </div>
      </div>
    </main>
  );
}
