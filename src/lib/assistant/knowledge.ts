import {
  profile,
  experience,
  portfolioItems,
  newsletter,
  openToWork,
  skills,
  principles,
} from "@/lib/data";

const stat = (m: { value: string; label: string }) => `${m.value} ${m.label}`;

// Assembles a single grounded knowledge base from the site's own data, so the
// assistant always answers from the same facts shown on the page.
export function buildKnowledge(): string {
  const projects = portfolioItems.filter((p) => p.kind === "project");
  const cases = portfolioItems.filter((p) => p.kind === "case-study");

  const exp = experience
    .map(
      (r) =>
        `- ${r.title} — ${r.company} (${r.period}${r.type ? `, ${r.type}` : ""}), ${r.location}. ${r.highlights.join(
          " "
        )} Skills: ${(r.skills ?? []).join(", ")}.`
    )
    .join("\n");

  const proj = projects
    .map(
      (p) =>
        p.kind === "project" &&
        `- ${p.title} (${p.company}, ${p.period}). Problem: ${p.problem} Approach: ${p.approach.join(
          "; "
        )}. Tech: ${p.stack.join(", ")}. Results: ${p.impact.map(stat).join(", ")}.`
    )
    .join("\n");

  const cs = cases
    .map(
      (c) =>
        c.kind === "case-study" &&
        `- "${c.title}" — ${c.format} on ${c.focus}. ${c.summary} Takeaways: ${c.takeaways.join(
          "; "
        )}. Topics: ${c.tags.join(", ")}. Stats: ${c.impact.map(stat).join(", ")}.${
          c.href ? ` Link: ${c.href}` : ""
        }`
    )
    .join("\n");

  return `
# About ${profile.name}
${profile.name} is an ${profile.role} (${profile.location}). Current title: Associate Product Manager at Medgini.
Positioning: an AI-first product manager and builder-PM who ships AI products end to end — from framing the problem to a shipped, validated product — and writes about product and AI.
Summary: ${profile.summary}
Tagline: ${profile.tagline}
Contact email: ${profile.email}. His LinkedIn, GitHub and newsletter links are in the site's Connect section.

# Work experience
${exp}

# Projects (built at Medgini)
${proj}

# Case studies & writing (Beyond Product newsletter editions)
${cs}

# Newsletter — ${newsletter.name}
A ${newsletter.platform.toLowerCase()}, published ${newsletter.cadence.toLowerCase()}. ${newsletter.description} Subscribers: ${newsletter.subscribers}. Reach (LinkedIn analytics): ${newsletter.impact
    .map(stat)
    .join(", ")}. Editions published: ${newsletter.editions.map((e) => e.title).join(" | ")}. Subscribe: ${newsletter.url}

# Technical & product abilities
Product craft: ${skills.join(", ")}.
Hands-on tech (from his projects): Gemini Flash, sqlglot, Python, PostgreSQL, AWS, AI-OCR pipelines, REST APIs, data pipelines, RAG & evals, SQL.
He's a builder-PM: he architected QueryBase solo — from schema design to validation — without a dedicated engineering team.

# How he works (principles)
${principles.map((p) => `- ${p.title}: ${p.body}`).join("\n")}

# Work preferences & availability
Status: ${openToWork.status}.
Looking for: ${openToWork.blurb}
Good fit: ${openToWork.targets.join(", ")}.
Proof points: ${openToWork.proof.map(stat).join(", ")}.
He is open to opportunities; the fastest way to reach him is the Contact section (email ${profile.email}).
`.trim();
}
