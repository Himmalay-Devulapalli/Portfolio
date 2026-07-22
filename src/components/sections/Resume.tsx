import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

// Placeholder Resume section — to be expanded next.
export default function Resume() {
  return (
    <section id="resume" className="border-t border-border pb-20 pt-10 sm:pb-28 sm:pt-12">
      <div className="w-full max-w-5xl px-6 sm:px-10 lg:px-14">
        <SectionHeading
          index="04"
          eyebrow="Resume"
          title="The one-page version"
          description="A concise summary of roles, scope, and outcomes — ready to download."
        />
        <Reveal className="mt-14 flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-base font-semibold text-ink">Himmalay — Senior Product Manager</p>
            <p className="mt-1 text-sm text-ink-soft">PDF · updated 2026</p>
          </div>
          <a
            href="/resume.pdf"
            className="inline-flex items-center justify-center rounded-xl bg-navy px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-navy-hover"
          >
            Download resume
          </a>
        </Reveal>
      </div>
    </section>
  );
}
