import SectionEyebrow from "@/components/ui/SectionEyebrow";
import CaseFlow from "@/components/sections/CaseFlow";

export default function CaseStudies() {
  return (
    <section id="case-studies" className="border-t border-border bg-surface/50 px-6 pb-20 pt-10 sm:px-10 sm:pb-28 sm:pt-12 lg:px-14">
      <SectionEyebrow label="Projects & Case Studies" index="03" />
      <CaseFlow />
    </section>
  );
}
