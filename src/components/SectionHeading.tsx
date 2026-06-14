import Reveal from "@/components/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  /** plain part of the title */
  title: string;
  /** highlighted (gradient) part of the title */
  accent?: string;
  description?: string;
}) {
  return (
    <Reveal>
      <div className="mb-12 md:mb-16">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="font-display mt-3 text-3xl md:text-5xl font-semibold tracking-tight text-ink">
          {title} {accent && <span className="text-gradient">{accent}</span>}
        </h2>
        {description && (
          <p className="mt-4 max-w-2xl text-ink-muted leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
