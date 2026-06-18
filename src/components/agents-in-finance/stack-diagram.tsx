import { NAVY } from "./constants";

// Five-layer stack: Point of view, Primitives, Patterns, System, Proof.
// Primitives is the load-bearing middle layer and gets the navy fill so
// it visually carries the page's argument (the layer between belief and
// component is where direction is enforced).
//
// Coded SVG-style layout but rendered as a div stack so the type stays
// crisp at any zoom and Inter applies.

const LAYERS: { name: string; description: string; isKey?: boolean }[] = [
  {
    name: "Point of view",
    description: "What AI-native means here, stated as beliefs with teeth",
  },
  {
    name: "Primitives",
    description: "Ten named rules between agent and user",
    isKey: true,
  },
  {
    name: "Patterns",
    description: "Compositions of primitives, mapped to recurring jobs",
  },
  {
    name: "System",
    description: "Tokens and components inside Mint, Clear's design system",
  },
  {
    name: "Proof",
    description: "Global Recon, one flagship flow carrying every contract",
  },
];

export function StackDiagram() {
  return (
    <div className="flex flex-col gap-2 my-2">
      {LAYERS.map((layer) => (
        <div
          key={layer.name}
          className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 rounded-lg px-4 md:px-5 py-3 md:py-3.5"
          style={
            layer.isKey
              ? {
                  backgroundColor: NAVY.bg,
                  borderColor: NAVY.bg,
                  border: "1px solid",
                  boxShadow: "0 4px 16px rgba(14,23,51,0.18)",
                }
              : {
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E2DC",
                }
          }
        >
          <span
            className="text-[14px] font-semibold md:w-[140px] md:flex-none"
            style={{ color: layer.isKey ? NAVY.fg : "#1F1F1E" }}
          >
            {layer.name}
          </span>
          <span
            className="text-[13px] leading-[1.55]"
            style={{ color: layer.isKey ? NAVY.muted : "#6B6B68" }}
          >
            {layer.description}
          </span>
        </div>
      ))}
    </div>
  );
}
