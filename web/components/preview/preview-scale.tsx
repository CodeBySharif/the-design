"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/** Virtual desktop width the preview is designed at before scaling into the panel. */
export const PREVIEW_DESIGN_WIDTH = 960;

interface PreviewScaleProps {
  children: ReactNode;
  /** Re-measure when this changes (e.g. site type / typography). */
  watchKey?: string;
}

/**
 * Renders children at a fixed desktop width, then scales them down to fit the
 * available panel width. Absolute positioning + guarded updates avoid the
 * scrollbar ↔ scale feedback loop that looked like “vibration”.
 */
export function PreviewScale({ children, watchKey }: PreviewScaleProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(0);
  const rafRef = useRef(0);
  const lastRef = useRef({ scale: 1, height: 0 });

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return;

    // Allow the next measure to apply even if values are close to the previous site type.
    lastRef.current = { scale: -1, height: -1 };

    const apply = (nextScale: number, nextHeight: number) => {
      const roundedScale = Math.round(nextScale * 1000) / 1000;
      const roundedHeight = Math.round(nextHeight);
      const prev = lastRef.current;

      if (
        Math.abs(prev.scale - roundedScale) < 0.002 &&
        Math.abs(prev.height - roundedHeight) < 2
      ) {
        return;
      }

      lastRef.current = { scale: roundedScale, height: roundedHeight };
      setScale(roundedScale);
      setContentHeight(roundedHeight);
    };

    const measure = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const available = viewport.clientWidth;
        if (available <= 0) return;

        const nextScale = Math.min(1, available / PREVIEW_DESIGN_WIDTH);
        // offsetHeight is the unscaled layout size (transform does not affect it).
        const nextHeight = content.offsetHeight;
        apply(nextScale, nextHeight);
      });
    };

    measure();

    const ro = new ResizeObserver(measure);
    // Only width of the viewport and intrinsic content size — not a loop on our own height style.
    ro.observe(viewport);
    ro.observe(content);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [watchKey]);

  const scaledHeight = contentHeight > 0 ? contentHeight * scale : undefined;

  return (
    <div
      ref={viewportRef}
      className="relative w-full overflow-hidden"
      style={{
        height: scaledHeight,
        // Avoid fractional height flicker against the scrollport.
        contain: "layout",
      }}
    >
      <div
        ref={contentRef}
        className="absolute top-0 left-0"
        style={{
          width: PREVIEW_DESIGN_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          // Out of flow so unscaled layout height cannot shove the panel scrollbar on/off.
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}
