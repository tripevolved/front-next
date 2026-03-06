"use client";

import { type TripConfiguration, TravelerType } from "@/core/types/trip";

const TRAVELER_TYPE_LABELS: Record<TravelerType, string> = {
  [TravelerType.COUPLE]: "Casal",
  [TravelerType.INDIVIDUAL]: "Sozinho(a)",
  [TravelerType.FRIENDS]: "Amigos",
  [TravelerType.FAMILY]: "Família",
};

interface TripConfigurationSetProps {
  configuration: TripConfiguration;
}

function formatDate(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatBudget(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function formatDatesOrMonth(config: { startDate?: Date | string; endDate?: Date | string; month?: number }): string | null {
  const hasDates = config.startDate != null && config.endDate != null;
  if (hasDates) {
    return `${formatDate(config.startDate!)} a ${formatDate(config.endDate!)}`;
  }
  if (config.month != null && config.month >= 1 && config.month <= 12) {
    return MONTH_NAMES[config.month - 1];
  }
  return null;
}

export function TripConfigurationSet({ configuration }: TripConfigurationSetProps) {
  const { startDate, endDate, month, budget, numAdults, numChildren, childrenAges, rooms, travelerType } = configuration;
  const datesOrMonthLabel = formatDatesOrMonth({ startDate, endDate, month });

  return (
    <div className="border-2 border-dashed border-primary-600 rounded-lg bg-primary-50 p-4 md:p-6">
      <div className="flex flex-wrap gap-4 w-full items-center justify-between">
          {/* Tipo de viajante */}
          {travelerType != null && TRAVELER_TYPE_LABELS[travelerType] != null && (
            <div className="flex items-center gap-2">
              <span className="text-primary-600" aria-hidden>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <span className="text-secondary-800 text-sm font-medium">
                {TRAVELER_TYPE_LABELS[travelerType]}
              </span>
            </div>
          )}

          {/* Datas ou Mês */}
          {datesOrMonthLabel && (
            <div className="flex items-center gap-2">
              <span className="text-primary-600" aria-hidden>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span className="text-secondary-800 text-sm font-medium">
                {datesOrMonthLabel}
              </span>
            </div>
          )}

          {/* Orçamento */}
          <div className="flex items-center gap-2">
            <span className="text-primary-600" aria-hidden>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <span className="text-secondary-800 text-sm font-medium">{formatBudget(budget)}</span>
          </div>

          {/* Adultos */}
          <div className="flex items-center gap-2">
            <span className="text-primary-600" aria-hidden>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>
            <span className="text-secondary-800 text-sm font-medium">
              {numAdults} {numAdults === 1 ? "adulto" : "adultos"}
            </span>
          </div>

          {/* Crianças */}
          {numChildren > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-primary-600" aria-hidden>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </span>
              <span className="text-secondary-800 text-sm font-medium">
                {numChildren} {numChildren === 1 ? "criança" : "crianças"}
                {childrenAges?.length ? ` (${childrenAges.join(", ")} anos)` : ""}
              </span>
            </div>
          )}

          {/* Quartos */}
          {rooms && rooms.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-primary-600" aria-hidden>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </span>
              <span className="text-secondary-800 text-sm font-medium">
                {rooms.length} {rooms.length === 1 ? "quarto" : "quartos"}
              </span>
            </div>
          )}

        <button
          type="button"
          className="shrink-0 inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 font-medium text-sm"
          aria-label="Editar configuração"
          onClick={() => {}}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          Editar
        </button>
      </div>
    </div>
  );
}
