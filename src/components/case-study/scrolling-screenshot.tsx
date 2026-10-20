"use client";

import Image from "next/image";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ImageLightbox } from "@/components/site/image-lightbox";

// A full, tall screen shown in a 16:10 frame that pans through it: 2s at
// the top, 12s down, 2s at the bottom, 12s back up, eased, looping. The
// pan is a transform on the image (keyframes in globals.css), so it runs
// on the compositor with no repaint. Hover or keyboard focus pauses it.
//
// The pan distance is the part of the image that does not fit, as a
// share of the image's own height, so it holds at any frame width.
//
// Under reduced motion there is no pan: the frame opens on the top of the
// screen and scrolls natively, and is focusable so arrow keys scroll it.
// Either way a click opens the whole screen in the lightbox.
export function ScrollingScreenshot({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  // Frame height over image height, at the same width: (10 / 16) / (h / w).
  const travel = (1 - (10 / 16) * (width / height)) * 100;

  return (
    <>
      <div
        className="screen-pan-frame relative w-full overflow-hidden rounded-xl border focus-within:ring-2 focus-within:ring-ring/50"
        style={{
          aspectRatio: "16 / 10",
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
          boxShadow: "var(--frame-shadow)",
          margin: 0,
        }}
      >
        <div
          className={`absolute inset-0 ${reduceMotion ? "overflow-y-auto" : "overflow-hidden"}`}
          tabIndex={reduceMotion ? 0 : undefined}
          role={reduceMotion ? "region" : undefined}
          aria-label={reduceMotion ? `${alt.replace(/\.$/, "")}, scrollable` : undefined}
          style={{ margin: 0 }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Open ${alt.replace(/\.$/, "")}, full screen`}
            className="block w-full cursor-zoom-in text-left outline-none"
            style={{ margin: 0 }}
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="(max-width: 768px) 100vw, 1080px"
              className={`block w-full h-auto ${reduceMotion ? "" : "screen-pan"}`}
              style={
                { "--pan-to": `-${travel.toFixed(3)}%` } as React.CSSProperties
              }
            />
          </button>
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute top-3 right-3 rounded-full px-2.5 py-1 text-[12px] leading-none text-[#6B6B68]"
          style={{
            margin: 0,
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          Full screen ↕
        </span>
      </div>

      <ImageLightbox
        open={open}
        onOpenChange={setOpen}
        frames={[src]}
        caption={caption}
        title={alt}
        closeOnOutsideClick
      />
    </>
  );
}
