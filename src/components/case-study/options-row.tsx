"use client";

import Image from "next/image";
import { useState } from "react";
import { ScreenshotPlaceholder } from "@/components/case-study/screenshot-placeholder";
import { StatusBadge } from "@/components/case-study/status-badge";
import { ImageLightbox } from "@/components/site/image-lightbox";

// Pattern A: the options considered, small and side by side, each with one
// line on why it lost. Then the shipped version full width underneath. The
// size difference does the talking: the small ones read as "not this".
// Every thumbnail opens full size in the site lightbox, with arrows to step
// through all the options.

type Option = { label: string; src: string; alt: string; verdict: string };

type OptionsRowProps = {
  options: Option[];
  shipped: { label: string; src: string; alt: string; verdict: string; aspect?: string };
  caption?: string;
};

export function OptionsRow({ options, shipped, caption }: OptionsRowProps) {
  const [openAt, setOpenAt] = useState<number | null>(null);

  return (
    <figure className="my-8 md:my-10" style={{ marginLeft: 0, marginRight: 0 }}>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {options.map((option, i) => (
          <div key={option.src}>
            <button
              type="button"
              onClick={() => setOpenAt(i)}
              aria-label={`Open full size: ${option.alt}`}
              // Same hover as the AI placement sketches: the card lifts a
              // little larger with a deeper shadow, so it reads as clickable.
              className="relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-[#E5E2DC] bg-white transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.04] hover:shadow-[0_10px_24px_-6px_rgba(31,31,30,0.18),0_2px_6px_rgba(31,31,30,0.06)] focus-visible:-translate-y-0.5 focus-visible:scale-[1.04] focus-visible:shadow-[0_10px_24px_-6px_rgba(31,31,30,0.18)] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
              style={{ aspectRatio: "16/10", margin: 0 }}
            >
              <Image
                src={option.src}
                alt={option.alt}
                fill
                sizes="(max-width: 768px) 50vw, 260px"
                className="object-cover object-left-top"
              />
            </button>
            <div className="mt-3 flex flex-col items-start gap-1.5">
              <p className="text-[14px] font-medium leading-[1.35] text-[#1F1F1E]" style={{ margin: 0 }}>
                {option.label}
              </p>
              <p className="text-[13px] leading-[1.45] text-[#6B6B68]" style={{ margin: 0 }}>
                {option.verdict}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <ScreenshotPlaceholder
          src={shipped.src}
          alt={shipped.alt}
          caption={shipped.verdict}
          aspect={shipped.aspect ?? "16/9"}
        />
        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
          <StatusBadge status="shipped" label="Shipped version" />
          <p className="text-[14px] font-medium text-[#1F1F1E]" style={{ margin: 0 }}>
            {shipped.label}
          </p>
        </div>
      </div>

      {caption ? (
        <figcaption className="text-[14px] text-[#6B6B68]" style={{ margin: 0, marginTop: "1rem" }}>
          {caption}
        </figcaption>
      ) : null}

      <ImageLightbox
        open={openAt !== null}
        onOpenChange={(o) => !o && setOpenAt(null)}
        frames={options.map((o) => o.src)}
        // Each option gets its own line: its name and why it lost.
        captions={options.map((o) => `${o.label}. ${o.verdict}`)}
        initialIndex={openAt ?? 0}
        caption={caption ?? ""}
        title="Case view options"
      />
    </figure>
  );
}
