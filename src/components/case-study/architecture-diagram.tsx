import { Fragment } from "react";
import { Arrow } from "./chain-diagram";

type Node = { title: string; sub?: string };
type Column = { heading?: string; nodes: Node[]; emphasis?: boolean };

// Country logic on one side, one rendering skill in the middle, the boards
// a tax team opens on the other. Stacks to a single column below 900px.
export function ArchitectureDiagram({ columns }: { columns: Column[] }) {
  return (
    <div className="grid grid-cols-1 min-[900px]:grid-cols-[1fr_60px_1fr_60px_1fr] min-[900px]:items-center">
      {columns.map((col, i) => (
        <Fragment key={i}>
          <div className="grid gap-2.5">
            <div className="text-[12.5px] text-[#6B6B68] mb-1 min-h-[1.2em]">
              {col.heading ?? " "}
            </div>
            {col.nodes.map((n) => (
              <div
                key={n.title}
                className="rounded-[10px] border px-4 py-3.5 text-[14.5px]"
                style={
                  col.emphasis
                    ? {
                        borderColor: "#1F1F1E",
                        backgroundColor: "#1F1F1E",
                        color: "#FFFFFF",
                        textAlign: "center",
                        padding: "26px 16px",
                      }
                    : {
                        borderColor: "#E5E2DC",
                        backgroundColor: "#FAFAF9",
                        color: "#1F1F1E",
                      }
                }
              >
                {n.title}
                {n.sub && (
                  <span
                    className="block text-[12.5px] mt-0.5"
                    // The rendering skill is the one piece that does not vary by
                    // country, so it carries the accent, like the matrix row that
                    // says what stays identical.
                    style={{ color: col.emphasis ? "#D97706" : "#6B6B68" }}
                  >
                    {n.sub}
                  </span>
                )}
              </div>
            ))}
          </div>
          {i < columns.length - 1 && <Arrow />}
        </Fragment>
      ))}
    </div>
  );
}
