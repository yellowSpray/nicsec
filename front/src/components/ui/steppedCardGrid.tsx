import type { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Columns {
  base: number;
  sm?: number; // >= 40rem
  md?: number; // >= 60rem
  lg?: number; // >= 68.75rem
}

interface SteppedCardGridProps<T> {
  items: T[];
  columns: Columns;
  /** Renders one card; `dividers` holds its border classes (border-r / border-b) */
  renderItem: (item: T, dividers: string) => ReactNode;
  /** Fill of the card blocks */
  surfaceClassName?: string;
  /** Background around the grid (used to draw the concave corners) */
  outsideClassName?: string;
}

/**
 * Concave rounded corner where the narrower last row meets the block above.
 * The square takes the card colour (the corner belongs to the shape), then a
 * quarter circle in the outside colour, with a border, is drawn on top of it.
 */
function JoinCorner({ side, surface, outside }: { side: "left" | "right"; surface: string; outside: string }) {
  const position = side === "left"
    ? "-left-[var(--radius-second)]"
    : "-right-[var(--radius-second)]";
  const arc = side === "left"
    ? "border-t border-r rounded-tr-second"
    : "border-t border-l rounded-tl-second";
  const box = `absolute -top-px ${position} w-[calc(var(--radius-second)+1px)] h-[calc(var(--radius-second)+1px)] pointer-events-none`;
  return (
    <>
      <span aria-hidden="true" className={`${box} ${surface}`} />
      <span aria-hidden="true" className={`${box} ${arc} ${outside} border-background`} />
    </>
  );
}

/**
 * Joined card block with thin dividers and rounded corners.
 * An incomplete last row is centered in a narrower block attached below,
 * with concave rounded corners at the join.
 */
export default function SteppedCardGrid<T>({
  items,
  columns,
  renderItem,
  surfaceClassName = "bg-white",
  outsideClassName = "bg-white",
}: SteppedCardGridProps<T>) {
  const isSm = useMediaQuery("(min-width: 40rem)");
  const isMd = useMediaQuery("(min-width: 60rem)");
  const isLg = useMediaQuery("(min-width: 68.75rem)");

  const smCols = columns.sm ?? columns.base;
  const mdCols = columns.md ?? smCols;
  const lgCols = columns.lg ?? mdCols;
  const cols = isLg ? lgCols : isMd ? mdCols : isSm ? smCols : columns.base;

  const lastCount = items.length % cols;
  const fullItems = items.slice(0, items.length - lastCount);
  const lastItems = items.slice(items.length - lastCount);
  const fullRows = fullItems.length / cols;

  return (
    <div>
      <div
        className={`grid border-card overflow-hidden ${surfaceClassName}`}
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {fullItems.map((item, index) =>
          renderItem(item, [
            index % cols < cols - 1 ? "border-r" : "",
            Math.floor(index / cols) < fullRows - 1 ? "border-b" : "",
          ].join(" "))
        )}
      </div>

      {lastItems.length > 0 && (
        // Narrower block attached right below; the bottom border of the block above stays visible
        <div
          className="relative mx-auto"
          style={{ width: `${(lastItems.length / cols) * 100}%` }}
        >
          <div
            className={`grid border border-t-0 border-background rounded-b-second overflow-hidden ${surfaceClassName}`}
            style={{ gridTemplateColumns: `repeat(${lastItems.length}, minmax(0, 1fr))` }}
          >
            {lastItems.map((item, index) =>
              renderItem(item, index < lastItems.length - 1 ? "border-r" : "")
            )}
          </div>
          <JoinCorner side="left" surface={surfaceClassName} outside={outsideClassName} />
          <JoinCorner side="right" surface={surfaceClassName} outside={outsideClassName} />
        </div>
      )}
    </div>
  );
}
