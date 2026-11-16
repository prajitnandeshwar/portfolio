import { Card } from "@/components/ui/card";

// Pattern C: the breakthrough, drawn rather than screenshotted. The same
// three government documents shown twice: as Version 0 listed them (three
// unrelated rows) and as the shipped product groups them (one case, three
// stages). Drawn in code so it stays sharp and needs no cleaned export.
// The IDs are illustrative, in the portal's real format.

const NOTICES = [
  { id: "ZA2907220114398", form: "ASMT-10", stage: "Intimation", date: "12 Jul 2025" },
  { id: "ZA2909220871264", form: "DRC-01", stage: "Notice", date: "03 Sep 2025" },
  { id: "ZA2912220540917", form: "DRC-07", stage: "Order", date: "14 Dec 2025" },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </div>
  );
}

export function NoticeVsCase({ caption }: { caption?: string }) {
  return (
    <figure className="my-8 md:my-10" style={{ marginLeft: 0, marginRight: 0 }}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {/* Version 0: what the portal returns */}
        <div>
          <Label>Version 0: three notices</Label>
          <div className="space-y-2">
            {NOTICES.map((n) => (
              <Card key={n.id} size="sm" className="gap-1 px-4 shadow-none">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[13px] text-[#1F1F1E]">{n.id}</span>
                  <span className="text-[12px] text-[#6B6B68]">{n.date}</span>
                </div>
                <div className="text-[12px] text-[#6B6B68]">
                  {n.form} · Karnataka
                </div>
              </Card>
            ))}
          </div>
          <p className="mt-3 text-[14px] leading-[1.5] text-[#6B6B68]" style={{ margin: 0, marginTop: "0.75rem" }}>
            Three IDs, months apart. Nothing says they are the same dispute.
          </p>
        </div>

        {/* Shipped: one case, three stages */}
        <div>
          <Label>Shipped: one case</Label>
          {/* data-[size=sm]:py-0 is needed: the small Card adds its own
              12px top/bottom padding through a size rule that plain py-0
              cannot beat, which left a white strip above the header. */}
          <Card size="sm" className="gap-0 px-0 py-0 shadow-none ring-1 ring-[#E6CFAC] data-[size=sm]:py-0">
            <div className="flex items-baseline justify-between gap-3 border-b border-[#E5E2DC] bg-[#F8F1E6] px-4 py-3">
              <span className="text-[13px] font-semibold text-[#1F1F1E]">
                Case <span className="font-mono">AD290722011439</span>
              </span>
              <span className="text-[12px] text-[#9A6B2F]">Order stage</span>
            </div>
            <ol className="relative px-4 pb-7 pt-3" style={{ margin: 0, listStyle: "none" }}>
              {[...NOTICES].reverse().map((n, i) => (
                <li key={n.id} className="relative flex gap-3 pb-3 last:pb-0">
                  <span className="relative mt-1.5 flex flex-col items-center">
                    <span
                      className={`size-2 rounded-full ${i === 0 ? "bg-[#C1955C]" : "bg-[#C9C6BF]"}`}
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[13px] font-medium text-[#1F1F1E]">{n.stage}</span>
                      <span className="text-[12px] text-[#6B6B68]">{n.date}</span>
                    </div>
                    <div className="font-mono text-[12px] text-[#6B6B68]">
                      {n.form} · {n.id}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
          <p className="mt-3 text-[14px] leading-[1.5] text-[#6B6B68]" style={{ margin: 0, marginTop: "0.75rem" }}>
            One Case ID. The reference IDs become history inside it.
          </p>
        </div>
      </div>
      {caption ? (
        <figcaption className="text-[14px] text-[#6B6B68]" style={{ margin: 0, marginTop: "1.25rem" }}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
