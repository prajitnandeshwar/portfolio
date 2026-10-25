"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MousePointerClick } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// The board lays out from 1100px wide. A narrower frame renders it at
// 1100 and scales it down, so it never reflows into a broken layout.
const BOARD_WIDTH = 1100;

// The live board, embedded. It is a static file with no network requests.
//
// A fixed 16:10 frame, the same width as the other media. It opens on a
// still with a Click to interact button; a click swaps the still for the
// iframe in place, so nothing on the page moves, and the board scrolls
// inside the frame. The iframe only loads on that click.
//
// Below 900px the board is too small to use, so the button gives way to a
// link that opens it in a new tab.
export function LiveEmbed({
  src,
  title,
  still,
}: {
  src: string;
  title: string;
  still: string;
}) {
  const [live, setLive] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxWidth, setBoxWidth] = useState(0);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const ro = new ResizeObserver(([entry]) =>
      setBoxWidth(entry.contentRect.width),
    );
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  const frameWidth = Math.max(boxWidth, BOARD_WIDTH);
  const scale = boxWidth ? boxWidth / frameWidth : 1;

  return (
    <div
      ref={boxRef}
      className="relative w-full overflow-hidden rounded-xl border"
      style={{
        aspectRatio: "16 / 10",
        backgroundColor: "#FFFFFF",
        borderColor: "var(--border)",
        boxShadow: "var(--frame-shadow)",
        margin: 0,
      }}
    >
      {live ? (
        <iframe
          src={src}
          title={title}
          className="absolute top-0 left-0 block border-0"
          style={{
            width: `${frameWidth}px`,
            height: `${frameWidth * 0.625}px`,
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
          }}
        />
      ) : (
        <>
          <Image
            src={still}
            alt={`${title}, still`}
            fill
            sizes="(max-width: 1080px) 100vw, 1080px"
            className="object-cover object-top"
          />
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ margin: 0, backgroundColor: "rgba(250, 250, 249, 0.18)" }}
          >
            <Button
              size="lg"
              onClick={() => setLive(true)}
              className="hidden min-[900px]:inline-flex h-10 px-4 rounded-full shadow-lg"
            >
              <MousePointerClick data-icon="inline-start" />
              Click to interact
            </Button>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-[900px]:hidden h-10 px-4 rounded-full shadow-lg",
              )}
            >
              Open the live board
              <ArrowUpRight data-icon="inline-end" />
            </a>
          </div>
        </>
      )}
    </div>
  );
}
