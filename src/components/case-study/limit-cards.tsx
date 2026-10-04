type Limit = { title: string; body: string };

// A row of short rules or limits. Used for the Malaysia decisions about
// what a number means, and again for the prospect's stated limits.
export function LimitCards({ limits }: { limits: Limit[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
      {limits.map((l) => (
        <div
          key={l.title}
          className="rounded-[10px] border p-5"
          style={{ borderColor: "#E5E2DC", backgroundColor: "#FFFFFF" }}
        >
          <div className="text-[15px] font-medium text-[#1F1F1E] mb-2 leading-[1.35]">
            {l.title}
          </div>
          <p className="text-[14px] text-[#6B6B68] leading-[1.55]">{l.body}</p>
        </div>
      ))}
    </div>
  );
}
