export type CircleLoaderProps = {
  className?: string;
};

/**
 * Dual-ring circular progress indicator (gradient base + counter-rotating arcs + center dot).
 */
export function CircleLoader({ className }: CircleLoaderProps) {
  return (
    <div
      className={["relative mx-auto h-28 w-28 shrink-0", className].filter(Boolean).join(" ")}
      aria-hidden
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-50 via-white to-primary-100/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-primary-100/90" />
      <div className="absolute inset-0 rounded-full border-[6px] border-primary-100/90" />
      <div
        className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-primary-600 border-r-primary-500/85 animate-spin"
        style={{ animationDuration: "0.95s" }}
      />
      <div
        className="absolute inset-3 rounded-full border-[4px] border-transparent border-b-primary-500 border-l-primary-400/80 animate-spin"
        style={{ animationDuration: "1.35s", animationDirection: "reverse" }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-2.5 w-2.5 rounded-full bg-primary-600/90 shadow-sm" />
      </div>
    </div>
  );
}
