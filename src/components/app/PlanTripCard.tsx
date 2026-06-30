"use client";

import Link from "next/link";
import { PAINEL_ACTION_CARD_SHELL } from "@/components/app/painelActionCard";
import { usePlanTripEligibility } from "@/hooks/usePlanTripEligibility";

const CARD_CONTENT = (
  <>
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-2">
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    </div>
    <h3 className="text-base font-semibold mb-0.5">Planejar viagem</h3>
    <p className="text-xs text-primary-100 leading-snug">
      Responda o quiz e receba destinos curados para vocês.
    </p>
  </>
);

export function PlanTripCard() {
  const { canPlan, isLoading, blockedMessage } = usePlanTripEligibility();

  if (!canPlan && !isLoading) {
    return (
      <div
        className={`${PAINEL_ACTION_CARD_SHELL} bg-primary-600/70 rounded-lg shadow-md border border-primary-700 text-white opacity-80 cursor-not-allowed`}
        aria-disabled
        title={blockedMessage}
      >
        {CARD_CONTENT}
        <p className="mt-2 text-[11px] text-primary-100 leading-snug">{blockedMessage}</p>
      </div>
    );
  }

  return (
    <Link
      href="/app/viagens/planejar"
      className={`${PAINEL_ACTION_CARD_SHELL} bg-primary-600 rounded-lg shadow-md border border-primary-700 cursor-pointer transition hover:bg-primary-700 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 block text-white ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
      aria-busy={isLoading}
    >
      {CARD_CONTENT}
    </Link>
  );
}
