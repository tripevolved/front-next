'use client'

import Link from 'next/link'

import { PAINEL_ACTION_CARD_SHELL } from '@/components/app/painelActionCard'
/**
 * Shown when the subscriber has an active subscription but has not yet registered
 * authorized travelers (hasTravelers === false). Shown first on /app when subscription is active.
 */
export function SubscriptionTravelersPromptCard() {
  return (
    <Link
      href="/app/admin/circulo-evolved"
      className={`${PAINEL_ACTION_CARD_SHELL} bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-accent-200 ring-1 ring-accent-100`}
    >
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-comfortaa bg-accent-500/15 text-accent-800 border border-accent-300/60 mb-2">
        Importante — benefícios da assinatura
      </span>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center mb-2">
        <svg
          className="w-5 h-5 text-secondary-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-secondary-900 font-baloo mb-1">
        Cadastre quem viaja com você
      </h3>
      <p className="text-xs text-secondary-700 font-comfortaa leading-snug line-clamp-3">
        Apenas as pessoas cadastradas como viajantes da assinatura têm direito aos benefícios do Círculo
        Evolved nas viagens. Registre sua família direta para não perder vantagens.
      </p>
      <span className="mt-2 text-xs font-comfortaa font-semibold text-accent-700">
        Preencher agora →
      </span>
    </Link>
  )
}
