'use client'

import Link from 'next/link'

/**
 * Shown when the subscriber has an active subscription but has not yet registered
 * authorized travelers (hasTravelers === false). Pairs with TravelDesignerWhatsAppCard on /app.
 */
export function SubscriptionTravelersPromptCard() {
  return (
    <Link
      href="/app/admin/circulo-evolved"
      className="flex flex-col items-center justify-center text-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-accent-200 ring-1 ring-accent-100 aspect-square"
    >
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold font-comfortaa bg-accent-500/15 text-accent-800 border border-accent-300/60 mb-3">
        Importante — benefícios da assinatura
      </span>
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
        <svg
          className="w-7 h-7 text-secondary-700"
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
      <h3 className="text-lg font-semibold text-secondary-900 font-baloo mb-2">
        Cadastre quem viaja com você
      </h3>
      <p className="text-sm text-secondary-700 font-comfortaa leading-snug">
        Apenas as pessoas cadastradas como viajantes da assinatura têm direito aos benefícios do Círculo
        Evolved nas viagens. Registre sua família direta para não perder vantagens.
      </p>
      <span className="mt-4 text-sm font-comfortaa font-semibold text-accent-700">
        Preencher agora →
      </span>
    </Link>
  )
}
