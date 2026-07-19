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
  /** intro paragraph shown above the bullets (LinkedIn's "Description") */
  summary?: string;
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
  /** paths relative to /public, e.g. "/healthsync-1.webp" */
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
  title: "Software Engineer & AI Automation Expert",
  tagline: "I build scalable web applications and practical AI pipelines that solve complex operational bottlenecks for businesses.",
  location: "Lahore, Pakistan",
  education: "Co-Founder & COO @ Arthus Systems",
  email: "haristahirrana@gmail.com",
  resumeUrl: "/Haris_Resume.pdf",
  photo: "/img.webp",
  // Transparent cut-out PNG for the ProfileCard. Falls back to `photo` until added.
  avatar: "/avatar.webp",
  shortBio:
    "Co-Founder & COO at Arthus Systems, specializing in Custom Software Engineering and AI Automation.",
  longBio: [
    "I'm Haris, a Software Engineer and AI Automation Expert. As the Co-Founder and COO of Arthus Systems, I design system logic, write core code, and build practical AI tools that save teams hours of manual work.",
    "My work spans full-stack software delivery, practical AI pipelines, and in-house SaaS products. From crafting end-to-end inventory management systems to building intelligent NLP pipelines, I focus on building things that are fast, secure, and genuinely useful for businesses.",
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
    role: "Co-Founder & Chief Operating Officer",
    company: "Arthus Systems",
    duration: "Feb 2026 – Present",
    location: "Hybrid / Lahore, Pakistan",
    featured: true,
    summary:
      "We launched Arthus Systems to build software and automation that actually work, without any unnecessary overhead. As a technical co-founder, my daily focus is straightforward: I design the system logic and write the core code alongside our small team to ensure everything we ship is fast, secure, and actually useful. Our studio splits its focus between three main areas:",
    description: [
      "Custom Software Engineering: Designing and creating reliable web apps, database architectures, and internal dashboards to help businesses manage their workflows and operations cleanly.",
      "Practical Automation: Building AI pipelines that take over repetitive manual tasks to save teams hours of manual entry.",
      "In-House SaaS Products: Developing and launching our own software platforms to solve common business bottlenecks and make specialized tools accessible to everyone.",
      "Every project we take on gets our full focus. We don't use middle managers or sales reps, meaning our clients work directly with the engineers building their products from day one.",
    ],
  },
  {
    role: "Machine Learning Engineer",
    company: "clapp trust",
    duration: "Feb 2026 – May 2026",
    location: "Remote / Lahore, Pakistan",
    summary:
      "Worked with a colleague and collaborated with Clapp Hospital to develop an automated speech diagnosis system designed to classify hypernasal and normal speech patterns.",
    description: [
      "Data Engineering: Processed and structured a dataset of 500 speech samples, applying speaker diarization and K-Nearest Neighbors algorithms to cleanly segment and isolate relevant speech characteristics.",
      "Model Development: Built and evaluated dual machine learning pipelines, training both a Convolutional Neural Network architecture and an XGBoost classifier to differentiate between normal and hypernasal audio inputs.",
      "Optimization and Selection: Deployed the XGBoost model as the final production solution, selecting it over the deep learning framework due to its lightweight profile, low inference latency, and novelty in this domain.",
    ],
  },
  {
    role: "Undergraduate Teaching Assistant",
    company: "Lahore University of Management Sciences",
    duration: "Jan 2026 – May 2026",
    location: "On-Site / Lahore, Pakistan",
    summary:
      "Served as the Teaching Assistant for the \"Introduction to Arabic Language\" course. Managed core administrative operations and supported student learning throughout the course.",
    description: [
      "Student Support: Held dedicated office hours to provide direct academic assistance, clarify course concepts, and help students improve their performance.",
      "Course Administration & Exam Logistics: Managed daily attendance and participation tracking for the student cohort while coordinating midterms and finals, including invigilation and logistics",
      "Academic Evaluation: Assessed and marked regular assignments, providing constructive feedback to assist students with foundational vocabulary and grammar concepts.",
    ],
  },
  {
    role: "Deep Learning and Medical Imaging Researcher",
    company: "Computer Vision & Graphics Lab",
    duration: "Feb 2025 – Jun 2025",
    location: "Hybrid / Lahore, Pakistan",
    summary:
      "Led a two-person research team to develop an automated pipeline for Tuberculosis (TB) detection from chest X-rays. The project focused on improving diagnostic accuracy and interpretability by combining state-of-the-art CNN-based segmentation with hybrid classification architectures.",
    description: [
      "Data Engineering: Curated and preprocessed a robust dataset of 10,000+ chest X-ray images from multiple public repositories to ensure model generalizability across diverse patient demographics.",
      "Architectural Design: Engineered a dual-phase pipeline utilizing UNet++ for precise lung segmentation and SEResNet50/Swin Transformers for classification, achieving a peak accuracy of 99% and a 96% Dice coefficient.",
      "Explainable AI (XAI): Integrated GradCAM++ visualizations to provide heatmaps of infected regions, enhancing model interpretability and clinical trust for medical practitioners.",
      "Academic Documentation: Authored a comprehensive research paper detailing the methodology and evaluation metrics, including IoU, F1-score, and sensitivity.",
    ],
  },
  {
    role: "Full Stack Web Development Intern",
    company: "Rozee",
    duration: "Jul 2024 – Aug 2024",
    location: "On-Site / Lahore, Pakistan",
    summary:
      "Focused on enhancing platform accessibility by developing AI-driven, automated CV-building solutions. My work centered on creating inclusive tools for users with varying literacy levels utilizing voice-processing technologies.",
    description: [
      "Inclusive Product Development: Engineered a voice-enabled WhatsApp bot using Node.js and JavaScript that guides users through CV creation by asking questions via voice and processing multilingual responses.",
      "AI Implementation: Integrated OpenAI and Azure Speech APIs to provide real-time voice-to-text and language translation, directly enabling job market access for users with limited literacy.",
      "Full-Stack Integration: Developed a text-based chatbot CV builder using Laravel (PHP) to streamline the resume creation process for the general user base.",
    ],
  },
  {
    role: "Research Analyst — Public Policy & Finance",
    company: "FINTRA (LUMS Finance Society)",
    duration: "Sep 2023 – Jun 2024",
    location: "Hybrid / Lahore, Pakistan",
    summary:
      "Conducted deep-dive economic research and policy analysis focused on national social welfare initiatives. My work involved evaluating the intersection of financial technology and government-mandated programs to drive economic inclusion and data-driven governance.",
    description: [
      "Policy Analysis: Authored a featured research article in Bottomline magazine analyzing Pakistan's Ehsaas program, evaluating its macro-economic impact, financial inclusion mechanisms, and overall effectiveness in poverty alleviation.",
      "Comparative Benchmarking: Performed a comparative policy assessment by benchmarking local initiatives against global social protection models, such as Brazil's Bolsa Família, to identify scalability challenges and structural limitations.",
      "FinTech Evaluation: Assessed the efficacy of biometric verification and digital payment systems in reducing fiscal leakages, presenting data-driven insights on how cashless systems improve transparency in public spending.",
    ],
  },
  {
    role: "Sustainability Research Intern",
    company: "WWF - Pakistan",
    duration: "Jul 2021 – Aug 2021",
    location: "Remote / Lahore, Pakistan",
    summary:
      "Participated in a remote program focused on addressing Pakistan's environmental crises through innovative business modeling. The program emphasized the translation of global sustainability standards into practical, localized solutions for resource management and reforestation.",
    description: [
      "Environmental Gap Analysis: Researched and analyzed Pakistan's low forest cover and deforestation rates, identifying the socio-economic drivers behind environmental degradation to inform strategic planning.",
      "Sustainable Business Innovation: Authored and presented a comprehensive business model proposal focused on the distribution of fast-growing, resource-efficient seeds to accelerate nationwide forest regeneration.",
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
    title: "Company Management System",
    description:
      "An end-to-end CRM and business operations platform with automated lead capture.",
    details: {
      overview:
        "Designed and engineered a modular, end-to-end CRM and business operations platform for Arthus Systems, integrated with a custom web scraping extension to automate lead capture, cold outreach, double-entry accounting, and project management.",
      contributions: [
        {
          title: "Browser-to-CRM Lead Ingestion",
          content:
            "Developed a Manifest V3 Chrome extension utilizing network response interception and DOM scraping to capture leads directly from lead generation tools and instantly sync them into a centralized CRM with dynamic audience segmentation.",
        },
        {
          title: "Automated Outreach & Email",
          content:
            "Built a two-way email system (IMAP/SMTP) using Claude AI to personalize cold outreach messages, featuring throttled sending queues and scheduling to prevent damage to the domain.",
        },
        {
          title: "Automated Double-Entry Accounting",
          content:
            "Built a financial module featuring automated ledger postings and Claude Vision-powered receipt parsing to instantly generate core statements like trial balances, income statements, and balance sheets, as well as track expenses and revenue.",
        },
        {
          title: "Project Hub",
          content:
            "Built a project management module to track B2B, B2C, and client milestones, integrating an AES-256-GCM encrypted credentials vault, per-project P&L tracking, and an automated handover-export system.",
        },
      ],
    },
    tags: [
      "React",
      "Supabase",
      "PostgreSQL",
      "Next.js",
      "CRM",
      "Claude AI"
    ],
    githubUrl: "",
    images: ["/CMS1.webp", "/CMS2.webp", "/CMS3.webp", "/CMS4.webp"],
    pdfs: [],
  },
  {
    category: "Software Engineering",
    title: "Power Zone Inventory Management System",
    description:
      "A production-ready Inventory Management System for enterprise diesel generator manufacturing.",
    details: {
      overview:
        "Delivered an end-to-end, production-ready Inventory Management System for a prominent enterprise-level diesel generator manufacturer, Power Zone.",
      contributions: [
        {
          title: "Full Stack Delivery",
          content:
            "Designed and shipped the complete operational flow covering shipments, factory receiving, engine and alternator coupling, order creation and fulfillment, and stock adjustments.",
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
    tags: ["Next.js", "React", "PostgreSQL", "Vercel", "Supabase"],
    githubUrl: "",
    images: ["/IMS1.webp", "/IMS2.webp", "/IMS3.webp"],
    pdfs: [],
  },
  {
    category: "DL/GenAI",
    title: "HippoRAG Replication & Evaluation",
    description:
      "Replication and evaluation of the HippoRAG retrieval framework using Knowledge Graphs.",
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
            "Engineered a custom Python package using igraph for accelerated PageRank routing, abstract LLM layers, and a hybrid dense-graph scoring engine.",
        },
        {
          title: "Resource Optimization",
          content:
            "Executed the pipeline using 4-bit quantized open-weight models on cloud GPUs, implementing state checkpointing and soft time guards across 40 compute hours.",
        },
        {
          title: "Analytical Evaluation",
          content:
            "Benchmarked multi-hop recall metrics and analyzed open-weight LLM failure modes, compiling the insights into a formal NeurIPS style technical report.",
        },
      ],
    },
    tags: ["GraphRAG", "Knowledge Graphs", "Data Engineering", "Data Analysis"],
    githubUrl: "https://github.com/HarisTahir2003/Data-Mining-Project",
    images: [],
    pdfs: [{ name: "Project Report", url: "/Final Report HippoRAG.pdf" }],
  },
  {
    category: "Software Engineering",
    title: "Multiplayer Ludo Game",
    description:
      "A full-stack, server-authoritative multiplayer Ludo game with real-time WebSockets.",
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
            "Developed a complete Ludo rules engine in TypeScript to compute valid moves, safe-zone captures, turn timers, and victory standings entirely on the backend.",
        },
        {
          title: "Matchmaking & Resiliency",
          content:
            "Built a dynamic room management system supporting live lobby broadcasting, automatic player color allocation, session restoration, and a 10-second AI takeover fallback to maintain gameplay continuity if a user disconnects.",
        },
        {
          title: "State Persistence & Metrics",
          content:
            "Designed a MongoDB schema and REST API to manage user accounts, calculate ranked coin reward distributions based on player counts, and track historical match data for a global leaderboard.",
        },
      ],
    },
    tags: ["React", "TypeScript", "MongoDB", "Node.js", "REST APIs", "Socket.IO"],
    githubUrl: "https://github.com/HarisTahir2003/ludo-game",
    images: ["/ludo1.webp", "/ludo2.webp", "/ludo3.webp", "/ludo4.webp", "/ludo5.webp", "/ludo6.webp"],
    pdfs: [],
  },
  {
    category: "DL/GenAI",
    title: "Agentic 10-K Intelligence System",
    description:
      "Agentic NLP pipeline for automated extraction and summarization of SEC 10-K filings.",
    details: {
      overview:
        "Developed a modular NLP pipeline to automate extraction, summarization, and cross-document trend inference from high-density SEC 10-K filings.",
      contributions: [
        {
          title: "Extractive QnA",
          content:
            "Built a RAG pipeline using Gemini 2.0 Flash and ChromaDB, boosting RAGAS Faithfulness from 0.18 to 0.74 through prompting techniques like Chain-of-Thought and Few-Shot prompting.",
        },
        {
          title: "Financial Summarization",
          content:
            "Engineered a summarization engine for earnings transcripts, achieving a 4.39/5.0 G-Eval coherence score for professional investment memos.",
        },
        {
          title: "Agentic Research Agent",
          content:
            "Designed an autonomous Plan-and-Execute agent for multi-year analysis across 50 filings, utilizing a custom Python calculator tool to ensure mathematical precision for complex ratios.",
        },
        {
          title: "Data Engineering",
          content:
            "Implemented semantic element partitioning and custom HTML-to-Markdown table conversion to maintain the structural integrity of complex financial tables.",
        },
      ],
    },
    tags: ["RAG", "LangChain", "ChromaDB", "Gemini", "Prompt Engineering"],
    githubUrl: "https://github.com/HarisTahir2003/NLP_Applications_for_Financial_Reports",
    images: ["/Fin-1.webp", "/Fin-2.webp", "/Fin-3.webp"],
    pdfs: [{ name: "Project Report", url: "/Finance_Project_Report.pdf" }],
  },
  {
    category: "Software Engineering",
    title: "HealthSync",
    description:
      "Android healthcare mobile application connecting patients directly with verified doctors.",
    details: {
      overview:
        "Led a team of five in the end-to-end development of HealthSync, an android mobile application designed to democratize healthcare access by eliminating third-party intermediaries and connecting patients directly with verified doctors.",
      contributions: [
        {
          title: "Full-Stack Architecture",
          content:
            "Built a healthcare mobile app using React Native (TypeScript) with a Django (Python) and MongoDB backend.",
        },
        {
          title: "Core Healthcare Features",
          content:
            "Engineered appointment booking, a live chat system, and automated email notifications to facilitate seamless communication between medical professionals and patients.",
        },
        {
          title: "Secure Credential Management",
          content:
            "Implemented a robust doctor verification system utilizing Firebase Storage for secure document and credential handling.",
        },
        {
          title: "AI Chatbot Integration",
          content:
            "Integrated the DeepSeek API to build an automated chatbot that handles patient queries on the platform.",
        },
      ],
    },
    tags: ["React Native", "Firebase", "Django", "MongoDB", "TypeScript", "Android", "DeepSeek API"],
    githubUrl: "https://github.com/HarisTahir2003/SE-Project-Group-9",
    images: ["/healthsync-1.webp", "/healthsync-2.webp", "/healthsync-3.webp", "/healthsync-4.webp", "/healthsync-5.webp", "/healthsync-6.webp"],
    pdfs: [{ name: "Project Report", url: "/HealthSync_Report.pdf" }],
  },
  {
    category: "AI/ML",
    title: "Urdu Text Classification using Machine Learning models",
    description:
      "End-to-end NLP pipeline for multi-class categorization of Urdu news articles.",
    details: {
      overview:
        "Developed a comprehensive NLP pipeline to categorize Urdu-language news articles into five distinct categories: Entertainment, Business, Sports, Technology, and International. This project addressed the challenges of processing low-resource languages by implementing custom scraping and specialized linguistic preprocessing.",
      contributions: [
        {
          title: "Data Acquisition",
          content:
            "Engineered custom Python scripts to scrape 2,750+ articles from premier news outlets including Geo Urdu, Jang, and Dunya News.",
        },
        {
          title: "Linguistic Preprocessing",
          content:
            "Leveraged the LughaatNLP library to implement text normalization, including lemmatization, stemming, and stopword removal tailored for Urdu script.",
        },
        {
          title: "Comparative Modeling",
          content:
            "Built and evaluated three supervised learning architectures: Multinomial Naive Bayes, Multiclass Logistic Regression, and a Feedforward Neural Network.",
        },
        {
          title: "Performance Metrics",
          content:
            "Achieved a peak accuracy of 97.45% and an F1-score of 0.97 using the Neural Network model, outperforming traditional statistical baselines.",
        },
        {
          title: "End-to-End Documentation",
          content:
            "Authored a technical report visualizing model comparisons and detailing the practical application of deep learning in regional language processing.",
        },
      ],
    },
    tags: ["NLP", "Naive Bayes", "Neural Networks", "Logistic Regression", "Web Scraping"],
    githubUrl: "https://github.com/HarisTahir2003/Machine-Learning-Project",
    images: [],
    pdfs: [{ name: "Project Report", url: "/ML_Project_Report.pdf" }],
  },
  {
    category: "AI/ML",
    title: "Micro-Robot Motion Prediction: ML Algorithm Analysis",
    description:
      "Predictive modeling system to track micro-robot trajectories in obstacle-dense environments.",
    details: {
      overview:
        "Developed a predictive modeling system to track micro-robot trajectories in obstacle-dense environments using K-Nearest Neighbors (KNN) and Regression Trees.",
      contributions: [
        {
          title: "Custom Algorithm Engineering",
          content:
            "Built a KNN algorithm from scratch in Python using custom Euclidean distance and tie-handling functions, optimizing model performance by evaluating RMSE trends against varying k-values to prevent overfitting.",
        },
        {
          title: "Temporal & Predictive Modeling",
          content:
            "Implemented a temporal 'lookback' mechanism to capture time-series dependencies, enabling the model to predict future coordinates based on historical movement data.",
        },
        {
          title: "Trajectory Visualization & Validation",
          content:
            "Developed a comparative visualization suite to map actual robot paths against algorithmic predictions, validating the model's spatial accuracy and generalization.",
        },
      ],
    },
    tags: ["Machine Learning", "Time Series", "KNN", "Regression Trees", "Scikit-Learn", "Data Visualization"],
    githubUrl: "https://github.com/HarisTahir2003/AI_Project",
    images: ["/AIProj-1.webp", "/AIProj-2.webp"],
    pdfs: [],
  },
  {
    category: "AI/ML",
    title: "Study of Socioeconomic Inequality & Career Aspirations",
    description:
      "Statistical analysis of socioeconomic impacts on university major selection and career paths.",
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
    images: ["/Data-1.webp", "/Data-2.webp", "/Data-3.webp"],
    pdfs: [{ name: "Project Report", url: "/DataScience_Project.pdf" }],
  },
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
    image: "/certificate1.webp",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    image: "/certificate2.webp",
  },
  {
    title: "Introduction to Data Science",
    issuer: "Cisco",
    image: "/certificate3.webp",
  },
  {
    title: "Claude Code 101",
    issuer: "Anthropic",
    image: "/certificate4.webp",
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    image: "/certificate5.webp",
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
];
