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
  children,
}: Props) {
  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white overflow-hidden">
      <header className="shrink-0 border-b border-secondary-200 p-5">
        <div className="grid grid-cols-[auto,1fr,auto] items-start gap-4">
          <div className="min-w-[96px]">
            {showBack ? (
              <button
                type="button"
                onClick={onBack}
                className="h-10 rounded-full border border-secondary-200 bg-white px-4 font-comfortaa text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
              >
                {"< Voltar"}
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
          <div className="min-w-0 text-center">
            <p className="font-comfortaa text-xs text-secondary-500">{categoryLabel}</p>
            <h1 className="font-baloo text-xl font-bold text-secondary-900 leading-tight">{title}</h1>
            <p className="font-comfortaa text-xs text-secondary-500 mt-1">
              Passo {step} de {totalSteps}
            </p>
          </div>
          <Link
            href={exitHref}
            className="text-secondary-600 hover:text-secondary-900 inline-flex items-center gap-1 text-sm font-comfortaa shrink-0 self-center"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao painel
          </Link>
        </div>

        <div className="mt-5 flex justify-between gap-2">
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

      <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
    </div>
  );
}
