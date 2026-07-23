// Central content source. Edit these to update the portfolio.

export const profile = {
  name: "Himmalay Devulapalli",
  role: "AI-first Product Manager",
  tagline:
    "I think in products, build like an engineer, and ship for growth.",
  location: "Remote · Global",
  email: "devulapallihimmalay@gmail.com",
  available: true,
  summary:
    "Product leader with a track record of taking 0→1 bets to scale and driving measurable outcomes across B2B SaaS and consumer platforms. I obsess over the customer problem, work backward from outcomes, and align engineering, design, and GTM around a sharp, testable strategy.",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/himmalaydevulapalli" },
    { label: "Email", href: "mailto:devulapallihimmalay@gmail.com" },
    { label: "GitHub", href: "https://github.com/Himmalay-Devulapalli" },
    { label: "Newsletter", href: "https://www.linkedin.com/newsletters/beyond-product-7363879095832645632/" },
  ],
};

export const newsletter = {
  name: "Beyond Product",
  platform: "LinkedIn Newsletter",
  url: "https://www.linkedin.com/newsletters/beyond-product-7363879095832645632/",
  description:
    "Harnessing product management, AI, and automation to build strategies that drive business growth.",
  subscribers: "500+",
  cadence: "Weekly",
  topics: [
    "Product management, decoded",
    "AI & automation in practice",
    "Strategies that drive growth",
  ],
  // Growth & reach (LinkedIn newsletter analytics, past 365 days)
  impact: [
    { value: "5,628", label: "Impressions · 365d" },
    { value: "871", label: "Article views" },
    { value: "500+", label: "Subscribers" },
    { value: "64", label: "Engagements" },
    { value: "6", label: "Editions published" },
    { value: "25%", label: "Readers are Product Managers" },
    { value: "Weekly", label: "Publishing cadence" },
  ],
  // Published editions, newest first
  editions: [
    { n: "06", title: "A 21-year-old founder tried to fix pharmacies. But pharmacies had other plans (and they weren't pretty)." },
    { n: "05", title: "Product, strategy, and shift: when your users are smarter than your roadmap." },
    { n: "04", title: "AI for product teams. Co-pilot or autopilot?" },
    { n: "03", title: "A marketing startup went from a 70% close rate to 20% because of Claude. What might've gone wrong?" },
    { n: "02", title: "One update from OpenAI. One plugin from Anthropic. And your product dies. Are you building in that blind spot?" },
    { n: "01", title: "Unit economics of AI features: the metric every PM should own — and why." },
  ],
};

export const openToWork = {
  status: "Open to work · Available now",
  blurb:
    "I'm looking for Product Manager roles on AI-native and B2B SaaS teams — where I can own strategy and ship 0→1. Remote or hybrid, starting immediately.",
  targets: ["Product Manager", "AI-native · B2B SaaS", "Remote / Hybrid", "Immediate start"],
  proof: [
    { value: "3", label: "AI products shipped" },
    { value: "75%", label: "Ops efficiency delivered" },
    { value: "500+", label: "Newsletter subscribers" },
  ],
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "product-experience", label: "Product Experience" },
  { id: "case-studies", label: "Work" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
] as const;

export const metrics = [
  { value: "3", label: "AI products shipped" },
  { value: "500+", label: "Newsletter subscribers" },
  { value: "6", label: "Newsletter editions" },
  { value: "75%", label: "Ops efficiency delivered" },
];

export type CardMetric = { value: string; from?: string; label: string };

type CardBase = {
  slug: string;
  title: string;
  impact: CardMetric[]; // ROI (project) / results (case study) — powers the stats + image
  href?: string;
  image?: string; // right-half visual; falls back to a styled placeholder
};

// A shipped product I built/owned.
export type ProjectItem = CardBase & {
  kind: "project";
  company: string; // where I worked on it
  period: string; // duration
  problem: string; // the problem / idea
  approach: string[]; // how I approached / built it
  stack: string[]; // technologies used
};

// A written analysis — report, teardown, strategy breakdown.
export type CaseStudyItem = CardBase & {
  kind: "case-study";
  format: string; // "Product Teardown", "Research Report", etc.
  focus: string; // what it analyzes
  summary: string; // one-line overview
  takeaways: string[]; // key findings
  tags: string[]; // topics
};

export type PortfolioItem = ProjectItem | CaseStudyItem;

