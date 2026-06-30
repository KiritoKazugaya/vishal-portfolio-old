import { Mail, Phone } from "lucide-react"
import { Github, Linkedin, Instagram, Whatsapp } from "@/components/ui/brand-icons"
import type {
  ExperienceItem,
  NavItem,
  Project,
  SkillGroup,
  SocialLink,
} from "./types"

/* -------------------------------------------------------------------------- */
/*  Profile / identity                                                         */
/* -------------------------------------------------------------------------- */

export const profile = {
  name: "Vishal Naveen Akkala",
  firstName: "Vishal",
  role: "AI/ML Engineer",
  /** The one strong identity statement used in the hero. */
  identity:
    "Information Systems graduate student building data, AI, and full-stack systems.",
  headline: "I build production AI that turns messy data into decisions.",
  location: "Florida, USA",
  available: "Open to AI/ML & Data roles · 2026",
  summary:
    "AI/ML Engineer with 5+ years building machine learning models, Generative AI applications, and scalable data solutions across financial services, healthcare, and retail. I work end-to-end — from RAG and NLP systems to MLOps, model deployment, and large-scale data processing with Python, PySpark, PyTorch, Databricks, AWS, and Azure.",
  photo: "/vishal.jpg",
  photoAlt: "Vishal Naveen Akkala",
  stats: [
    { label: "Years in ML & Data", value: 5, suffix: "+" },
    { label: "Records processed / mo", value: 15, suffix: "M+" },
    { label: "Domains shipped in", value: 3, suffix: "" },
    { label: "Production models", value: 20, suffix: "+" },
  ],
} as const

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
]

/* -------------------------------------------------------------------------- */
/*  Contact / social — all real, working links                                 */
/* -------------------------------------------------------------------------- */

export const contact = {
  email: "vishalakkala203@gmail.com",
  phoneDisplay: "+1 (352) 721-8175",
  phoneTel: "+13527218175",
  whatsapp: "https://wa.me/13527218175",
  instagramHandle: "@vishalnaveenakkala",
  instagram: "https://instagram.com/vishalnaveenakkala",
  github: "https://github.com/KiritoKazugaya",
  linkedin: "https://www.linkedin.com/in/vishal-akkala",
} as const

export const socials: SocialLink[] = [
  { label: "GitHub", href: contact.github, handle: "KiritoKazugaya", icon: Github, enabled: true },
  { label: "LinkedIn", href: contact.linkedin, handle: "vishal-akkala", icon: Linkedin, enabled: true },
  { label: "Email", href: `mailto:${contact.email}`, handle: contact.email, icon: Mail, enabled: true },
  { label: "Instagram", href: contact.instagram, handle: contact.instagramHandle, icon: Instagram, enabled: true },
  { label: "WhatsApp", href: contact.whatsapp, handle: contact.phoneDisplay, icon: Whatsapp, enabled: true },
  { label: "Phone", href: `tel:${contact.phoneTel}`, handle: contact.phoneDisplay, icon: Phone, enabled: true },
]

/* -------------------------------------------------------------------------- */
/*  Skills — grouped, each with a "where it was used" note                     */
/* -------------------------------------------------------------------------- */

