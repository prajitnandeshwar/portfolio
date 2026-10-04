import { Fragment } from "react";

type Step = { k: string; title: string; body: string };

// The reconciliation to filing chain. Four numbered steps with arrows
// between them, stacking vertically below 900px where the arrows rotate.
export function ChainDiagram({ steps }: { steps: Step[] }) {
  return (
    <div className="grid grid-cols-1 min-[900px]:grid-cols-[1fr_36px_1fr_36px_1fr_36px_1fr] min-[900px]:items-stretch">
      {steps.map((s, i) => (
        <Fragment key={s.k}>
          <div
            className="rounded-[10px] border p-4"
            style={{ borderColor: "#E5E2DC", backgroundColor: "#FAFAF9" }}
          >
            <div className="text-[12px] font-medium text-[#D97706] mb-1.5">
              {s.k}
            </div>
            <div className="text-[15px] font-medium text-[#1F1F1E] mb-1.5 leading-[1.35]">
              {s.title}
            </div>
            <p className="text-[13.5px] text-[#6B6B68] leading-[1.5]">
              {s.body}
            </p>
          </div>
          {i < steps.length - 1 && <Arrow />}
        </Fragment>
      ))}
    </div>
  );
}

// Thin rule with a head. Horizontal on desktop, vertical when stacked.
export function Arrow() {
  return (
    <div
      className="relative mx-auto my-2 h-6 w-px min-[900px]:my-0 min-[900px]:mx-2 min-[900px]:h-px min-[900px]:w-auto min-[900px]:self-center"
      style={{ backgroundColor: "#CFCFCA" }}
      aria-hidden
    >
      <span
        className="absolute left-1/2 bottom-0 -translate-x-1/2 min-[900px]:left-auto min-[900px]:right-0 min-[900px]:top-1/2 min-[900px]:bottom-auto min-[900px]:translate-x-0 min-[900px]:-translate-y-1/2"
        style={{
          width: 0,
          height: 0,
          borderLeft: "4.5px solid transparent",
          borderRight: "4.5px solid transparent",
          borderTop: "6px solid #CFCFCA",
        }}
      />
    </div>
  );
}
