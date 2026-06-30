"use client";

import Link from "next/link";

type Props = {
  categoryLabel: string;
  title: string;
  step: number;
  totalSteps: number;
  stepperLabels: readonly string[];
  progressPercent: number;
  showBack: boolean;
  onBack: () => void;
  exitHref?: string;
  /** When set, exit/back-on-first-step use this callback instead of navigation links (e.g. modal flows). */
  onExit?: () => void;
  exitLabel?: string;
  /** When false, hides the top-right exit control. Default true. */
  showExit?: boolean;
  children: React.ReactNode;
};

export function AppMultiStepFlowShell({
  categoryLabel,
  title,
  step,
  totalSteps,
  stepperLabels,
  progressPercent,
  showBack,
  onBack,
  exitHref = "/app",
  onExit,
  exitLabel = "Voltar ao painel",
  showExit = true,
  children,
}: Props) {
  const exitControl =
    onExit != null ? (
      <button
        type="button"
        onClick={onExit}
        className="w-10 h-10 rounded-full border border-secondary-200 text-secondary-700 hover:bg-secondary-50 inline-flex items-center justify-center shrink-0"
        aria-label={exitLabel}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    ) : (
      <Link
        href={exitHref}
        className="text-secondary-600 hover:text-secondary-900 inline-flex items-center gap-1 text-sm font-comfortaa shrink-0 self-center"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {exitLabel}
      </Link>
    );

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white overflow-hidden">
      <header className="shrink-0 px-5 pt-5 pb-4">
        <div className="grid grid-cols-[auto,1fr,auto] items-center gap-x-3">
          <div className="shrink-0">
            {showBack ? (
              <button
                type="button"
                onClick={onBack}
                className="h-10 rounded-full border border-secondary-200 bg-white px-4 font-comfortaa text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
              >
                {"< Voltar"}
              </button>
            ) : onExit != null ? (
              <button
                type="button"
                onClick={onExit}
                className="inline-flex h-10 items-center rounded-full border border-secondary-200 bg-white px-4 font-comfortaa text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
              >
                Voltar
              </button>
            ) : (
              <Link
                href={exitHref}
                className="inline-flex h-10 items-center rounded-full border border-secondary-200 bg-white px-4 font-comfortaa text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
              >
                Voltar
              </Link>
            )}
          </div>
          <p className="min-w-0 text-center font-comfortaa text-sm font-semibold text-secondary-900 truncate px-1">
            {categoryLabel}
          </p>
          <div className="shrink-0 flex justify-end">
            {showExit ? (
              exitControl
            ) : (
              <div
                className="invisible h-10 w-10 inline-flex items-center justify-center"
                aria-hidden
              >
                ×
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-between gap-2">
          {stepperLabels.map((name, i) => {
            const s = i + 1;
            const isActive = s === step;
            const isCompleted = s < step;
            return (
              <div
                key={name}
                className={`flex flex-col items-center flex-1 min-w-0 ${
                  isActive ? "text-secondary-900" : isCompleted ? "text-secondary-600" : "text-secondary-400"
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-baloo font-semibold shrink-0 mb-1 ${
                    isActive
                      ? "bg-accent-500 text-secondary-900"
                      : isCompleted
                        ? "bg-accent-400/80 text-secondary-900"
                        : "bg-secondary-200 text-secondary-500"
                  }`}
                >
                  {isCompleted ? "✓" : s}
                </span>
                <span className="font-comfortaa text-[10px] md:text-xs text-center truncate w-full">{name}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 h-2 bg-secondary-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      <div className="shrink-0 border-b border-secondary-200" />

      <div className="flex flex-col flex-1 min-h-0">
        {title ? (
          <div className="shrink-0 px-6 pt-4 pb-2">
            <h2 className="font-baloo text-xl font-bold text-secondary-900 leading-snug text-left">{title}</h2>
          </div>
        ) : null}
        <div className="flex flex-1 min-h-0 flex-col overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