export const portfolioItems: PortfolioItem[] = [
  // ---- Projects (Medgini) ----
  {
    kind: "project",
    slug: "querybase",
    title: "QueryBase — NL-to-SQL analytics & reporting platform",
    company: "Medgini",
    period: "2025 — Present",
    problem:
      "Financial teams needed insights but couldn't write SQL — every question meant a ticket to the data team.",
    approach: [
      "Architected the platform solo as a builder-PM — schema design through validation",
      "Built a semantic layer mapping business language to database structure",
      "Shipped a Gemini Flash + sqlglot engine for safe, validated SQL translation",
    ],
    stack: ["Gemini Flash", "sqlglot", "Python", "PostgreSQL"],
    impact: [
      { value: "100+", label: "Database tables" },
      { value: "75%", label: "Platform complete" },
      { value: "5+", label: "Projects served" },
    ],
  },
  {
    kind: "project",
    slug: "retail-incentive-saas",
    title: "Retail incentive & rewards claim automation SaaS",
    company: "Medgini",
    period: "Dec 2024 — Present",
    problem:
      "Retailer incentive and cashback claims were reviewed by hand, slowing settlement across pharma clients.",
    approach: [
      "Translated retailer claim workflows into engineering-ready features",
      "Designed & shipped an AI-OCR pipeline that extracts and validates invoice data",
      "Owned delivery end-to-end and ran UAT cycles before each release",
    ],
    stack: ["AWS", "AI-OCR", "REST APIs", "Python"],
    impact: [
      { value: "5+", label: "Pharma clients" },
      { value: "90%", label: "Manual review cut" },
      { value: "99.9%", label: "API uptime" },
    ],
  },
  {
    kind: "project",
    slug: "sales-statement-processing",
    title: "Enterprise sales statement processing & analysis",
    company: "Medgini",
    period: "Dec 2024 — Present",
    problem:
      "Pharma clients needed thousands of complex, multi-format financial statements processed — manually unscalable.",
    approach: [
      "Defined processing needs from stakeholder requirements",
      "Translated them into structured features with edge-case coverage",
      "Integrated an AI-OCR pipeline into the existing analysis system",
    ],
    stack: ["AI-OCR", "Data pipelines", "Python", "AWS"],
    impact: [
      { value: "75%", label: "Efficiency gain" },
      { value: "40%", label: "Resource cost cut" },
      { value: "10k+", label: "Statements / mo" },
    ],
  },

  // ---- Case studies (Beyond Product newsletter editions) ----
  {
    kind: "case-study",
    slug: "pharmacy-founder-teardown",
    title: "A 21-year-old tried to fix pharmacies — and lost",
    format: "Failure Teardown",
    focus: "Pharmacy software startup",
    summary:
      "A post-mortem on a superior pharmacy product that failed pre-launch — false validation, switching costs, and a problem that wasn't a tech problem.",
    takeaways: [
      "Positive survey feedback isn't commitment — 'lip service' isn't validation",
      "Some pen-and-paper holdouts avoid digitizing on purpose (taxes)",
      "Build bridges to legacy systems; don't force a rip-and-replace",
    ],
    tags: ["Discovery", "Validation", "Teardown"],
    impact: [
      { value: "3", label: "Fatal flaws found" },
      { value: "3 mo", label: "Built before re-validating" },
      { value: "0", label: "Real commitments" },
    ],
    href: "https://www.linkedin.com/pulse/21-year-old-founder-tried-fix-pharmacies-had-other-devulapalli-4yh5c/",
  },
  {
    kind: "case-study",
    slug: "platform-risk-ryze",
    title: "From 70% to 20% close rate — because of Claude",
    format: "Platform Risk Analysis",
    focus: "Ryze AI (marketing)",
    summary:
      "How a profitable AI marketing startup collapsed in weeks when Anthropic shipped its core feature natively — a study in platform absorption risk.",
    takeaways: [
      "Filling a platform's gap isn't a moat — the platform can close it",
      "In the AI era, platform risk lands in weeks, not years",
      "Ask if you're building a business or a soon-to-be native feature",
    ],
    tags: ["Platform Risk", "AI Strategy", "Analysis"],
    impact: [
      { value: "20%", from: "70%", label: "Close rate" },
      { value: "$500M+", label: "Ad spend managed" },
      { value: "23", label: "Countries served" },
    ],
    href: "https://www.linkedin.com/pulse/marketing-startup-went-from-70-close-rate-20-because-what-himmalay-vctac/",
  },
  {
    kind: "case-study",
    slug: "platform-risk-auditor",
    title: "Is your product one update away from extinction?",
    format: "AI Tool",
    focus: "Platform risk auditing",
    summary:
      "A free AI tool I built — a Claude Skill that audits any product for platform-absorption and democratization risk in about 3 minutes.",
    takeaways: [
      "Reads your landing page and asks 3 questions specific to your product",
      "Scores absorption + democratization risk and names your real moat",
      "Ends with one priority action for the next 90 days",
    ],
    tags: ["AI Tool", "Platform Risk", "buildwithai"],
    impact: [
      { value: "3 min", label: "Full audit" },
      { value: "2", label: "Risk types scored" },
      { value: "3", label: "Targeted questions" },
    ],
    href: "https://www.linkedin.com/posts/himmalaydevulapalli_productmanagement-ai-buildwithai-activity-7442866889019723776-bpMs",
  },
  {
    kind: "case-study",
    slug: "unit-economics-ai-features",
    title: "Unit economics of AI features — the metric every PM should own",
    format: "Strategy Analysis",
    focus: "AI feature cost structure",
    summary:
      "Why inference cost belongs on the PM's dashboard next to churn and activation — after a silent model swap tripled our cost per invoice.",
    takeaways: [
      "A silent model upgrade tripled cost per invoice — PMs must watch inference cost",
      "Track the Inference-to-Value (I2V) ratio, not state-of-the-art benchmarks",
      "Defensibility comes from data loops and workflow depth, not the best model",
    ],
    tags: ["Unit Economics", "AI Strategy", "Analysis"],
    impact: [
      { value: "3x", label: "Cost per invoice jump" },
      { value: "300%", label: "Cost for +5% accuracy" },
      { value: "30%", label: "Cost at 98% of value" },
    ],
    href: "https://www.linkedin.com/pulse/unit-economics-ai-feature-metric-every-pm-should-own-why-devulapalli-yqgle/",
  },
];

