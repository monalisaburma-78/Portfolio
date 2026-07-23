// ============================================================
// portfolioData.js — Centralized configuration for Monalisa Burma's Portfolio
// All external links, personal info, and content in one place.
// Update this file to change any content across the entire site.
// ============================================================

export const personalInfo = {
  name: "Monalisa Burma",
  firstName: "Monalisa",
  brandName: "Monalisa",
  title: "Data Scientist · ML & GenAI Engineer",
  location: "Pune, India",
  phone: "+91 95565 19480",
  emails: {
    primary: "burmamonalisa78@gmail.com",
    secondary: "monalisaburma@gmail.com",
  },
  summary:
    "Data Scientist with 1+ years of experience building and deploying production-grade ML and GenAI solutions. Specialized in LLM applications, NLP, and scalable AI systems using Python, FastAPI, and cloud platforms.",
  resumeUrl: "/Monalisa_Burma_CV.pdf",
};

export const socialLinks = {
  github: "https://github.com/monalisaburma-78",
  linkedin: "https://www.linkedin.com/in/monalisaburma/",
  email: "mailto:burmamonalisa78@gmail.com",
};

// Prefilled "hire me" mailto used by Navbar + Hero
export const hireMeMailto =
  "mailto:burmamonalisa78@gmail.com?subject=Opportunity%20%E2%80%93%20Data%20Scientist%20Role&body=Hi%20Monalisa%2C%0D%0A%0D%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity%20with%20you.%0D%0A%0D%0ALooking%20forward%20to%20connecting.%0D%0A%0D%0ABest%20regards%2C";

export const heroContent = {
  greeting: "Hi, I'm Monalisa",
  titleHighlight: "Data Scientist & GenAI Engineer",
  subtitle:
    "I build and deploy production-grade ML & GenAI systems — LLM applications, NLP, and time-series intelligence with Python, FastAPI, and the cloud.",
  ctaPrimary: { text: "View My Work", href: "#projects" },
  ctaSecondary: { text: "Contact Me", href: "#contact" },
  ctaResume: { text: "Download CV", href: "/Monalisa_Burma_CV.pdf" },
  terminal: [
    "import torch",
    "from transformers import pipeline",
    "",
    "model = load_llm('production')",
    "> deploying intelligent systems... ✓",
  ],
};

export const aboutContent = {
  heading: "About Me",
  bio: `I'm <span class="text-white text-xl font-black mx-1 tracking-wide">Monalisa Burma</span>, a Data Scientist based in Pune, India. I turn messy, real-world data into reliable, production-grade intelligence — from LSTM-driven industrial forecasting to LLM & RAG applications that ship. I care about models that survive contact with production, not just notebooks.`,
  techStack: ["Python", "PyTorch / TensorFlow", "LangChain & LLMs"],
};

// Impact metrics band
export const impactStats = [
  { value: 100, suffix: "%", label: "Alarm detection rate", sub: "LSTM early-warning model" },
  { value: 90, suffix: "%", label: "Manual effort reduced", sub: "AI migration tooling" },
  { value: 70, suffix: "%", label: "Faster dashboards", sub: "DAX optimization" },
  { value: 94, suffix: "%", label: "Forecast accuracy", sub: "20yr stock time-series" },
];

// Technical Skills — grouped from CV
export const technicalSkills = {
  categories: [
    {
      title: "Languages & Data",
      skills: [
        { name: "Python", level: 95 },
        { name: "SQL", level: 88 },
        { name: "Pandas / NumPy", level: 93 },
      ],
    },
    {
      title: "ML & Deep Learning",
      skills: [
        { name: "Scikit-learn", level: 92 },
        { name: "TensorFlow / Keras", level: 88 },
        { name: "PyTorch", level: 85 },
        { name: "XGBoost / LightGBM", level: 87 },
        { name: "LSTM / Time Series", level: 90 },
      ],
    },
    {
      title: "GenAI & LLMs",
      skills: [
        { name: "LangChain / LangGraph", level: 90 },
        { name: "RAG & Vector DBs", level: 88 },
        { name: "Prompt Engineering", level: 92 },
        { name: "Fine-tuning / Embeddings", level: 84 },
        { name: "Azure OpenAI", level: 82 },
      ],
    },
    {
      title: "NLP & Computer Vision",
      skills: [
        { name: "NER / Token Classification", level: 86 },
        { name: "Text Summarization", level: 85 },
        { name: "Semantic Search", level: 87 },
        { name: "Image Classification (CNN)", level: 84 },
      ],
    },
    {
      title: "MLOps & Web",
      skills: [
        { name: "FastAPI / Flask", level: 90 },
        { name: "Streamlit", level: 88 },
        { name: "Docker", level: 85 },
        { name: "MLflow", level: 80 },
        { name: "GitHub Actions / CI-CD", level: 82 },
      ],
    },
    {
      title: "Tools & Cloud",
      skills: [
        { name: "Power BI / Tableau", level: 88 },
        { name: "Git & GitHub", level: 92 },
        { name: "Google Cloud", level: 80 },
        { name: "n8n", level: 78 },
        { name: "Google Colab", level: 90 },
      ],
    },
  ],
};

