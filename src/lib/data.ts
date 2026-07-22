// Central content source. Edit these to update the portfolio.

export const profile = {
  name: "Himmalay Devulapalli",
  role: "AI-first Product Manager",
  tagline:
    "I think in products, build like an engineer, and ship for growth.",
  location: "Remote · Global",
  email: "himmalay@medgini.com",
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
    "I'm looking for Senior or Lead Product Manager roles on AI-native and B2B SaaS teams — where I can own strategy and ship 0→1. Remote or hybrid, starting immediately.",
  targets: ["Senior / Lead PM", "AI-native · B2B SaaS", "Remote / Hybrid", "Immediate start"],
  proof: [
    { value: "$40M+", label: "ARR influenced" },
    { value: "+38%", label: "Activation lift" },
    { value: "4", label: "0→1 launches" },
  ],
};

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "product-experience", label: "Product Experience" },
  { id: "case-studies", label: "Case studies" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
] as const;

export const metrics = [
  { value: "8+", label: "Years in product" },
  { value: "$40M+", label: "ARR influenced" },
  { value: "30+", label: "Features shipped" },
  { value: "4", label: "0→1 launches" },
];

export type CaseStudy = {
  slug: string;
  title: string;
  company: string; // "Work" — shown top-right
  category: string;
  description: string; // one-line summary under the title
  context: string; // Case Context — how the problem was framed
  built: string[]; // Implementation — verb-led points
  stack: string[]; // Product & Tech used
  impact: { value: string; from?: string; label: string }[];
  href?: string;
  image?: string; // right-half visual; falls back to a styled placeholder
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "onboarding-activation",
    title: "Rebuilding onboarding to lift activation 38%",
    company: "B2B SaaS Platform",
    category: "Growth · Activation",
    description: "Reframed a leaky onboarding funnel around one aha-moment and proved it with experiments.",
    context: "New signups churned before reaching value, and the funnel was unmeasured.",
    built: [
      "Interviewed 20 churned users to locate the aha-moment",
      "Instrumented every step so drop-off was measurable",
      "Ran 12 sequenced A/B tests against the biggest leaks",
    ],
    impact: [
      { value: "38%", from: "18%", label: "Activation rate" },
      { value: "-22%", label: "Time to value" },
      { value: "12", label: "Experiments shipped" },
    ],
    stack: ["Amplitude", "SQL", "Optimizely", "Figma"],
  },
  {
    slug: "platform-zero-to-one",
    title: "0→1 launch of a self-serve analytics product",
    company: "Data Infrastructure",
    category: "0→1 · Strategy",
    description: "Took a self-serve analytics product from zero to GA in two quarters.",
    context: "Enterprises wanted self-serve insights without ticketing the data team.",
    built: [
      "Ran 27 discovery calls to validate the wedge",
      "Scoped and specced the MVP with eng and design",
      "Shipped to GA with design partners as the beachhead",
    ],
    impact: [
      { value: "$6M", label: "New ARR (yr 1)" },
      { value: "27", label: "Design partners" },
      { value: "2 qtrs", label: "Idea to GA" },
    ],
    stack: ["SQL", "Looker", "Segment", "Figma"],
  },
  {
    slug: "pricing-packaging",
    title: "Repackaging plans to grow expansion revenue",
    company: "Consumer Subscription",
    category: "Monetization",
    description: "Restructured pricing tiers around realized value to grow expansion revenue.",
    context: "Flat pricing was disconnected from usage, leaking expansion revenue.",
    built: [
      "Ran a willingness-to-pay study across 400 users",
      "Rebuilt the tiers to map price to value",
      "Migrated the base with grandfathering and comms",
    ],
    impact: [
      { value: "+19%", label: "Net revenue retention" },
      { value: "+11%", label: "Upgrade rate" },
      { value: "3", label: "New tiers" },
    ],
    stack: ["SQL", "Stripe", "Metabase", "Maxio"],
  },
  {
    slug: "ml-recommendations",
    title: "Shipping ML recommendations that users trust",
    company: "Marketplace",
    category: "AI/ML · Discovery",
    description: "Launched a recommendation surface users actually trust — with guardrails and transparency.",
    context: "Generic listings buried relevant inventory and hurt conversion.",
    built: [
      "Set trust and relevance as joint success metrics",
      "Built guardrails and a feedback loop with data science",
      "Launched behind an A/B holdout with a transparency UI",
    ],
    impact: [
      { value: "+24%", label: "Conversion" },
      { value: "+15%", label: "Engagement" },
      { value: "4.6/5", label: "Trust score" },
    ],
    stack: ["Python", "BigQuery", "A/B testing", "Figma"],
  },
  {
    slug: "churn-retention",
    title: "Cutting churn with a proactive health model",
    company: "B2B SaaS Platform",
    category: "Retention · Data",
    description: "Built a proactive health model so teams catch churn risk before renewal.",
    context: "Churn surfaced only at renewal, with no shared definition of 'healthy'.",
    built: [
      "Modeled a health score from 9 product signals",
      "Wired the scores into CS lifecycle plays",
      "Tracked interventions through to renewal outcomes",
    ],
    impact: [
      { value: "15%", from: "22%", label: "Logo churn" },
      { value: "+14%", label: "Net retention" },
      { value: "9", label: "Signals modeled" },
    ],
    stack: ["SQL", "Python", "Amplitude", "Gainsight"],
  },
  {
    slug: "ai-copilot",
    title: "Launching an AI copilot that ships real work",
    company: "Productivity Suite",
    category: "AI/ML · 0→1",
    description: "Shipped an LLM copilot from prototype to GA, gated on a real eval harness.",
    context: "Copilot demos wowed but hallucinated; users wouldn't act on the output.",
    built: [
      "Scoped the copilot to one high-value workflow",
      "Built an eval harness to measure quality objectively",
      "Designed citations and undo so users could act safely",
    ],
    impact: [
      { value: "63%", label: "Weekly active use" },
      { value: "+28%", label: "Task completion" },
      { value: "4.5/5", label: "Trust score" },
    ],
    stack: ["LLM APIs", "Python", "RAG", "Evals", "LangSmith"],
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
