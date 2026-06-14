"use client";

import SimpleIcon, { getBrandColor } from "@/components/SimpleIcon";
import { techLogos, type TechLogo } from "@/data/portfolio";

function Chip({ item, ariaHidden }: { item: TechLogo; ariaHidden?: boolean }) {
  const brand = getBrandColor(item.slug, item.name);
  return (
    <li
      aria-hidden={ariaHidden}
      style={{ color: brand }}
      className="flex shrink-0 items-center gap-2.5 px-7"
    >
      <SimpleIcon slug={item.slug} name={item.name} size={26} />
      <span className="whitespace-nowrap text-base font-medium">
        {item.name}
      </span>
    </li>
  );
}

export default function TechMarquee() {
  return (
    <div className="marquee-group marquee-mask relative w-full overflow-hidden py-2">
      {/* Track: the list is rendered twice for a seamless loop */}
      <ul className="animate-marquee flex w-max items-center">
        {techLogos.map((item, i) => (
          <Chip key={`a-${item.name}-${i}`} item={item} />
        ))}
        {techLogos.map((item, i) => (
          <Chip key={`b-${item.name}-${i}`} item={item} ariaHidden />
        ))}
      </ul>
    </div>
  );
}
