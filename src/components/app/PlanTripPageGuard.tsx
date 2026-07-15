'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { usePlanTripEligibility } from '@/hooks/usePlanTripEligibility'
import { CirculoEvolvedModal } from '@/components/app/CirculoEvolvedCall'

export function PlanTripBlockedScreen() {
  const { blockedMessage } = usePlanTripEligibility()
  const [isCirculoModalOpen, setIsCirculoModalOpen] = useState(false)

  return (
    <div className="max-w-lg mx-auto my-16 px-4 text-center space-y-4">
      <h1 className="font-baloo text-2xl font-bold text-secondary-900">Limite de viagens atingido</h1>
      <p className="font-comfortaa text-secondary-700 leading-relaxed">{blockedMessage}</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => setIsCirculoModalOpen(true)}
          className="font-baloo bg-accent-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-accent-600 transition-colors"
        >
          Assinar o Círculo Evolved
        </button>
        <Link
          href="/app"
          className="font-comfortaa text-sm font-semibold text-primary-600 hover:text-primary-700"
        >
          Voltar ao painel
        </Link>
      </div>
      <CirculoEvolvedModal isOpen={isCirculoModalOpen} onClose={() => setIsCirculoModalOpen(false)} />
    </div>
  )
}

export function PlanTripPageGuard({ children }: { children: ReactNode }) {
  const { canPlan, isLoading } = usePlanTripEligibility()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] font-comfortaa text-secondary-600">
        Carregando...
      </div>
    )
  }

  if (!canPlan) {
    return <PlanTripBlockedScreen />
  }

  return <>{children}</>
}
