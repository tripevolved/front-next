"use client";

import type { TripPendingAction } from "@/utils/trips/trip-pending-actions";

type PendingDrawer = Extract<TripPendingAction["drawer"], string>;

type Props = {
  actions: TripPendingAction[];
  onOpenDrawer: (drawer: PendingDrawer) => void;
  isGeneratingRecommendations?: boolean;
};

export function TripPendingActionsBanner({
  actions,
  onOpenDrawer,
  isGeneratingRecommendations = false,
}: Props) {
  if (actions.length === 0 && !isGeneratingRecommendations) return null;

  const visibleActions =
    isGeneratingRecommendations && actions.length === 0
      ? ([
          {
            id: "accommodation",
            order: 1,
            title: "Preparando recomendações de hospedagem",
            description:
              "Estamos selecionando resorts alinhados ao perfil de vocês. Isso pode levar alguns instantes.",
            drawer: "accommodation_proposals" as const,
          },
        ] satisfies TripPendingAction[])
      : actions;

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
            {isGeneratingRecommendations && visibleActions.some((a) => a.id === "accommodation")
              ? "Gerando recomendações"
              : visibleActions.length === 1
                ? "1 ação pendente"
                : `${visibleActions.length} ações pendentes`}
          </h2>
          <p className="font-comfortaa text-sm text-secondary-600 mt-1">
            {isGeneratingRecommendations
              ? "Aguarde enquanto selecionamos as hospedagens para esta viagem."
              : "Siga a ordem abaixo para deixar sua viagem pronta para a curadoria."}
          </p>
        </div>
      </div>

      <ol className="space-y-3">
        {visibleActions.map((action, index) => {
          const isAccommodationGenerating =
            isGeneratingRecommendations && action.id === "accommodation";

          return (
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
                  <h3 className="font-baloo text-base font-bold text-secondary-900">
                    {isAccommodationGenerating
                      ? "Preparando recomendações de hospedagem"
                      : action.title}
                  </h3>
                  <p className="font-comfortaa text-sm text-secondary-600 mt-0.5">
                    {isAccommodationGenerating
                      ? "Estamos selecionando resorts alinhados ao perfil de vocês. Isso pode levar alguns instantes."
                      : action.description}
                  </p>
                </div>
              </div>
              {isAccommodationGenerating ? (
                <div className="shrink-0 flex items-center justify-center gap-2 px-4 py-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent-500" />
                  <span className="font-comfortaa text-xs text-secondary-600">Carregando…</span>
                </div>
              ) : action.drawer ? (
                <button
                  type="button"
                  onClick={() => onOpenDrawer(action.drawer as PendingDrawer)}
                  className="shrink-0 inline-flex items-center justify-center rounded-full bg-accent-500 px-5 py-2.5 font-baloo text-sm font-semibold text-secondary-900 hover:bg-accent-600 transition-colors"
                >
                  Continuar
                </button>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
