"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

/**
 * Renders children into document.body so overlays (modals, lightboxes) escape
 * any parent stacking context — e.g. an ancestor with `transform`,
 * `backdrop-filter`, or `filter`, which otherwise traps `position: fixed`.
 *
 * The mount gate avoids SSR hydration mismatches: the portal target
 * (document.body) only exists on the client.
 */
export default function Portal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Subscribe to "the component has mounted on the client" — a legitimate
  // external-system sync, which is exactly what an effect is for here.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return createPortal(children, document.body);
}
