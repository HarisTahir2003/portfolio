/**
 * ============================================================================
 *  PORTFOLIO CONTENT  —  single source of truth
 * ============================================================================
 *  Edit everything about the site here. Sections read from these exports, so
 *  you never have to touch the components to update copy, add a project, etc.
 *
 *  HOW TO ADD MORE:
 *   • Experience  → add an object to `experiences`
 *   • Project     → add an object to `projects` (put images in /public)
 *   • Skill group → add an object to `skillCategories`
 *   • Certificate → add an object to `certificates` (image in /public)
 *   • Blog post   → add an object to `blogPosts` (give it a unique `slug`)
 *
 *  Look for the `// TODO:` markers — they are ready-to-fill placeholder slots.
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/*  TYPES                                                                      */
/* -------------------------------------------------------------------------- */

export type SocialLink = {
  name: string;
  href: string;
  /** lucide-react icon name, resolved in the component */
  icon: "github" | "linkedin" | "mail" | "twitter";
};

export type Profile = {
  name: string;
  /** short professional title shown in the hero / metadata */
  title: string;
  tagline: string;
  location: string;
  education: string;
  email: string;
  resumeUrl: string;
  /** full rectangular photo (used as fallback) */
  photo: string;
  /** transparent background-removed cut-out for the ProfileCard */
  avatar: string;
  /** one-liner for the hero */
  shortBio: string;
  /** paragraphs for the About section */
  longBio: string[];
  social: SocialLink[];
};

export type Experience = {
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  /** true for the most relevant / current role — gets the accent dot */
  featured?: boolean;
};

export type Contribution = {
  title: string;
  content: string;
};

export type ProjectDetails = {
  overview: string;
  contributions: Contribution[];
};

export type ProjectCategory =
  | "AI/ML"
  | "DL/GenAI"
  | "Software Engineering";

export type Project = {
  category: ProjectCategory;
  title: string;
  description: string;
  details: ProjectDetails;
  tags: string[];
  githubUrl: string;
  /** paths relative to /public, e.g. "/healthsync-1.png" */
  images: string[];
  pdfs: { name: string; url: string }[];
};

export type SkillCategory = {
  title: string;
  /** lucide-react icon name, resolved in the component */
  icon: "code" | "cpu" | "terminal" | "database" | "chart" | "git";
  skills: string[];
};

export type TechLogo = {
  name: string;
  /**
   * simple-icons export slug (e.g. "react" -> siReact). Set to null for brands
   * that simple-icons doesn't ship (a fallback icon + name is rendered instead).
   */
  slug: string | null;
};

export type Certificate = {
  title: string;
  issuer: string;
  image: string;
};

export type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  slug: string;
  /** markdown-ish paragraphs rendered on the article page */
  content: string[];
};

/* -------------------------------------------------------------------------- */
/*  PROFILE                                                                    */
/* -------------------------------------------------------------------------- */

