import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  index?: string;
};

export default function SectionHeading({ eyebrow, title, description, index }: Props) {
  return (
    <div className="group/heading max-w-2xl">
      <Reveal>
        <SectionEyebrow label={eyebrow} index={index} />
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="mt-5 inline bg-gradient-to-r from-navy to-iris bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 font-display text-[2rem] font-bold leading-[1.1] tracking-tight text-ink transition-[background-size] duration-500 ease-out group-hover/heading:bg-[length:100%_2px] sm:text-[2.5rem]">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.14}>
          <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
