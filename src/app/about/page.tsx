import Image from "next/image";
import { User, MapPin, GraduationCap } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-6 bg-slate-950 text-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
          
          {/* Left Side: Profile Photo */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
            {/* CHANGE 1: The decorative border behind becomes rounded-full */}
            <div className="absolute inset-0 rounded-full border-2 border-indigo-500 translate-x-4 translate-y-4 -z-10" />
            
            {/* CHANGE 2: The actual image container becomes rounded-full */}
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 border border-slate-700">
              <Image
                src="/profile.jpeg"
                alt="Haris Profile Photo"
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                priority
              />
            </div>
          </div>

          {/* Right Side: Description (No changes here) */}
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

            {/* Quick Details List (No changes here) */}
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

        </div>
      </div>
    </main>
  );
}