export const profile: Profile = {
  name: "Haris Tahir Rana",
  title: "Machine Learning & Data Science Engineer",
  tagline: "Building intelligent systems that turn complex data into clarity.",
  location: "Lahore, Pakistan",
  education: "B.S. Computer Science — LUMS",
  email: "haristahirrana@gmail.com",
  resumeUrl: "/Haris_Resume.pdf",
  photo: "/img.jpg",
  // Transparent cut-out PNG for the ProfileCard. Falls back to `photo` until added.
  avatar: "/avatar.png",
  shortBio:
    "Computer Science graduate specializing in Machine Learning, Deep Learning, and Data Science.",
  longBio: [
    "I'm Haris, a Computer Science graduate from the Lahore University of Management Sciences (LUMS), with a focus on building intelligent systems and exploring the depths of Machine Learning and Deep Learning.",
    "My work spans AI-powered systems across healthcare, finance, and research — from end-to-end deep learning pipelines for medical imaging to agentic NLP systems for financial intelligence. I care about building things that are both technically rigorous and genuinely useful.",
    "Outside of work, I enjoy playing tennis and cricket, reading history and poetry, and tinkering with new technologies.",
  ],
  social: [
    {
      name: "GitHub",
      href: "https://github.com/HarisTahir2003",
      icon: "github",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/haristahirrana/",
      icon: "linkedin",
    },
    {
      name: "Email",
      href: "mailto:haristahirrana@gmail.com",
      icon: "mail",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  EXPERIENCE                                                                 */
/* -------------------------------------------------------------------------- */

export const experiences: Experience[] = [
  {
    role: "Co-Founder",
    company: "Arthus Systems",
    duration: "Feb 2026 – Present",
    location: "Hybrid / Lahore, Pakistan",
    featured: true,
    description: [
      "Co-founded Arthus Systems, a software studio that designs and ships custom software applications and AI-driven products for industrial and enterprise clients, alongside in-house SaaS products.",
      "Own end-to-end delivery: client discovery, system architecture, full-stack development, database design, application security, and deployment.",
      "Drive the company's technical direction and client engagements.",
    ],
  },
  {
    role: "Machine Learning Researcher",
    company: "clapp trust",
    duration: "Feb 2026 – May 2026",
    location: "Remote / Lahore, Pakistan",
    description: [
      "Data Engineering: Collaborated with Clapp Hospital to build an automated speech-diagnosis system, processing and structuring a dataset of 500 speech samples with speaker diarization and K-Nearest Neighbors to segment and isolate relevant speech characteristics.",
      "Model Development: Built and evaluated dual machine learning pipelines, training both a Convolutional Neural Network and an XGBoost classifier to distinguish hypernasal from normal speech.",
      "Optimization & Selection: Deployed XGBoost as the final production solution over the deep-learning approach for its lightweight profile, low inference latency, and novelty in this domain.",
    ],
  },
  {
    role: "Undergraduate Teaching Assistant",
    company: "Lahore University of Management Sciences",
    duration: "Jan 2026 – May 2026",
    location: "On-Site / Lahore, Pakistan",
    description: [
      "Served as Teaching Assistant for \"Introduction to Arabic Language,\" holding dedicated office hours to provide academic assistance, clarify concepts, and help students improve their performance.",
      "Managed course administration and evaluation: tracked daily participation and attendance, and marked regular assignments with constructive feedback on foundational vocabulary and grammar.",
      "Coordinated exam logistics and invigilated midterms and finals to maintain academic integrity and a smooth testing environment.",
    ],
  },
  {
    role: "Computer Vision & Medical Imaging Researcher",
    company: "Computer Vision and Graphics Lab, LUMS",
    duration: "Feb 2025 – Jun 2025",
    location: "Hybrid / Lahore, Pakistan",
    description: [
      "Designed and implemented an end-to-end deep learning pipeline for automated TB detection, integrating UNet++ segmentation with SEResNet50 and Swin Transformer–based classification models.",
      "Curated, preprocessed, and trained models on 10,000+ chest X-ray images from multiple public datasets, achieving 99% classification accuracy and a 96% Dice score for segmentation.",
      "Evaluated and interpreted model performance using IoU, F1-score, and GradCAM++ visualizations, and co-authored a research paper documenting methodology and results.",
    ],
  },
  {
    role: "Full-Stack Web Development Intern",
    company: "Rozee",
    duration: "Jul 2024 – Aug 2024",
    location: "On-Site / Lahore, Pakistan",
    description: [
      "Built a voice-enabled WhatsApp bot using Node.js and JavaScript that guided users through CV creation by asking questions via voice and processing multilingual voice responses.",
      "Used OpenAI and Azure Speech APIs for real-time voice-to-text and language translation, enabling inclusive access for users with limited literacy.",
      "Developed a separate chatbot-based CV builder using simple text messaging, integrated with Rozee.pk's platform via Laravel (PHP), to make resume creation intuitive and accessible.",
    ],
  },
  {
    role: "Research Analyst — Public Policy & Finance",
    company: "FINTRA, LUMS",
    duration: "Sep 2023 – Jun 2024",
    location: "Hybrid / Lahore, Pakistan",
    description: [
      "Authored a research article analyzing Pakistan's Ehsaas social welfare program, evaluating its economic impact, financial inclusion mechanisms, and effectiveness in poverty alleviation.",
      "Conducted comparative policy analysis by benchmarking Ehsaas against global social protection programs (e.g., Brazil's Bolsa Família), highlighting strengths, limitations, and scalability challenges.",
      "Assessed the role of digital payments, biometric verification, and cashless systems in reducing leakages and improving transparency, presenting data-driven insights for policy improvement.",
    ],
  },
  {
    role: "Sustainability Research Intern",
    company: "World Wildlife Fund (WWF)",
    duration: "Jul 2021 – Aug 2021",
    location: "Remote / Lahore, Pakistan",
    description: [
      "Completed a digital eco-internship focused on global environmental challenges and their practical implications within Pakistan's socio-economic context.",
      "Researched and analyzed sustainability issues such as deforestation and low forest cover, incorporating global best practices into local solutions.",
      "Authored and presented a sustainable business proposal promoting fast-growing, resource-efficient seeds to improve forest regeneration and environmental impact.",
    ],
  },

  // TODO: add more experiences here ↓ (copy the shape above)
  // {
  //   role: "",
  //   company: "",
  //   duration: "",
  //   location: "",
  //   description: ["", ""],
  // },
];

/* -------------------------------------------------------------------------- */
/*  PROJECTS                                                                   */
/* -------------------------------------------------------------------------- */

export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  "AI/ML",
  "DL/GenAI",
  "Software Engineering",
];

export const projects: Project[] = [
  {
    category: "Software Engineering",
    title: "HealthSync — Mobile Healthcare Platform",
    description:
      "Mobile app simplifying hospital appointments by connecting patients directly with verified doctors.",
    details: {
      overview:
        "Led a team of five in the end-to-end development of HealthSync, a mobile application designed to democratize healthcare access by eliminating third-party intermediaries and connecting patients directly with verified doctors.",
      contributions: [
        {
          title: "Full-Stack Architecture",
          content:
            "Developed a cross-platform mobile experience using React Native (TypeScript) for the frontend and Django (Python) with MongoDB for the backend.",
        },
        {
          title: "Real-Time Communication",
          content:
            "Integrated live chat and automated email notifications to facilitate seamless, real-time interactions between medical professionals and patients.",
        },
        {
          title: "Secure Infrastructure",
          content:
            "Implemented a robust doctor verification system using Firebase Storage for secure credential management and the DeepSeek API for intelligent system features.",
        },
        {
          title: "Deployment & Impact",
          content:
            "Engineered features for appointment booking and API-based messaging, aiming to provide a scalable solution for underserved communities.",
        },
      ],
    },
    tags: [
      "React Native",
      "Firebase",
      "Django",
      "MongoDB",
      "Software Project Management",
      "TypeScript",
      "Android",
    ],
    githubUrl: "https://github.com/HarisTahir2003/SE-Project-Group-9",
    images: [
      "/healthsync-1.png",
      "/healthsync-2.png",
      "/healthsync-3.png",
      "/healthsync-4.png",
      "/healthsync-5.png",
      "/healthsync-6.png",
    ],
    pdfs: [{ name: "Project Report", url: "/HealthSync_Report.pdf" }],
  },

  {
    category: "DL/GenAI",
    title: "Multi-Stage Financial Intelligence System",
    description:
      "Agentic system for automated extraction, summarization, and cross-document analysis of SEC 10-K filings.",
    details: {
      overview:
        "Designed and implemented a modular agentic NLP system for high-fidelity financial intelligence over dense SEC 10-K filings, enabling automated QnA, summarization, and multi-year trend inference.",
      contributions: [
        {
          title: "RAG-based Financial QnA",
          content:
            "Built a Retrieval-Augmented Generation pipeline using Gemini 2.0 Flash and ChromaDB, significantly improving factual faithfulness using prompt chaining and few-shot strategies.",
        },
        {
          title: "Earnings Call Summarization",
          content:
            "Engineered an LLM-powered summarization engine achieving a 4.39/5.0 G-Eval coherence score for professional investment memos.",
        },
        {
          title: "Agentic Financial Analysis",
          content:
            "Designed a Plan-and-Execute agent capable of multi-year cross-document financial analysis with custom Python calculator tools.",
        },
        {
          title: "Document Engineering",
          content:
            "Implemented semantic chunking and HTML-to-Markdown table conversion to preserve complex financial tables.",
        },
      ],
    },
    tags: [
      "RAG",
      "LangChain",
      "ChromaDB",
      "Gemini",
      "Financial Analysis",
      "Prompt Engineering",
    ],
    githubUrl:
      "https://github.com/HarisTahir2003/NLP_Applications_for_Financial_Reports",
    images: ["/Fin-1.png", "/Fin-2.png", "/Fin-3.png"],
    pdfs: [{ name: "Project Report", url: "/Finance_Project_Report.pdf" }],
  },

  {
    category: "AI/ML",
    title: "Urdu Text Classification using Machine Learning",
    description:
      "End-to-end NLP pipeline for classifying Urdu news articles across multiple categories.",
    details: {
      overview:
        "Developed a comprehensive NLP pipeline for Urdu-language news classification, addressing the challenges of low-resource language processing.",
      contributions: [
        {
          title: "Data Collection",
          content:
            "Scraped and curated 2,750+ Urdu news articles from multiple websites using custom Python scrapers.",
        },
        {
          title: "Linguistic Preprocessing",
          content:
            "Applied Urdu-specific normalization, stemming, lemmatization, and stopword removal using the LughaatNLP library.",
        },
        {
          title: "Model Benchmarking",
          content:
            "Evaluated Naive Bayes, Logistic Regression, and Neural Network models for multi-class classification.",
        },
        {
          title: "Performance Optimization",
          content:
            "Achieved a top accuracy of 97.45% and a 0.97 F1-score using the feedforward neural network model.",
        },
      ],
    },
    tags: [
      "Machine Learning",
      "NLP",
      "Naive Bayes",
      "Neural Networks",
      "Logistic Regression",
      "Web Scraping",
    ],
    githubUrl: "https://github.com/HarisTahir2003/Machine-Learning-Project",
    images: [],
    pdfs: [{ name: "Project Report", url: "/ML_Project_Report.pdf" }],
  },

  {
    category: "AI/ML",
    title: "Micro-Robot Motion Trajectory Prediction",
    description:
      "Predictive modeling of micro-robot trajectories in obstacle-dense environments.",
    details: {
      overview:
        "Built a machine learning system to forecast micro-robot motion paths using temporal feature engineering and classical regression techniques.",
      contributions: [
        {
          title: "Algorithm Design",
          content:
            "Implemented a K-Nearest Neighbors (KNN) model from scratch with custom distance metrics.",
        },
        {
          title: "Time-Series Engineering",
          content:
            "Designed lookback-window feature extraction to model temporal dependencies in motion data.",
        },
        {
          title: "Model Evaluation",
          content:
            "Analyzed RMSE trends across varying hyperparameters to optimize prediction accuracy.",
        },
        {
          title: "Visualization",
          content:
            "Built trajectory visualizations to compare predicted vs. actual robot motion paths.",
        },
      ],
    },
    tags: [
      "Machine Learning",
      "Time Series",
      "KNN",
      "Regression Trees",
      "Scikit-Learn",
      "Data Visualization",
    ],
    githubUrl: "https://github.com/HarisTahir2003/AI_Project",
    images: ["/AIProj-1.png", "/AIProj-2.png"],
    pdfs: [],
  },

  {
    category: "AI/ML",
    title:
      "Data-Driven Study of Socioeconomic Inequality & Career Aspirations",
    description:
      "Statistical analysis of how socioeconomic inequality shapes academic major selection and career aspirations among university students.",
    details: {
      overview:
        "Co-led a team of four in the end-to-end development of a data science research project analyzing the impact of socioeconomic inequality on academic major selection and career aspirations among university students, using real survey data and statistical modeling to derive actionable insights.",
      contributions: [
        {
          title: "Data Collection & Analysis",
          content:
            "Designed and analyzed a multi-university survey using Python (pandas, NumPy) to explore relationships between income indicators, field of study, and career intent.",
        },
        {
          title: "Statistical Modeling",
          content:
            "Built and evaluated a logistic regression model with scikit-learn to assess the influence of socioeconomic factors on technical vs. non-technical major choices.",
        },
        {
          title: "Visualization & Reporting",
          content:
            "Created data visualizations with Matplotlib and Seaborn and published analytical findings through well-documented Medium articles.",
        },
      ],
    },
    tags: [
      "Data Science",
      "pandas",
      "NumPy",
      "Seaborn",
      "Scikit-Learn",
      "Data Visualization",
      "Statistical Modeling",
    ],
    githubUrl: "https://github.com/HarisTahir2003/Data-Science-Project",
    images: ["/Data-1.png", "/Data-2.png", "/Data-3.png"],
    pdfs: [{ name: "Project Report", url: "/DataScience_Project.pdf" }],
  },

  {
    category: "Software Engineering",
    title:
      "Real-Time Multiplayer Ludo Game",
    description:
      "A full-stack multiplayer Ludo game featuring server-authoritative architecture, real-time WebSockets, dynamic matchmaking, and AI fault tolerance.",
    details: {
      overview:
        "Engineered a full-stack, server-authoritative multiplayer Ludo game featuring real-time WebSocket communication, dynamic matchmaking, and automated AI fault tolerance.",
      contributions: [
        {
          title: "Event-Driven Architecture",
          content:
            "Implemented a bi-directional, real-time communication layer using Socket.IO to handle synchronized gameplay events, including dice rolls, token movements, in-game room chats, and live activity logs.",
        },
        {
          title: "Server-Authoritative Logic",
          content:
            "Developed a complete Ludo rules engine in TypeScript to compute valid moves, safe-zone captures, turn timers, and victory standings entirely on the backend to eliminate client-side manipulation.",
        },
        {
          title: "Matchmaking & Resiliency",
          content:
            "Built a dynamic room management system supporting live lobby broadcasting, automatic player color allocation, session restoration, and a 10-second AI takeover fallback to maintain gameplay continuity if a user disconnects.",
        },
      ],
    },
    tags: [
      "React",
      "Typescript",
      "MongoDB",
      "Node.js",
      "REST APIs",
      "MERN Stack",
    ],
    githubUrl: "https://github.com/HarisTahir2003/ludo-game",
    images: ["/ludo1.png", "/ludo2.png", "/ludo3.png", "/ludo4.png", "/ludo5.png", "/ludo6.png"],
    pdfs: [],
  },

  {
    category: "DL/GenAI",
    title:
      "Knowledge Graph Retrieval Systems: Biologically-Inspired HippoRAG Reproduction",
    description:
      "HippoRAG retrieval framework mapping human memory indexing theory onto LLMs and Knowledge Graphs for multi-hop question answering.",
    details: {
      overview:
        "Reengineered and evaluated HippoRAG, a retrieval framework mapping human memory indexing theory onto LLMs and Knowledge Graphs for multi-hop question answering.",
      contributions: [
        {
          title: "Exploratory Data Analysis",
          content:
            "Developed a data pipeline to normalize multi-schema datasets, validating passage lengths, hop-count distributions, and corpus filtration characteristics.",
        },
        {
          title: "Modular System Architecture",
          content:
            "Engineered a clean-room Python package using igraph for accelerated PageRank routing, abstract LLM layers, and a hybrid dense-graph scoring engine.",
        },
        {
          title: "Resource Optimization",
          content:
            "Executed the pipeline using 4-bit quantized open-weight models on cloud GPUs, implementing state checkpointing and soft time guards across 40 compute hours.",
        },
        {
          title: "Resource Optimization",
          content:
            "Benchmarked multi-hop recall metrics and analyzed open-weight LLM failure modes, compiling the insights into a formal NeurIPS style technical report.",
        },
      ],
    },
    tags: [
      "GraphRAG",
      "Knowledge Graphs",
      "Data Engineering",
      "Data Analysis",
    ],
    githubUrl: "https://github.com/HarisTahir2003/ludo-game",
    images: [],
    pdfs: [{ name: "Project Report", url: "/Final Report HippoRAG.pdf" }],
  },

  {
    category: "Software Engineering",
    title:
      "Power Zone: Inventory Management System",
    description:
      "An end-to-end, production-ready Inventory Management System for a prominent diesel generator manufacturing company, Power Zone.",
    details: {
      overview:
        "Collaborated in a three-person team to deliver an end-to-end Inventory Management System for Power Zone, a prominent diesel generator manufacturer in Pakistan.",
      contributions: [
        {
          title: "Full Stack Delivery",
          content:
            "Designed and shipped the complete operational flow covering shipments, factory receiving, engine and alternator coupling, order creation, fulfillment, and stock adjustments.",
        },
        {
          title: "Concurrency Safe Engine",
          content:
            "Engineered a derived stock model on atomic PostgreSQL functions. This utilizes row and advisory level locking with post write balance guards to guarantee accurate stock under simultaneous edits.",
        },
        {
          title: "Access Control and Security",
          content:
            "Built role-based access control across seven distinct modules with an administrative tier. Hardened the platform using PostgreSQL Row Level Security, server-side authentication guards, and session revocation.",
        },
        {
          title: "Analytics and Reporting",
          content:
            "Developed a real-time dashboard featuring inventory matrices by rating and one-click data exports to CSV and Excel.",
        },
      ],
    },
    tags: [
      "Next.js",
      "React",
      "PostgreSQL",
      "Vercel",
    ],
    githubUrl: "https://github.com/HarisTahir2003/ludo-game",
    images: ["/IMS1.png", "/IMS2.png", "/IMS3.png"],
    pdfs: [],
  },

  // TODO: add more projects here ↓ (copy the shape above)
  // {
  //   category: "AI/ML",
  //   title: "",
  //   description: "",
  //   details: { overview: "", contributions: [{ title: "", content: "" }] },
  //   tags: [],
  //   githubUrl: "",
  //   images: [],
  //   pdfs: [],
  // },
];

/* -------------------------------------------------------------------------- */
/*  SKILLS & CERTIFICATES                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Logos shown in the sliding marquee at the top of the Skills section.
 * `slug` is the simple-icons key; brands simple-icons doesn't ship use
 * `slug: null` and fall back to a generic icon + name.
 */
export const techLogos: TechLogo[] = [
  { name: "TypeScript", slug: "typescript" },
  { name: "React", slug: "react" },
  { name: "HTML", slug: "html5" },
  { name: "CSS", slug: "css" },
  { name: "Supabase", slug: "supabase" },
  { name: "Vercel", slug: "vercel" },
  { name: "PyTorch", slug: "pytorch" },
  { name: "Python", slug: "python" },
  { name: "LangChain", slug: "langchain" },
  { name: "Hugging Face", slug: "huggingface" },
  { name: "scikit-learn", slug: "scikitlearn" },
  { name: "pandas", slug: "pandas" },
  { name: "NumPy", slug: "numpy" },
  { name: "Git", slug: "git" },
  { name: "STATA", slug: null }, // not in simple-icons

  // TODO: add more technologies here ↓
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: "code",
    skills: ["Python", "SQL", "C++", "JavaScript", "TypeScript", "HTML / CSS"],
  },
  {
    title: "ML & AI Frameworks",
    icon: "cpu",
    skills: [
      "PyTorch",
      "LangChain",
      "HuggingFace",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
    ],
  },
  {
    title: "Tools & Platforms",
    icon: "terminal",
    skills: ["Git", "STATA", "Power BI", "MS Excel"],
  },
  {
    title: "Concepts",
    icon: "database",
    skills: [
      "Deep Learning",
      "Natural Language Processing",
      "Feature Engineering",
      "RAG Systems",
      "Multi-Agent Systems",
    ],
  },

  // TODO: add more skill groups here ↓
];

export const certificates: Certificate[] = [
  {
    title: "Data Analytics Essentials",
    issuer: "Cisco",
    image: "/certificate1.jpg",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    image: "/certificate2.jpg",
  },
  {
    title: "Introduction to Data Science",
    issuer: "Cisco",
    image: "/certificate3.jpg",
  },
  {
    title: "Claude Code 101",
    issuer: "Anthropic",
    image: "/certificate4.jpg",
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    image: "/certificate5.jpg",
  },

  // TODO: add more certificates here ↓
];

/* -------------------------------------------------------------------------- */
/*  BLOG                                                                       */
/* -------------------------------------------------------------------------- */

export const blogPosts: BlogPost[] = [
  {
    title: "Understanding RAG: Improving LLM Accuracy with Context",
    excerpt:
      "A deep dive into Retrieval-Augmented Generation and how it solves the 'hallucination' problem in large language models.",
    date: "Dec 15, 2025",
    readingTime: "8 min read",
    tags: ["LLM", "RAG", "AI"],
    slug: "understanding-rag",
    content: [
      "Retrieval-Augmented Generation (RAG) has become one of the most practical techniques for making large language models reliable in production. Instead of relying solely on what a model memorized during training, RAG retrieves relevant context at query time and grounds the model's response in that context.",
      "This post is a placeholder — replace this body with your full article. You can write as many paragraphs as you like here; each string in the `content` array becomes a paragraph on the article page.",
      "// TODO: write the full post.",
    ],
  },
  {
    title: "Fine-tuning LoRA Models on a MacBook Pro",
    excerpt:
      "A guide on optimizing memory usage and managing disk space when fine-tuning small language models locally.",
    date: "Dec 05, 2025",
    readingTime: "6 min read",
    tags: ["MLOps", "Fine-tuning", "Python"],
    slug: "lora-finetuning-guide",
    content: [
      "Low-Rank Adaptation (LoRA) makes it feasible to fine-tune capable models on consumer hardware by training a small set of adapter weights instead of the full network.",
      "This post is a placeholder — replace this body with your full article.",
      "// TODO: write the full post.",
    ],
  },
  {
    title: "The Power of Multi-Agent Systems in Software Development",
    excerpt:
      "Exploring how multiple AI agents can debate and refine ideas to reach a consensus in complex project environments.",
    date: "Nov 28, 2025",
    readingTime: "10 min read",
    tags: ["Multi-Agent", "Architecture", "Design"],
    slug: "multi-agent-systems",
    content: [
      "Multi-agent systems decompose a hard problem into specialized roles — a planner, a critic, an executor — that collaborate (and sometimes disagree) to produce a better final answer than any single pass.",
      "This post is a placeholder — replace this body with your full article.",
      "// TODO: write the full post.",
    ],
  },

  // TODO: add more blog posts here ↓ (give each a unique slug)
];

/* -------------------------------------------------------------------------- */
/*  NAVIGATION  —  single-page anchors + standalone routes                     */
/* -------------------------------------------------------------------------- */

export type NavLink = { name: string; href: string };

/** Section anchors on the home page (smooth-scroll) */
export const sectionLinks: NavLink[] = [
  { name: "About", href: "/#about" },
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Skills", href: "/#skills" },
];

/** Standalone routes */
export const routeLinks: NavLink[] = [
  { name: "Blog", href: "/blog" },
  { name: "Resume", href: "/resume" },
];
