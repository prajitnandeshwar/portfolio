import type { ReactNode } from "react";

type Takeaway = {
  number: string;
  heading: string;
  body: ReactNode;
};

type TakeawaysProps = {
  takeaways: Takeaway[];
};

// Numbered takeaway blocks. Each separated by a 1px top border. First block
// gets the top border so the first item also reads as bounded. Numbers in
// amber, headings 20px / 600.

export function Takeaways({ takeaways }: TakeawaysProps) {
  return (
    <div>
      {takeaways.map((t) => (
        <div
          key={t.number}
          className="py-7 border-t"
          style={{ borderColor: "#E5E2DC" }}
        >
          <div className="text-[13px] font-medium text-[#D97706] mb-2">
            {t.number}
          </div>
          <h3 className="text-[20px] font-semibold text-[#1F1F1E] tracking-[-0.01em] mb-2.5">
            {t.heading}
          </h3>
          <div className="text-[16px] text-[#6B6B68] leading-[1.6]">
            {t.body}
          </div>
        </div>
      ))}
    </div>
  );
}
