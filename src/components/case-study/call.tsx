import type { ReactNode } from "react";

// Inline decision-call block for case studies. Sits between paragraphs in
// the prose flow and shows the road not taken next to the decision it
// belongs to. Quieter than a section heading, louder than a paragraph.
//
// Structure is deliberately flat: a left rule instead of a card, no
// shadow, no icons, no heavy radius. Colour comes entirely from shadcn
// semantic tokens (foreground, muted-foreground, border) so the block
// inherits the theme rather than pinning its own palette.

type CallProps = {
  title: string;
  takeaway: ReactNode;
  children: ReactNode;
};

export function Call({ title, takeaway, children }: CallProps) {
  return (
    <aside className="my-8 md:my-10 border-l border-border pl-6 md:pl-8 pt-4 md:pt-5 pb-2 md:pb-3">
      <h3 className="text-[20px] font-semibold tracking-[-0.01em] leading-[1.3] text-foreground">
        {title}
      </h3>

      <div className="mt-3 space-y-4 text-[17px] leading-[1.7] md:leading-[1.6] text-muted-foreground">
        {children}
      </div>

      <p className="mt-5 pt-5 border-t border-border text-[16px] font-medium leading-[1.6] text-foreground">
        {takeaway}
      </p>
    </aside>
  );
}
