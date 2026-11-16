import { CircleCheck, CircleSlash, History } from "lucide-react";

// A quiet status mark for iteration figures: a small icon and a word, no
// pill. Only the statuses that add information get a mark. "Explored"
// shows nothing, because the layout already says those were options
// considered. Shipped is the only one in the site amber, so it is the one
// thing the eye lands on.

export type IterationStatus =
  | "version0"
  | "explored"
  | "replaced"
  | "notShipped"
  | "shipped";

const MARK = {
  shipped: { text: "Shipped", Icon: CircleCheck, className: "text-[#B4610A]" },
  notShipped: { text: "Not shipped", Icon: CircleSlash, className: "text-[#9C8E89]" },
  replaced: { text: "Replaced", Icon: History, className: "text-[#9C9C97]" },
} as const;

export function StatusBadge({
  status,
  label,
}: {
  status: IterationStatus;
  // Overrides the default word, e.g. "Shipped version".
  label?: string;
}) {
  if (status !== "shipped" && status !== "notShipped" && status !== "replaced") {
    return null;
  }
  const { text, Icon, className } = MARK[status];
  return (
    <span className={`inline-flex items-center gap-1 text-[12px] font-medium ${className}`}>
      <Icon aria-hidden className="size-3.5" strokeWidth={2} />
      {label ?? text}
    </span>
  );
}
