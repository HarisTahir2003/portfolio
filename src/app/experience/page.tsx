import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    role: "Computer Vision and Medical Imaging Researcher",
    company: "Computer Vision and Graphics Lab, LUMS",
    duration: "Feb 2025 - Jun 2025",
    location: "Hybrid / Lahore, Pakistan",
    description: [
      "Designed and implemented an end-to-end deep learning pipeline for automated TB detection, integrating UNet++ segmentation with SEResNet50 and Swin Transformer-based classification models.",
      "Curated, preprocessed, and trained models on 10,000+ chest X-ray images from multiple public datasets, achieving 99% classification accuracy and 96% Dice score for segmentation.",
      "Evaluated and interpreted model performance using IoU, F1-score, and GradCAM++ visualizations, and co-authored a research paper documenting methodology and results."
    ],
    color: "border-indigo-500"
  },
  {
    role: "Full-Stack Web Development Intern",
    company: "Rozee",
    duration: "Jul 2024 - Aug 2024",
    location: "On-Site / Lahore, Pakistan",
    description: [
      "Built a voice-enabled WhatsApp bot using Node.js and JavaScript that guided users through CV creation by asking questions via voice and processing multilingual voice responses",
      "Used OpenAI and Azure Speech APIs for real-time voice-to-text and language translation, enabling inclusive access for users with limited literacy",
      "Developed a separate chatbot-based CV builder using simple text messaging, integrated with Rozee.pk's platform via Laravel (PHP), to make resume creation intuitive and accessible for all users"
    ],
    color: "border-slate-700"
  },
    {
        role: "Research Analyst — Public Policy & Finance",
        company: "FINTRA, LUMS",
        duration: "Sep 2023 - Jun 2024",
        location: "Hybrid / Lahore, Pakistan",
        description: [
        "Authored a research article analyzing Pakistan's Ehsaas social welfare program, evaluating its economic impact, financial inclusion mechanisms, and effectiveness in poverty alleviation.",
        "Conducted comparative policy analysis by benchmarking Ehsaas against global social protection programs (e.g., Brazil's Bolsa Família), highlighting strengths, limitations, and scalability challenges.",
        "Assessed the role of digital payments, biometric verification, and cashless systems in reducing leakages and improving transparency, presenting data-driven insights for policy improvement."
        ],
        color: "border-slate-700"
    },
    {
        role: "Sustainability Research Intern",
        company: "World Wildlife Fund (WWF)",
        duration: "Jul 2021 - Aug 2021",
        location: "Remote / Lahore, Pakistan",
        description: [
        "Completed a digital eco-internship focused on global environmental challenges and their practical implications within Pakistan’s socio-economic context.",
        "Researched and analyzed sustainability issues such as deforestation and low forest cover, incorporating global best practices into local solutions.",
        "Authored and presented a sustainable business proposal promoting fast-growing, resource-efficient seeds to improve forest regeneration and environmental impact."
        ],
        color: "border-slate-700"
    },

];

export default function ExperiencePage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-6 bg-slate-950 text-slate-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white text-center md:text-left">
          Work <span className="text-indigo-500">Experience</span>
        </h2>

        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-6 space-y-16">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-slate-950 border-4 ${exp.color} shadow-[0_0_10px_rgba(99,102,241,0.3)]`} />
              
              <div className="flex flex-col mb-4">
                <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-indigo-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Briefcase size={14} /> {exp.company}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar size={14} /> {exp.duration}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <MapPin size={14} /> {exp.location}
                  </span>
                </div>
              </div>

              <ul className="space-y-3">
                {exp.description.map((bullet, i) => (
                  <li key={i} className="text-slate-400 leading-relaxed flex gap-3">
                    <span className="text-indigo-500 mt-1.5">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}