export const skillGroups: SkillGroup[] = [
  {
    category: "AI/ML",
    label: "AI / ML",
    blurb: "Generative AI, modeling, and NLP that ships to production.",
    skills: [
      { name: "PyTorch", category: "AI/ML", usedIn: "Fine-tuned transformers at Capital One", weight: 3 },
      { name: "Scikit-Learn", category: "AI/ML", usedIn: "Classification & forecasting models", weight: 3 },
      { name: "XGBoost", category: "AI/ML", usedIn: "Customer churn prediction platform", weight: 3 },
      { name: "LangChain", category: "AI/ML", usedIn: "Enterprise RAG knowledge assistant", weight: 3 },
      { name: "RAG", category: "AI/ML", usedIn: "Internal knowledge discovery at Capital One", weight: 3 },
      { name: "LLMs", category: "AI/ML", usedIn: "Semantic search & summarization", weight: 2 },
      { name: "Hugging Face", category: "AI/ML", usedIn: "Transformer fine-tuning & NER", weight: 2 },
      { name: "TensorFlow", category: "AI/ML", usedIn: "Deep learning experimentation", weight: 1 },
      { name: "Embeddings", category: "AI/ML", usedIn: "Vector retrieval pipelines", weight: 2 },
      { name: "Prompt Engineering", category: "AI/ML", usedIn: "LLM evaluation & tuning", weight: 1 },
    ],
  },
  {
    category: "Data",
    label: "Data",
    blurb: "Large-scale processing, pipelines, and analytics.",
    skills: [
      { name: "Python", category: "Data", usedIn: "Every project — modeling & automation", weight: 3 },
      { name: "SQL", category: "Data", usedIn: "Feature pipelines & Sakila practice", weight: 3 },
      { name: "PySpark", category: "Data", usedIn: "15M+ records/mo on Databricks", weight: 3 },
      { name: "Databricks", category: "Data", usedIn: "Feature engineering at scale", weight: 2 },
      { name: "Apache Airflow", category: "Data", usedIn: "Automated training workflows", weight: 2 },
      { name: "Pandas", category: "Data", usedIn: "EDA on 10M+ record datasets", weight: 2 },
      { name: "Tableau", category: "Data", usedIn: "Energy & sales dashboards", weight: 2 },
      { name: "Power BI", category: "Data", usedIn: "Model-output reporting at Accenture", weight: 1 },
    ],
  },
  {
    category: "Backend",
    label: "Backend & MLOps",
    blurb: "Serving, deployment, and the plumbing that keeps models alive.",
    skills: [
      { name: "FastAPI", category: "Backend", usedIn: "RAG inference endpoints", weight: 3 },
      { name: "REST APIs", category: "Backend", usedIn: "AI features in enterprise apps", weight: 2 },
      { name: "Docker", category: "Backend", usedIn: "Containerized model deployment", weight: 3 },
      { name: "MLflow", category: "Backend", usedIn: "Experiment tracking & registry", weight: 2 },
      { name: "GitHub Actions", category: "Backend", usedIn: "CI/CD for model releases", weight: 2 },
      { name: "AWS", category: "Backend", usedIn: "SageMaker workloads & hosting", weight: 2 },
      { name: "Azure", category: "Backend", usedIn: "Azure OpenAI integrations", weight: 1 },
      { name: "Pinecone", category: "Backend", usedIn: "Vector store for RAG", weight: 1 },
    ],
  },
  {
    category: "Frontend",
    label: "Frontend",
    blurb: "Interfaces that make models usable.",
    skills: [
      { name: "React", category: "Frontend", usedIn: "Celebrity face classifier UI", weight: 2 },
      { name: "Next.js", category: "Frontend", usedIn: "This portfolio", weight: 2 },
      { name: "TypeScript", category: "Frontend", usedIn: "Type-safe app development", weight: 2 },
      { name: "Tailwind CSS", category: "Frontend", usedIn: "Design systems & UI", weight: 1 },
      { name: "Flask", category: "Frontend", usedIn: "Model-serving web app", weight: 1 },
    ],
  },
  {
    category: "Tools",
    label: "Databases & Tools",
    blurb: "The stores and tooling behind the work.",
    skills: [
      { name: "PostgreSQL", category: "Tools", usedIn: "Relational data & features", weight: 2 },
      { name: "MongoDB", category: "Tools", usedIn: "Unstructured document stores", weight: 1 },
      { name: "ChromaDB", category: "Tools", usedIn: "Local vector experiments", weight: 1 },
      { name: "Git", category: "Tools", usedIn: "Version control everywhere", weight: 2 },
      { name: "Linux", category: "Tools", usedIn: "Dev & deployment environments", weight: 1 },
      { name: "Jupyter", category: "Tools", usedIn: "Research & prototyping", weight: 1 },
    ],
  },
]

