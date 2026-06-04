import Image from "next/image";

type ScreenshotPlaceholderProps = {
  caption: string;
  src?: string;
  alt?: string;
  aspect?: string;
};

// Renders a real image when src is provided, otherwise a cream-soft
// placeholder block with the small amber "Real screenshot" marker and the
// caption text centred inside.

export function ScreenshotPlaceholder({
  caption,
  src,
  alt,
  aspect = "16/9",
}: ScreenshotPlaceholderProps) {
  if (src) {
    return (
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
