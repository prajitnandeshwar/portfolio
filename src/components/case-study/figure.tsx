"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { ImageLightbox } from "@/components/site/image-lightbox";

type FigureProps = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  caption: string;
  // "Demo data" or "Masked". Omitted on the diagrams, which need no
  // provenance note.
  tag?: string;
  // Caps the visible height of a tall screenshot, cropping from the top.
  cropHeight?: number;
  priority?: boolean;
  // Diagrams and tables pass their own content instead of an image.
  children?: ReactNode;
};

// One figure in the case study flow. Screenshots use the same frame as the
// Notice Tracker case study (surface fill, border token, shared frame
// shadow) and open the same lightbox on click. Diagrams and tables pass
// children and render unframed, inside their own Frame.
export function Figure({
  src,
  alt,
  width,
  height,
  caption,
  tag,
  cropHeight,
  priority = false,
  children,
}: FigureProps) {
  const [open, setOpen] = useState(false);
  const label = alt ?? caption;

  return (
    <figure className="my-10 md:my-12">
      {src && width && height ? (
        <>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Open ${label}`}
            className="block w-full text-left cursor-zoom-in"
            style={{ margin: 0 }}
          >
            <div
              className="w-full overflow-hidden rounded-xl border"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "var(--frame-shadow)",
                maxHeight: cropHeight ? `${cropHeight}px` : undefined,
                margin: 0,
              }}
            >
              <Image
                src={src}
                alt={label}
                width={width}
                height={height}
                priority={priority}
                loading={priority ? undefined : "lazy"}
                sizes="(max-width: 1080px) 100vw, 1080px"
                className="block w-full h-auto"
              />
            </div>
          </button>

          <ImageLightbox
            open={open}
            onOpenChange={setOpen}
            frames={[src]}
            caption={caption}
            title={label}
          />
        </>
      ) : (
        children
      )}

      <Caption caption={caption} tag={tag} />
    </figure>
  );
}

function Caption({ caption, tag }: { caption: string; tag?: string }) {
  return (
    <figcaption
      className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] text-[#6B6B68] leading-[1.5]"
      style={{ margin: 0, marginTop: "1rem" }}
    >
      <span>{caption}</span>
      {tag && (
        <span
          className="text-[11px] uppercase tracking-[0.14em] text-[#9C9C97] border rounded-full px-2.5 py-1"
          style={{ borderColor: "#E5E2DC" }}
        >
          {tag}
        </span>
      )}
    </figcaption>
  );
}

// Shared frame for the diagrams and tables that are not screenshots.
// Same border, fill and shadow as a framed screenshot.
export function Frame({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-xl border p-5 md:p-8"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
        boxShadow: "var(--frame-shadow)",
      }}
    >
      {children}
    </div>
  );
}
