import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

// Decision block for case studies. Each one marks a moment where two paths
// were on the table (titles read "X, or Y"), says why one won, and ends on
// the takeaway.
//
// Built on the ShadCN Card with a very pale amber tint so decisions stand
// out from the prose without shouting. The box itself says "a choice was
// made here", so there is no label or icon. The box has two tones: the
// decision and its reasoning on the palest tint, and the lesson in a
// slightly deeper band along the bottom, so the two read as separate parts.

type CallProps = {
  title: string;
  // The one quotable line. Optional on purpose: the page keeps only three,
  // so the ones that remain carry weight.
  takeaway?: ReactNode;
  children: ReactNode;
};

export function Call({ title, takeaway, children }: CallProps) {
  return (
    <Card
      role="note"
      aria-label={`Decision: ${title}`}
      className="my-8 gap-0 rounded-xl bg-[#FBF7F0] py-0 shadow-none ring-1 ring-[#EFE3CF] md:my-10"
    >
      <div className="px-6 py-6 md:px-8 md:py-7">
        <h3 className="text-[20px] font-semibold leading-[1.3] tracking-[-0.01em] text-[#1F1F1E]">
          {title}
        </h3>

        <div className="mt-3 space-y-4 text-[17px] leading-[1.7] text-[#5F5E59] md:leading-[1.6]">
          {children}
        </div>
      </div>

      {takeaway ? (
        <p
          className="border-t border-[#EADBC2] bg-[#F5EBDA] px-6 py-4 text-[16px] font-medium leading-[1.6] text-[#7A4A12] md:px-8 md:py-5"
          style={{ margin: 0 }}
        >
          {takeaway}
        </p>
      ) : null}
    </Card>
  );
}
