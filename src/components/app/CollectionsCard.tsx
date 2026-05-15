"use client";

import Link from "next/link";
import { PAINEL_ACTION_CARD_SHELL } from "@/components/app/painelActionCard";

export function CollectionsCard() {
  return (
    <Link
      href="/app/viagens/planejar/colecoes"
      className={`${PAINEL_ACTION_CARD_SHELL} bg-white rounded-lg shadow-md border border-gray-100 cursor-pointer transition hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 block`}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-2">
        <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      </div>
      <div className="flex items-center justify-center gap-2 flex-wrap mb-1">
        <h3 className="text-base font-semibold text-gray-900">Coleções</h3>
      </div>
      <p className="text-xs text-gray-600 leading-snug">
        Coleções de hospedagens selecionadas pela nossa curadoria para suas próximas viagens.
      </p>
    </Link>
  );
}
