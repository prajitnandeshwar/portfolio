import { NAVY } from "./constants";

// Five colours, five rules. The amber swatch appears here because the
// section's job is to show what amber means, not because the page uses
// amber decoratively elsewhere. The live amber usage is reserved for
// the limit demo only.

const SWATCHES: { name: string; color: string; rule: string }[] = [
  {
    name: "Navy",
    color: NAVY.bg,
    rule: "Only the agent speaks here. Nothing else, ever.",
  },
  {
    name: "Ink",
    color: "#1F1F1E",
    rule: "The user's content and actions.",
  },
  {
    name: "Gray",
    color: "#6B6B68",
    rule: "Supporting detail, never the point.",
  },
  {
    name: "Hairline",
    color: "#E5E2DC",
    rule: "Structure without weight.",
  },
  {
    name: "Amber",
    color: "#D97706",
    rule: "One job: something needs a human.",
  },
];

export function PaletteSwatches() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
      {SWATCHES.map((swatch) => (
        <div
          key={swatch.name}
          className="rounded-lg overflow-hidden"
          style={{
            border: "1px solid #E5E2DC",
            backgroundColor: "#FFFFFF",
          }}
        >
          <div className="h-14" style={{ backgroundColor: swatch.color }} />
          <div className="px-3 py-2.5">
            <div className="text-[12px] font-semibold text-[#1F1F1E]">
              {swatch.name}
            </div>
            <div className="text-[11.5px] text-[#6B6B68] leading-[1.45] mt-0.5">
              {swatch.rule}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