// "My Approach" — the data-science lifecycle (animated dashed-line section)
export const approachContent = {
  badge: "My Approach",
  heading: "How I turn raw data into intelligent products",
  description:
    "A structured, experiment-driven workflow that takes an idea from raw signals all the way to a monitored model running in production.",
  cards: [
    {
      number: "01",
      title: "Explore & Analyze",
      text: "Deep EDA on the raw data — understanding distributions, sensor behavior, and business goals before a single model is trained.",
    },
    {
      number: "02",
      title: "Engineer Features",
      text: "Crafting predictive signals — trend, rate-of-change, rolling stats, embeddings — and running comparative experiments to find what actually moves the metric.",
    },
    {
      number: "03",
      title: "Model & Validate",
      text: "Building the right model (LSTM, XGBoost, LLM pipelines), tuning hyperparameters, handling class imbalance, and validating rigorously against real-world conditions.",
    },
    {
      number: "04",
      title: "Deploy & Monitor",
      text: "Shipping via FastAPI, Docker, and CI/CD — then monitoring, doing root-cause analysis, and translating results into clear business insight.",
    },
  ],
  endText: "Shipped to production!",
};

// GenAI & LLM Expertise (4-card grid section)
export const genaiContent = {
  badge: "GenAI Focus",
  heading: "Generative AI & LLM Engineering",
  description:
    "Beyond classical ML, I design and ship LLM-powered systems — from retrieval pipelines to autonomous agents.",
  categories: [
    {
      title: "RAG Systems",
      description: "Retrieval-augmented pipelines over vector databases with embeddings and semantic search for grounded, accurate LLM answers.",
      stats: "Vector DB · Embeddings",
      icon: "🔎",
    },
    {
      title: "Agentic AI",
      description: "Multi-step reasoning agents built with LangChain & LangGraph that plan, call tools, and orchestrate complex workflows.",
      stats: "LangGraph · Tools",
      icon: "🤖",
    },
    {
      title: "Fine-tuning & Prompting",
      description: "Adapting GPT and LLaMA models via fine-tuning and prompt engineering for domain-specific, high-precision tasks.",
      stats: "GPT · LLaMA",
      icon: "🎯",
    },
    {
      title: "NLP & Document AI",
      description: "NER, summarization, token classification, and document parsing that turn unstructured text into structured intelligence.",
      stats: "Transformers · HF",
      icon: "📄",
    },
  ],
};

export const projects = [
  {
    id: "bi-migration",
    number: "01",
    badge: "🚀 Flagship — AI Product",
    title: "AI Tableau → Power BI Migration Suite",
    description:
      "An AI-driven migration platform that converts Tableau dashboards, KPIs, parameters, and calculations into Power BI with 100% metadata retention. Built an LLM + NLP pipeline in FastAPI to transform .twb/.twbx files into .pbip with accurate DAX and visual mappings, plus an AI-powered DAX optimizer using OpenAI GPT and a fine-tuned LLaMA integrated with Azure Analysis Services. Reduced manual migration effort by 90% and improved dashboard load times by 70%.",
    techTags: ["FastAPI", "OpenAI GPT", "Fine-tuned LLaMA", "NLP", "DAX", "Azure"],
    links: {
      github: null,
      demo: null,
    },
    isFlagship: true,
  },
  {
    id: "travel-planner",
    number: "02",
    badge: null,
    title: "Enhanced Travel Planner",
    description:
      "A full-stack GenAI travel planner using FastAPI, React, and Google Gemini that generates personalized itineraries. Integrates real-time weather, currency conversion, interactive maps, budget planning, and PDF export via REST APIs — plus an AI conversational chatbot with voice-assistant capabilities for real-time travel guidance.",
    techTags: ["FastAPI", "Google Gemini", "React", "REST APIs", "Docker"],
    links: {
      github: "https://github.com/monalisaburma-78/Travel_planner",
    },
    isFlagship: false,
  },
  {
    id: "stock-forecasting",
    number: "03",
    badge: null,
    title: "Stock Price Forecasting App",
    description:
      "An LSTM-based time-series forecasting system trained on 20 years of AAPL stock data. Achieved 94% test accuracy with an RMSE of 2.31 through automated preprocessing and feature engineering, deployed as an interactive Streamlit dashboard with technical indicators for real-time analysis.",
    techTags: ["LSTM", "Python", "Streamlit", "Time Series", "Feature Engineering"],
    links: {
      github: "https://github.com/monalisaburma-78/stock-market-forecasting",
    },
    isFlagship: false,
  },
];

