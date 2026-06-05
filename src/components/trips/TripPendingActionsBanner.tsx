"use client";

import type { TripPendingAction } from "@/utils/trips/trip-pending-actions";

type PendingDrawer = Extract<TripPendingAction["drawer"], string>;

type Props = {
  actions: TripPendingAction[];
  onOpenDrawer: (drawer: PendingDrawer) => void;
};

export function TripPendingActionsBanner({ actions, onOpenDrawer }: Props) {
  if (actions.length === 0) return null;

  return (
    <section
      className="rounded-2xl border-2 border-accent-400 bg-gradient-to-br from-accent-50 via-white to-primary-50 p-5 md:p-6 shadow-md"
      aria-label="Próximos passos da viagem"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <p className="font-comfortaa text-xs font-semibold uppercase tracking-wide text-accent-700">
            Próximos passos
          </p>
          <h2 className="font-baloo text-xl md:text-2xl font-bold text-secondary-900">
            {actions.length === 1 ? "1 ação pendente" : `${actions.length} ações pendentes`}
          </h2>
          <p className="font-comfortaa text-sm text-secondary-600 mt-1">
            Siga a ordem abaixo para deixar sua viagem pronta para a curadoria.
          </p>
        </div>
        <span className="inline-flex items-center justify-center min-w-[2.5rem] h-10 px-3 rounded-full bg-accent-500 text-secondary-900 font-baloo font-bold text-lg">
          {actions.length}
        </span>
      </div>

      <ol className="space-y-3">
        {actions.map((action, index) => (
          <li
            key={action.id}
            className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-accent-200/80 bg-white/90 p-4"
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-500 font-baloo text-sm font-bold text-secondary-900"
                aria-hidden
              >
                {index + 1}
              </span>
              <div className="min-w-0">
                <h3 className="font-baloo text-base font-bold text-secondary-900">{action.title}</h3>
                <p className="font-comfortaa text-sm text-secondary-600 mt-0.5">{action.description}</p>
              </div>
            </div>
            {action.drawer ? (
              <button
                type="button"
                onClick={() => onOpenDrawer(action.drawer as PendingDrawer)}
                className="shrink-0 inline-flex items-center justify-center rounded-full bg-accent-500 px-5 py-2.5 font-baloo text-sm font-semibold text-secondary-900 hover:bg-accent-600 transition-colors"
              >
                Continuar
              </button>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