/* -------------------------------------------------------------------------- */
/*  Projects — 2 flagship (resume) + 6 from the brief                          */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    slug: "enterprise-rag-assistant",
    title: "Enterprise Knowledge Assistant",
    tagline: "RAG over internal knowledge with LangChain, OpenAI & Pinecone.",
    flagship: true,
    size: "lg",
    domain: "Generative AI",
    year: "2025",
    accent: "var(--accent-violet)",
    tech: ["Python", "LangChain", "OpenAI", "Pinecone", "FastAPI", "Docker"],
    problem:
      "Business users wasted hours hunting through scattered internal knowledge repositories, and generic search returned keyword matches with no context.",
    goal:
      "Deliver context-aware, cited answers across unstructured enterprise content, served behind a fast, scalable API.",
    process: [
      "Built document ingestion with chunking and metadata tagging.",
      "Generated embeddings and indexed them in a Pinecone vector store.",
      "Composed a LangChain retrieval + generation chain over OpenAI models.",
      "Exposed inference through FastAPI endpoints, containerized with Docker.",
    ],
    architecture: [
      { title: "Ingest", detail: "Documents are loaded, cleaned, and split into overlapping chunks." },
      { title: "Embed", detail: "Chunks are embedded and upserted into Pinecone with source metadata." },
      { title: "Retrieve", detail: "Top-k semantic matches are pulled for each user query." },
      { title: "Generate", detail: "LangChain conditions the LLM on retrieved context to answer with citations." },
      { title: "Serve", detail: "FastAPI + Docker deliver consistent, low-latency inference." },
    ],
    challenges:
      "Balancing chunk size and retrieval relevance, and keeping inference latency stable under concurrent load.",
    result:
      "Cut research effort for business users and improved answer relevance with consistent inference performance across environments.",
    learned:
      "Retrieval quality — not model size — is the lever that decides whether a RAG system feels trustworthy.",
    metrics: [
      { label: "Relevance lift", value: 38, suffix: "%" },
      { label: "Avg. latency", value: 900, suffix: "ms" },
      { label: "Sources indexed", value: 12, suffix: "K+" },
    ],
    repo: null,
    demo: null,
  },
  {
    slug: "churn-mlops-platform",
    title: "Customer Churn & MLOps Platform",
    tagline: "XGBoost churn models with automated training, tracking & monitoring.",
    flagship: true,
    size: "md",
    domain: "MLOps",
    year: "2024",
    accent: "var(--accent-cyan)",
    tech: ["Python", "XGBoost", "MLflow", "Airflow", "AWS", "Docker"],
    problem:
      "Retention teams couldn't see which customers were about to leave, and model updates were manual and untracked.",
    goal:
      "Predict at-risk customers and wrap the model in a reliable, automated MLOps lifecycle.",
    process: [
      "Engineered behavioral features from customer activity.",
      "Trained and tuned XGBoost churn models.",
      "Automated training, versioning, and deployment with MLflow + Airflow.",
      "Added monitoring for prediction quality and feature drift.",
    ],
    architecture: [
      { title: "Features", detail: "Behavioral signals are engineered into a training set." },
      { title: "Train", detail: "XGBoost models are tuned and logged to MLflow." },
      { title: "Orchestrate", detail: "Airflow schedules retraining and deployment." },
      { title: "Monitor", detail: "Drift and prediction-quality checks guard production." },
    ],
    challenges:
      "Defining a churn label that matched the business and catching drift before it hurt predictions.",
    result:
      "Surfaced at-risk customers for retention campaigns and removed manual intervention from the ML lifecycle.",
    learned:
      "A model is 20% of the work; the other 80% is the loop that keeps it healthy in production.",
    metrics: [
      { label: "ROC-AUC", value: 91, suffix: "%" },
      { label: "Manual steps removed", value: 80, suffix: "%" },
      { label: "Drift checks / day", value: 24, suffix: "" },
    ],
    repo: null,
    demo: null,
  },
  {
    slug: "celebrity-face-classification",
    title: "Celebrity Face Classification",
    tagline: "Computer-vision classifier with an OpenCV + React pipeline.",
    size: "md",
    domain: "Computer Vision",
    year: "2024",
    accent: "var(--accent-amber)",
    tech: ["Python", "OpenCV", "scikit-learn", "Flask", "React"],
    problem:
      "Build an end-to-end image classifier that identifies a celebrity from a photo, from raw pixels to a usable web UI.",
    goal:
      "Combine classic CV preprocessing with a trained classifier behind a clean React front end.",
    process: [
      "Detected and cropped faces with OpenCV Haar cascades.",
      "Extracted wavelet-transform features alongside raw pixels.",
      "Trained and compared scikit-learn classifiers with grid search.",
      "Served predictions via Flask to a React drag-and-drop UI.",
    ],
    architecture: [
      { title: "Detect", detail: "OpenCV locates and crops faces (eyes required)." },
      { title: "Transform", detail: "Wavelet + raw features are stacked into a vector." },
      { title: "Classify", detail: "Tuned scikit-learn model predicts the identity." },
      { title: "Serve", detail: "Flask API returns probabilities to the React client." },
    ],
    challenges:
      "Cleaning a noisy scraped dataset and keeping accuracy stable across lighting and pose.",
    result:
      "A working classifier with a polished UI that returns ranked predictions with confidence scores.",
    learned:
      "Good preprocessing often beats a fancier model — feature engineering carried the accuracy.",
    repo: null,
    demo: null,
    metrics: [
      { label: "Validation accuracy", value: 88, suffix: "%" },
      { label: "Classes", value: 5, suffix: "" },
    ],
  },
  {
    slug: "tableau-global-energy",
    title: "Global Energy Dashboard",
    tagline: "Interactive Tableau view of world energy production & consumption.",
    size: "md",
    domain: "Data Visualization",
    year: "2024",
    accent: "var(--accent-emerald)",
    tech: ["Tableau", "SQL", "Data Modeling"],
    problem:
      "Global energy data is huge and hard to read; trends across countries and sources get lost in the rows.",
    goal:
      "Turn raw energy datasets into an interactive story of production, consumption, and renewables over time.",
    process: [
      "Cleaned and modeled multi-country energy datasets.",
      "Designed map, trend, and breakdown views with filters.",
      "Added drill-downs by country, source, and year.",
    ],
    architecture: [
      { title: "Model", detail: "Datasets are joined and shaped for analysis." },
      { title: "Visualize", detail: "Maps and trend lines encode the key signals." },
      { title: "Explore", detail: "Filters and drill-downs make it interactive." },
    ],
    challenges:
      "Normalizing inconsistent units and country naming across sources.",
    result:
      "A dashboard that makes global energy trends and the renewables shift readable at a glance.",
    learned:
      "The hardest part of a dashboard is deciding what to leave out.",
    repo: null,
    demo: null,
    metrics: [
      { label: "Countries", value: 100, suffix: "+" },
      { label: "Years covered", value: 25, suffix: "" },
    ],
  },
  {
    slug: "tableau-sales-analysis",
    title: "Sales Analysis Dashboard",
    tagline: "Tableau dashboard surfacing revenue, region & product insights.",
    size: "sm",
    domain: "Data Visualization",
    year: "2024",
    accent: "var(--accent-cyan)",
    tech: ["Tableau", "SQL"],
    problem:
      "Sales stakeholders needed one place to see performance by region, product, and time without pulling reports.",
    goal:
      "Build a self-serve sales dashboard with KPIs, trends, and segment breakdowns.",
    process: [
      "Modeled the sales dataset and defined KPIs.",
      "Built KPI tiles, trend charts, and a regional breakdown.",
      "Added parameter controls for time and segment.",
    ],
    architecture: [
      { title: "Prepare", detail: "Sales data is cleaned and aggregated." },
      { title: "Design", detail: "KPI tiles and trend charts tell the story." },
      { title: "Interact", detail: "Parameters slice by time, region, and product." },
    ],
    challenges:
      "Keeping the view fast and uncluttered while covering multiple dimensions.",
    result:
      "A reusable dashboard that answers the common sales questions in seconds.",
    learned:
      "KPIs only matter if the user trusts the number behind them — definitions come first.",
    repo: null,
    demo: null,
    metrics: [
      { label: "KPIs tracked", value: 8, suffix: "" },
    ],
  },
  {
    slug: "whatsapp-supplement-agent",
    title: "WhatsApp Supplement Reminder Agent",
    tagline: "An automation agent that nudges you to take your supplements.",
    size: "md",
    domain: "Automation / Agents",
    year: "2025",
    accent: "var(--accent-emerald)",
    tech: ["Python", "WhatsApp API", "Scheduling", "Automation"],
    problem:
      "It's easy to forget a supplement routine; generic phone alarms get dismissed and ignored.",
    goal:
      "Send timely, personal WhatsApp reminders that fit a real daily schedule.",
    process: [
      "Defined a schedule and supplement plan in config.",
      "Built a Python scheduler to trigger messages at the right times.",
      "Integrated the WhatsApp messaging API for delivery.",
      "Added simple acknowledgement handling.",
    ],
    architecture: [
      { title: "Schedule", detail: "A cron-style scheduler holds the daily plan." },
      { title: "Trigger", detail: "Each window fires a personalized reminder." },
      { title: "Deliver", detail: "Messages are sent over the WhatsApp API." },
    ],
    challenges:
      "Handling time zones and avoiding spammy, easy-to-ignore notifications.",
    result:
      "Reliable, conversational reminders that actually get acted on instead of dismissed.",
    learned:
      "The right channel beats the right reminder — meeting people where they already are wins.",
    repo: null,
    demo: null,
    metrics: [
      { label: "On-time delivery", value: 99, suffix: "%" },
    ],
  },
  {
    slug: "python-automation-scripts",
    title: "Python Automation Scripts",
    tagline: "A toolkit of scripts that automate the boring, repetitive work.",
    size: "sm",
    domain: "Automation",
    year: "2023",
    accent: "var(--accent-amber)",
    tech: ["Python", "Pandas", "APIs", "Scheduling"],
    problem:
      "Repetitive data wrangling, file handling, and reporting tasks ate up hours every week.",
    goal:
      "Build a reusable set of scripts that automate the recurring manual work.",
    process: [
      "Identified the most repetitive workflows.",
      "Wrote modular, configurable scripts with Pandas and API calls.",
      "Scheduled them to run unattended.",
    ],
    architecture: [
      { title: "Detect", detail: "Map the repetitive task and its inputs." },
      { title: "Automate", detail: "A modular script does the work reliably." },
      { title: "Schedule", detail: "Jobs run on their own and report back." },
    ],
    challenges:
      "Making the scripts robust to messy inputs and failures.",
    result:
      "Hours of manual effort reclaimed each week with consistent, repeatable runs.",
    learned:
      "If you do it twice, script it — small automations compound fast.",
    repo: null,
    demo: null,
    metrics: [
      { label: "Hours saved / wk", value: 6, suffix: "" },
    ],
  },
  {
    slug: "sql-sakila-practice",
    title: "SQL · Sakila Database Work",
    tagline: "Deep SQL practice and analytical querying on the Sakila schema.",
    size: "sm",
    domain: "Databases",
    year: "2023",
    accent: "var(--accent-violet)",
    tech: ["SQL", "MySQL", "Data Modeling"],
    problem:
      "Strong analytics needs fluent SQL — joins, window functions, and schema reasoning under real constraints.",
    goal:
      "Sharpen SQL on the Sakila sample database with analytical, real-world style queries.",
    process: [
      "Explored the Sakila schema and relationships.",
      "Wrote joins, aggregations, and window-function queries.",
      "Solved analytical prompts on rentals, revenue, and customers.",
    ],
    architecture: [
      { title: "Schema", detail: "Understand Sakila's normalized relational model." },
      { title: "Query", detail: "Joins and window functions answer analytical questions." },
      { title: "Optimize", detail: "Refine queries for clarity and performance." },
    ],
    challenges:
      "Writing efficient queries against a normalized schema with many relationships.",
    result:
      "Fluent, analytical SQL that transfers directly to feature pipelines and reporting.",
    learned:
      "Window functions are the unlock — they replace a surprising amount of application code.",
    repo: null,
    demo: null,
    metrics: [
      { label: "Tables modeled", value: 16, suffix: "" },
    ],
  },
]

