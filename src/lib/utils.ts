/**
 * Minimal `cn` class-name helper.
 *
 * The common shadcn version uses clsx + tailwind-merge; this dependency-free
 * version joins truthy class values, which is all our components need. If a
 * future component requires Tailwind class de-duplication/merging, swap this
 * for `clsx` + `tailwind-merge`.
 */
export type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const walk = (val: ClassValue) => {
    if (!val) return;
    if (Array.isArray(val)) {
      val.forEach(walk);
    } else {
      out.push(String(val));
    }
  };

  inputs.forEach(walk);
  return out.join(" ");
}