// Full-time experience — vertical timeline
export const experienceList = [
  {
    role: "Machine Learning Engineer / Data Scientist",
    organization: "Portalwiz Technologies Pvt. Ltd.",
    location: "Pune, India",
    duration: "May 2026 – Present",
    badge: "Current",
    points: [
      "Built an LSTM deep-learning model predicting equipment alarm conditions 5–10 minutes in advance from real-time industrial sensor data, achieving a 100% detection rate.",
      "Designed a custom loss function for rare-event class imbalance so 80% of alarms were flagged at or before they occurred — enabling proactive operator response.",
      "Engineered predictive features from multi-sensor time-series (trend, rate-of-change, rolling stats) and ran comparative experiments to optimize accuracy.",
      "Delivered root-cause analysis and technical documentation, translating ML results into actionable business insights.",
    ],
  },
  {
    role: "Data Scientist",
    organization: "BI Hub Solutions",
    location: "Remote",
    duration: "Sep 2024 – May 2026",
    badge: "Full-time",
    points: [
      "Led development of an AI-driven Tableau-to-Power BI migration tool converting dashboards, KPIs, parameters, and calculations with 100% metadata retention.",
      "Built an LLM + NLP pipeline in FastAPI to transform .twb/.twbx files into .pbip with accurate DAX and visual mappings.",
      "Launched an AI-powered DAX optimizer using OpenAI GPT and a fine-tuned LLaMA, integrated with Azure Analysis Services.",
      "Reduced manual migration effort by 90%, improved dashboard load times by 70%, and model analysis speed by 60%.",
    ],
  },
];

// Internships — card grid
export const internshipsList = [
  {
    organization: "NullClass",
    role: "Data Science Intern",
    duration: "Jan 2024 – Feb 2024",
    skills: ["CNN eye-state classifier", "Facial landmark tracking", "Real-time alerts", "Driver monitoring"],
    tech: ["Python", "OpenCV", "TensorFlow", "CNN"],
    link: "https://github.com/monalisaburma-78/Drowsiness_Detection",
  },
  {
    organization: "Feynn Labs",
    role: "Machine Learning Intern",
    duration: "Dec 2023 – Jan 2024",
    skills: ["EV market analysis", "Consumer segmentation", "Clustering & regression", "Behavioral trends"],
    tech: ["Python", "Scikit-learn", "Pandas", "Clustering"],
    link: "https://github.com/monalisaburma-78/Feynn-Labs",
  },
];

// Education
export const education = {
  degree: "B.Tech in Mechanical Engineering",
  institution: "Indira Gandhi Institute of Technology",
  location: "Odisha, India",
  cgpa: "8.79",
  duration: "2019 – 2023",
};

// Certifications
export const certificates = {
  featured: [
    {
      name: "Programming Essentials in Python",
      issuer: "Cisco Networking Academy · Jun 2021",
      icon: "🐍",
    },
    {
      name: "Classify Images with TensorFlow on Google Cloud",
      issuer: "Google · May 2024",
      icon: "🧠",
    },
    {
      name: "Cloud SQL",
      issuer: "Google · May 2024",
      icon: "🗄️",
    },
  ],
  viewAllUrl: "https://www.linkedin.com/in/monalisaburma/",
};

// Soft skills
export const softSkillsList = [
  { name: "Problem Solving", icon: "🧩", desc: "Breaking down ambiguous data problems into clean, testable, modular experiments." },
  { name: "Analytical Thinking", icon: "📊", desc: "Reading signal from noise — from sensor streams to consumer behavior — before modeling." },
  { name: "Communication", icon: "💬", desc: "Translating ML results into clear business insight for technical and non-technical stakeholders." },
  { name: "Ownership", icon: "🎯", desc: "Driving projects end-to-end, from raw data to a monitored model running in production." },
  { name: "Adaptability", icon: "🌟", desc: "Quickly picking up new stacks — FastAPI, LangGraph, Azure OpenAI, MLOps tooling." },
  { name: "Attention to Detail", icon: "🔬", desc: "Rigorous validation, class-imbalance handling, and root-cause analysis of model limits." },
  { name: "Collaboration", icon: "🤝", desc: "Working with clients, stakeholders, and cross-functional teams to ship real solutions." },
  { name: "Continuous Learning", icon: "📚", desc: "Staying current with GenAI, agentic systems, and the fast-moving ML research landscape." },
];

export const footerContent = {
  taglines: [
    "Data Science · Machine Learning",
    "GenAI · LLMs · NLP",
    "Python · FastAPI · Cloud",
  ],
  credential: "Data Scientist · 1+ yrs · ML & GenAI",
  copyright: `© ${new Date().getFullYear()} Monalisa Burma · Built with React`,
};

// EmailJS Configuration
// Reads from Vite environment variables (VITE_*). Falls back to a prefilled
// mailto if not configured, so the contact form always works.
export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_EMAILJS_SERVICE_ID",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_EMAILJS_PUBLIC_KEY",
};
