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

  // No src: render the placeholder treatment. Dashed border, soft
  // cream background, the caption text centred inside as a muted
  // description of the asset that will eventually go here. Designed so
  // a real image becomes a one-line swap: add src={...} and the same
  // caption keeps reading correctly.
  return (
    <div
      style={{
        aspectRatio: aspect,
        backgroundColor: "#FAFAF9",
      }}
      className="relative w-full rounded-xl overflow-hidden flex items-center justify-center px-6 md:px-12 py-6"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-xl"
        style={{ border: "1.5px dashed #E5E2DC" }}
      />
      <p className="relative text-[13px] md:text-[14px] text-[#9C9C97] text-center max-w-xl leading-[1.5]">
        Placeholder. {caption}
      </p>
    </div>
  );
}
