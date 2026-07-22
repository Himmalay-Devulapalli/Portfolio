import { profile } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

// Placeholder Contact section — to be expanded next.
export default function Contact() {
  return (
    <section id="contact" className="border-t border-border pb-20 pt-10 sm:pb-28 sm:pt-12">
      <div className="w-full max-w-5xl px-6 sm:px-10 lg:px-14">
        <Reveal className="group/contact rounded-3xl border border-border bg-navy px-6 py-14 text-center shadow-soft sm:px-12">
          <div className="mx-auto mb-8 max-w-md">
            <SectionEyebrow label="Contact" index="05" tone="light" />
          </div>
          <h2 className="inline bg-gradient-to-r from-white to-sky bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 text-center font-display text-3xl font-bold tracking-tight text-white transition-[background-size] duration-500 ease-out group-hover/contact:bg-[length:100%_2px] sm:text-4xl">
            Let&apos;s build something that matters.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/70">
            Have a product problem worth solving? I&apos;d love to hear about it.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-surface"
          >
            {profile.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
