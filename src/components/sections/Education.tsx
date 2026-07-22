"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { educations } from "@/data/portfolio";

export default function Education() {
  // We reverse the array to show the timeline from oldest (left) to newest (right)
  const timeline = [...educations].reverse();

  return (
    <section id="education" className="relative min-h-screen flex flex-col justify-center py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        
        <SectionHeading
          eyebrow="03 — Education"
          title="Academic"
          accent="background"
          description="A timeline of my formal degrees and relevant academic courses."
        />

        <div className="mx-auto mt-24 w-full relative">
          
          {/* Desktop Horizontal Line Background */}
          <div className="hidden md:block absolute top-[11px] left-[5%] w-[90%] h-[2px] bg-border rounded-full" />
          
          {/* Desktop Horizontal Line Fill */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="hidden md:block absolute top-[11px] left-[5%] w-[90%] h-[2px] bg-gradient-to-r from-accent via-blue-400 to-accent rounded-full shadow-[0_0_10px_var(--accent-ring)] origin-left" 
          />

          {/* Mobile Vertical Line Background */}
          <div className="md:hidden absolute top-2 left-[15px] w-[2px] h-full bg-border rounded-full" />
          
          {/* Mobile Vertical Line Fill */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="md:hidden absolute top-2 left-[15px] w-[2px] h-[100%] bg-gradient-to-b from-accent to-blue-400 rounded-full shadow-[0_0_10px_var(--accent-ring)] origin-top" 
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative z-10 pl-12 md:pl-0">
            {timeline.map((edu, index) => {
              const isLatest = index === timeline.length - 1;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`group flex flex-col cursor-default ${
                    index === 0 
                      ? "md:items-start md:text-left" 
                      : index === 1 
                        ? "md:items-center md:text-center" 
                        : "md:items-end md:text-right"
                  }`}
                >
                  {/* The Node on the Timeline */}
                  <div 
                    className={`h-6 w-6 rounded-full mb-8 absolute md:relative -left-[37px] top-1 md:left-auto md:top-auto border-4 border-bg transition-all duration-500 group-hover:scale-150 ${
                      isLatest 
                        ? "bg-accent shadow-[0_0_15px_var(--accent-ring)]" 
                        : "bg-border md:bg-bg-card group-hover:bg-accent group-hover:shadow-[0_0_15px_var(--accent-ring)]"
                    }`}
                  />
                  
                  {/* The Premium Card */}
                  <div className={`relative w-full max-w-[340px] p-6 rounded-2xl border border-border/50 bg-bg-card/20 backdrop-blur-md transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-bg-card/60 group-hover:border-accent/40 group-hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.2)] flex flex-col ${
                    index === 0 ? "items-start text-left" : index === 1 ? "items-center text-center" : "items-end text-right"
                  }`}>
                    
                    {/* Duration Badge */}
                    <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs mb-5 transition-colors group-hover:bg-accent/20">
                      {edu.duration}
                    </div>
                    
                    <h3 className="text-xl font-bold text-ink mb-1 group-hover:text-accent transition-colors">{edu.institution}</h3>
                    <p className="text-ink-muted text-sm font-medium mb-3">{edu.degree}</p>
                    
                    {edu.gpa && (
                      <div className="inline-flex items-center gap-1.5 mt-1 text-sm font-semibold text-ink px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                        <span className="text-accent">GPA:</span> {edu.gpa}
                      </div>
                    )}
                    
                    {/* Hidden Details (Revealed on Hover) */}
                    <div className="w-full overflow-hidden transition-all duration-500 ease-in-out max-h-0 opacity-0 group-hover:max-h-[400px] group-hover:opacity-100 group-hover:mt-6 group-hover:pt-5 group-hover:border-t border-border/50">
                      <div className="flex flex-col gap-3">
                        {edu.details.map((detail, i) => {
                          // Try to format "Relevant Courses: ..." boldly
                          const isCourses = detail.startsWith("Relevant Courses:");
                          const formattedDetail = isCourses ? (
                            <>
                              <span className="font-semibold text-accent">Relevant Courses:</span>
                              {detail.replace("Relevant Courses:", "")}
                            </>
                          ) : detail;

                          return (
                            <div key={i} className={`flex items-start gap-2.5 ${index === 1 ? "justify-center text-center" : index === 2 ? "justify-end text-right flex-row-reverse" : "justify-start text-left"}`}>
                              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent/60 shrink-0" />
                              <p className="text-ink-muted text-sm leading-relaxed">
                                {formattedDetail}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
