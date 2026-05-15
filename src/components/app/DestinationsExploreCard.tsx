"use client";

import Link from "next/link";
import { PAINEL_ACTION_CARD_SHELL } from "@/components/app/painelActionCard";

export function DestinationsExploreCard() {
  return (
    <Link
      href="/app/viagens/planejar/destinos"
      className={`${PAINEL_ACTION_CARD_SHELL} bg-white rounded-lg shadow-md border border-gray-100 cursor-pointer transition hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 block`}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
        <svg
          className="w-5 h-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-0.5">Explorar destinos</h3>
      <p className="text-xs text-gray-600 leading-snug">
        Descubra lugares e comece a construir sua próxima jornada.
      </p>
    </Link>
  );
}