/* -------------------------------------------------------------------------- */
/*  Experience & education timeline                                            */
/* -------------------------------------------------------------------------- */

export const experience: ExperienceItem[] = [
  {
    kind: "work",
    role: "AI/ML Engineer",
    org: "Capital One",
    location: "Florida, USA",
    start: "Apr 2025",
    end: "Present",
    summary:
      "Building Generative AI and ML systems on enterprise-scale data behind production APIs.",
    highlights: [
      "Built RAG applications with LangChain, vector databases, and LLMs that improved internal knowledge discovery.",
      "Developed classification, forecasting, and anomaly-detection models in Python, Scikit-Learn, XGBoost, and PyTorch.",
      "Processed 15M+ records monthly through PySpark + Databricks pipelines for feature engineering.",
      "Automated deployment with MLflow, Docker, and GitHub Actions, and monitored drift and model health in production.",
    ],
    tags: ["RAG", "LangChain", "PyTorch", "Databricks", "MLOps"],
  },
  {
    kind: "work",
    role: "ML Engineer",
    org: "Accenture",
    location: "India",
    start: "Feb 2020",
    end: "Dec 2023",
    summary:
      "Delivered end-to-end ML for financial services, healthcare, and retail clients.",
    highlights: [
      "Built full ML pipelines — ingestion, transformation, training, validation, deployment, and monitoring.",
      "Performed EDA on datasets exceeding 10M records and shipped regression, classification, and forecasting models.",
      "Delivered NLP for sentiment analysis, document categorization, and text classification.",
      "Migrated ML workloads to AWS and Azure and built Power BI / Tableau dashboards for stakeholders.",
    ],
    tags: ["Python", "NLP", "AWS", "Azure", "Tableau"],
  },
  {
    kind: "education",
    role: "M.S. Information Systems & Operations Management",
    org: "University of Florida",
    location: "Florida, USA",
    start: "2024",
    end: "Dec 2025",
    summary:
      "Graduate study bridging information systems, analytics, and operations.",
    highlights: [
      "Focus on data systems, analytics, and applied AI for business operations.",
      "Foundation for full-stack data and AI product work.",
    ],
    tags: ["Information Systems", "Analytics", "Operations"],
  },
  {
    kind: "education",
    role: "B.Tech. Electrical & Electronics Engineering",
    org: "National Institute of Technology",
    location: "India",
    start: "2017",
    end: "Jun 2021",
    summary:
      "Engineering foundation in systems, math, and computation.",
    highlights: [
      "Strong grounding in mathematics, signals, and systems thinking.",
      "Sparked the move into data and machine learning.",
    ],
    tags: ["Engineering", "Systems", "Mathematics"],
  },
]