export const skills = [
  "Product strategy",
  "Roadmapping",
  "Discovery & research",
  "Experimentation (A/B)",
  "Data & SQL",
  "Pricing & packaging",
  "Go-to-market",
  "Stakeholder alignment",
  "Roadmap prioritization",
  "AI/ML products",
];

export const principles = [
  {
    title: "Outcomes over output",
    body: "Ship to move a metric, not to close a ticket. Every bet has a hypothesis and a measure of success.",
  },
  {
    title: "Customer truth first",
    body: "Talk to users weekly. The roadmap is a set of testable beliefs, refined by evidence.",
  },
  {
    title: "Strategy is what you say no to",
    body: "Sharp focus beats a long backlog. Sequence ruthlessly toward the wedge that compounds.",
  },
];

export type Role = {
  company: string;
  title: string;
  type?: string;
  period: string;
  start: string; // "YYYY-MM"
  end?: string; // "YYYY-MM"; omit for present
  location: string;
  highlights: string[];
  skills?: string[];
};

export const experience: Role[] = [
  {
    company: "Medgini",
    title: "Associate Product Manager",
    type: "Full-time",
    period: "Sep 2024 — Present",
    start: "2024-09",
    location: "Hyderabad, India · On-site",
    highlights: [
      "Built and shipped an automated loyalty & rewards processing SaaS for pharma and healthcare clients.",
      "Shipped an OCR-based financial document processing pipeline, eliminating manual workflows.",
      "Owned PRDs, user stories, and the product roadmap end to end.",
    ],
    skills: ["Product Management", "Product Planning", "PRDs", "Roadmapping", "OCR / AI"],
  },
  {
    company: "FoundersLab",
    title: "Tech Incubation Associate",
    type: "Full-time",
    period: "Jul 2023 — Aug 2024",
    start: "2023-07",
    end: "2024-08",
    location: "Hyderabad, India · On-site",
    highlights: [
      "Supported early-stage product incubation, partnering with founders from concept to validation.",
      "Drove stakeholder engagement and discovery across incubated ventures.",
    ],
    skills: ["Stakeholder Engagement", "Product Discovery", "Attention to Detail"],
  },
  {
    company: "BuiltinTech",
    title: "Junior Product Associate",
    type: "Full-time",
    period: "Oct 2022 — Mar 2023",
    start: "2022-10",
    end: "2023-03",
    location: "Hyderabad, India · On-site",
    highlights: [
      "Defined product-market fit and translated business requirements into wireframes and mockups.",
      "Authored PRDs and product roadmaps in close partnership with the engineering team.",
    ],
    skills: ["PRD", "Agile", "Wireframing", "Product-Market Fit"],
  },
];

// --- Tenure helpers (LinkedIn-style inclusive month counting) ---

function ym(s: string) {
  const [y, m] = s.split("-").map(Number);
  return { y, m: m - 1 };
}

function monthsBetween(start: string, end?: string) {
  const s = ym(start);
  const now = new Date();
  const e = end ? ym(end) : { y: now.getFullYear(), m: now.getMonth() };
  return Math.max(1, (e.y - s.y) * 12 + (e.m - s.m) + 1); // both ends inclusive
}

// e.g. "1 yr 11 mos", "1 yr 2 mos", "6 mos"
export function roleDuration(start: string, end?: string) {
  const total = monthsBetween(start, end);
  const yrs = Math.floor(total / 12);
  const mos = total % 12;
  const parts: string[] = [];
  if (yrs) parts.push(`${yrs} yr${yrs > 1 ? "s" : ""}`);
  if (mos) parts.push(`${mos} mo${mos > 1 ? "s" : ""}`);
  return parts.join(" ");
}

// Total worked months across all roles (no overlaps).
export function totalExperienceMonths() {
  return experience.reduce((sum, r) => sum + monthsBetween(r.start, r.end), 0);
}
