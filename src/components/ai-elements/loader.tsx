import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
  tone?: "default" | "muted" | "accent";
};

const toneClass: Record<NonNullable<LoaderProps["tone"]>, string> = {
  default: "bg-stone-200",
  muted: "bg-stone-500",
  accent: "bg-amber-400",
};

export const Loader = ({
  className,
  size = 6,
  tone = "default",
  ...props
}: LoaderProps) => {
  const dot = toneClass[tone];
  const style = { width: size, height: size } as const;
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("inline-flex items-end gap-1.5", className)}
      {...props}
    >
      <span
        className={cn("dot-trio-dot rounded-full", dot)}
        style={{ ...style, animationDelay: "0ms" }}
      />
      <span
        className={cn("dot-trio-dot rounded-full", dot)}
        style={{ ...style, animationDelay: "160ms" }}
      />
      <span
        className={cn("dot-trio-dot rounded-full", dot)}
        style={{ ...style, animationDelay: "320ms" }}
      />
    </div>
  );
};
