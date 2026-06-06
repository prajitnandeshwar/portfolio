"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageLightbox } from "@/components/site/image-lightbox";

type ScreenshotPlaceholderProps = {
  caption: string;
  src?: string;
  alt?: string;
  aspect?: string;
};

// Renders a real image when src is provided, otherwise a cream-soft
// placeholder block with the small amber "Real screenshot" marker and the
// caption text centred inside.
//
// When src is provided, the frame is a button: tapping opens the same
// ImageLightbox used in Exhibition and Selected Work, with the screenshot
// fit-to-width and zoomable. The cursor-zoom-in cue advertises this on
// fine-pointer devices.

export function ScreenshotPlaceholder({
  caption,
  src,
  alt,
  aspect = "16/9",
}: ScreenshotPlaceholderProps) {
  const [open, setOpen] = useState(false);

  if (src) {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Open ${alt ?? caption}`}
          className="block w-full text-left cursor-zoom-in"
          style={{ margin: 0 }}
        >
          <div
            style={{
              aspectRatio: aspect,
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              boxShadow: "var(--frame-shadow)",
              margin: 0,
            }}
            className="relative w-full rounded-xl border overflow-hidden"
          >
            <Image
              src={src}
              alt={alt ?? caption}
              fill
              sizes="(max-width: 768px) 100vw, 1080px"
              className="object-cover"
              style={{ objectPosition: "top" }}
            />
          </div>
        </button>

        <ImageLightbox
          open={open}
          onOpenChange={setOpen}
          frames={[src]}
          caption={caption}
          title={alt ?? caption}
        />
      </>
    );
  }

  return (
    <div
      style={{
        aspectRatio: aspect,
        backgroundColor: "#F4F1EB",
        borderColor: "#E5E2DC",
      }}
      className="relative w-full rounded-xl border overflow-hidden flex items-center justify-center"
    >
      <span
        className="absolute top-4 left-5 text-[12px] uppercase tracking-[0.14em] text-muted-foreground"
        style={{ margin: 0 }}
      >
        Real screenshot
      </span>
      <p className="text-[14px] md:text-[15px] text-[#6B6B68] text-center max-w-xl px-8 leading-relaxed">
        {caption}
      </p>
    </div>
  );
}
