"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageLightbox } from "@/components/site/image-lightbox";

// The full dashboard rebuilt as the app it came from: the top bar and the
// left icon rail stay put, and only the page content scrolls, on demand,
// under them. Nothing moves until the reader scrolls.
//
// The screenshot is cut into three slices at the app's own borders (see
// /public/work/notice-tracker/dashboard-*.png). Every size here is a share
// of the original 2732 x 1540 window, so the slices line up at any width:
//
//   top bar   2732 x 80, across the top
//   rail      96 x 1460, down the left, below the top bar
//   content   2636 x 2316, the scrolling area
//
// A click on the content opens the whole screen in the lightbox. The
// content area is focusable: arrow keys scroll it and Enter opens it.
const APP_W = 2732;
const APP_H = 1540;
const TOP = 80;
const RAIL = 96;

export function ScrollingScreenshot({
  topbar,
  rail,
  content,
  full,
  alt,
  caption,
}: {
  topbar: string;
  rail: string;
  content: { src: string; width: number; height: number };
  full: string;
  alt: string;
  caption: string;
}) {
  const [open, setOpen] = useState(false);
  const label = alt.replace(/\.$/, "");

  return (
    <>
      <div
        className="relative w-full overflow-hidden rounded-xl border bg-white"
        style={{
          aspectRatio: `${APP_W} / ${APP_H}`,
          borderColor: "var(--border)",
          boxShadow: "var(--frame-shadow)",
          margin: 0,
        }}
      >
        <Image
          src={topbar}
          alt=""
          width={APP_W}
          height={TOP}
          sizes="(max-width: 768px) 100vw, 1080px"
          className="absolute top-0 left-0 z-10 block w-full h-auto"
          style={{ margin: 0 }}
        />
        <Image
          src={rail}
          alt=""
          width={RAIL}
          height={APP_H - TOP}
          sizes="40px"
          className="absolute left-0 z-10 block h-auto"
          style={{
            top: `${(TOP / APP_H) * 100}%`,
            width: `${(RAIL / APP_W) * 100}%`,
            margin: 0,
          }}
        />

        <div
          tabIndex={0}
          role="region"
          aria-label={`${label}, scrollable. Press Enter to open full screen`}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setOpen(true);
          }}
          className="absolute right-0 bottom-0 overflow-y-auto cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/50"
          style={{
            top: `${(TOP / APP_H) * 100}%`,
            left: `${(RAIL / APP_W) * 100}%`,
            scrollbarWidth: "thin",
            margin: 0,
          }}
        >
          <Image
            src={content.src}
            alt={alt}
            width={content.width}
            height={content.height}
            sizes="(max-width: 768px) 100vw, 1080px"
            className="block w-full h-auto"
            style={{ margin: 0 }}
          />
        </div>
      </div>

      <ImageLightbox
        open={open}
        onOpenChange={setOpen}
        frames={[full]}
        caption={caption}
        title={alt}
        closeOnOutsideClick
      />
    </>
  );
}
