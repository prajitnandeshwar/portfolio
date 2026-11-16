import { Card } from "@/components/ui/card";
import { ScreenshotPlaceholder } from "@/components/case-study/screenshot-placeholder";

// Real screens with numbered pins, each pin tied to its note by a dotted
// leader line. Everything sits inside one warm panel so nothing floats,
// and all notes sit in one row of equal cards under both screens.
//
// How the lines line up (desktop): the screens sit in two equal columns
// with a 24px gap. A pin's position across the whole panel is worked out
// with CSS calc: the column's start plus the pin's x percent of the column
// width. Each line is drawn in two pieces at that same position: one
// inside the screenshot (pin down to its bottom edge), one across the gap
// down to the notes row. The notes row splits the panel into equal slices
// in pin order, and each pin sits inside its own slice, so every line
// lands in its own card. On phones the screens stack, the in-between lines
// hide, and the notes stack under both screens.

type Note = { title: string; body: string };

type Pin = {
  n: number;
  // Pin position in percent of the screenshot frame.
  x: number;
  y: number;
  note: Note;
};

type Screen = {
  src: string;
  alt: string;
  caption: string;
  aspect: string;
  pins: Pin[];
};

const GAP_PX = 24;
const LINE = "border-l-[1.5px] border-dashed border-[#DCC29C]";

// Pin position across the whole panel, for a two-column layout.
function panelLeft(col: number, x: number) {
  const colW = `((100% - ${GAP_PX}px) / 2)`;
  return `calc(${col} * (${colW} + ${GAP_PX}px) + ${x / 100} * ${colW})`;
}

function PinDot({ n }: { n: number }) {
  return (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#F6EADB] text-[12px] font-semibold text-[#8A5A22] ring-1 ring-[#E3CBA6]">
      {n}
    </span>
  );
}

export function AnnotatedScreens({
  screens,
  caption,
}: {
  screens: Screen[];
  caption?: string;
}) {
  const pins = screens.flatMap((screen, col) =>
    screen.pins.map((pin) => ({ ...pin, col })),
  );

  return (
    <figure className="my-8 md:my-10" style={{ marginLeft: 0, marginRight: 0 }}>
      {/* No panel behind the figure: the screens and notes sit straight on
          the page (matches Figma frame 57:217). The padding stays so the
          screens keep the same inset as in the design. */}
      <div className="p-4 md:p-6">
        {/* Screens, pins, and the first piece of each line */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {screens.map((screen) => (
            <div key={screen.src} className="relative">
              <ScreenshotPlaceholder
                src={screen.src}
                alt={screen.alt}
                caption={screen.caption}
                aspect={screen.aspect}
              />
              {screen.pins.map((pin) => (
                <div key={pin.n} aria-hidden className="pointer-events-none">
                  <span
                    className={`absolute bottom-0 hidden md:block ${LINE}`}
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  />
                  <span
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-white/80"
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  >
                    <PinDot n={pin.n} />
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* The gap the lines cross on their way to the notes */}
        <div aria-hidden className="relative hidden h-5 md:block">
          {pins.map((pin) => (
            <span
              key={pin.n}
              className={`absolute inset-y-0 ${LINE}`}
              style={{ left: panelLeft(pin.col, pin.x) }}
            />
          ))}
        </div>

        {/* One row of equal note cards */}
        <div
          className="mt-5 grid grid-cols-1 gap-3 md:mt-0 md:[grid-template-columns:var(--cols)]"
          style={{ ["--cols" as string]: `repeat(${pins.length}, minmax(0, 1fr))` }}
        >
          {pins.map((pin) => (
            <Card
              key={pin.n}
              size="sm"
              className="gap-2 bg-white px-4 shadow-none ring-1 ring-[#E5E2DC]"
            >
              <div className="flex items-center gap-2.5">
                <PinDot n={pin.n} />
                <p className="text-[15px] font-semibold leading-[1.3] text-[#1F1F1E]" style={{ margin: 0 }}>
                  {pin.note.title}
                </p>
              </div>
              <p className="text-[14px] leading-[1.5] text-[#6B6B68]" style={{ margin: 0 }}>
                {pin.note.body}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {caption ? (
        <figcaption className="text-[14px] text-[#6B6B68]" style={{ margin: 0, marginTop: "1rem" }}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
