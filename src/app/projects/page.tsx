import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "HealthSync - HealthCare Access Platform",
    description: "Built a mobile app that simplifies hospital appointments by connecting patients directly with verified doctors, reducing reliance on intermediaries and improving access for underserved communities.",
    tags: ["React Native", "Firebase", "Django", "MongoDB", "Software Project Management"],
    githubUrl: "https://github.com/HarisTahir2003/SE-Project-Group-9",
  },
  {
    title: "Multilingual Text Classification using Machine Learning",
    description: "Built an end-to-end text classification pipeline for Urdu news, categorizing articles into five classes. Scraped and preprocessed 2,750 articles using LughaatNLP, trained multiple ML models, and achieved 97.45% accuracy with a neural network.",
    tags: ["Neural Networks", "Logistic Regression", "Naive Bayes", "NLP", "Python"],
    githubUrl: "https://github.com/HarisTahir2003/Machine-Learning-Project",
  },
  {
    title: "NLP Applications for Financial Reports",
    description: "Built a multi-module NLP system for financial documents, including RAG-based extractive QnA, LLM-powered earnings call summarization, and an interactive agent for SEC 10-K analysis and financial reasoning.",
    tags: ["NLP", "LangChain", "RAG", "LLMs", "Streanlit", "Python"],
    githubUrl: "https://github.com/HarisTahir2003/NLP_Applications_for_Financial_Reports",
  },
{
    title: "Trajectory Forecasting for Micro-Robots",
    description: "Implemented KNN and Regression Tree models to forecast micro-robot motion paths from video-derived historical data in complex environments.",
    tags: ["K-Nearest Neighbors", "Regression Trees", "Python", "Time Series Analysis"],
    githubUrl: "https://github.com/HarisTahir2003/AI_Project",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-32 pb-16 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-indigo-500">Projects</span>
          </h2>
          <p className="text-slate-400 max-w-2xl">
            A collection of my work in Machine Learning, Data Science, and Software Engineering. 
            Each project focuses on solving specific challenges or building innovative applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </main>
  );
}