'use client'

import { useState, type FormEvent } from 'react'

const BUDGET_SLIDER_MIN = 3000
const BUDGET_SLIDER_MAX = 100000
const BUDGET_SLIDER_STEP = 1000

function formatCurrencyBR(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value)
}

function formatMaxBudgetDisplay(value: number) {
  if (value >= BUDGET_SLIDER_MAX) return `${formatCurrencyBR(BUDGET_SLIDER_MAX)}+`
  return formatCurrencyBR(value)
}

export type TripBudgetPayload = { maxBudget: number; isFlexible: boolean }

export function StepBudget({
  onNext,
  onBack,
  initial,
}: {
  onNext: (budget: TripBudgetPayload) => void
  onBack: () => void
  initial?: TripBudgetPayload
}) {
  const [maxBudget, setMaxBudget] = useState<number>(initial?.maxBudget ?? 60000)
  const [isFlexible, setIsFlexible] = useState<boolean>(initial?.isFlexible ?? true)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onNext({ maxBudget, isFlexible })
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900">Qual é o seu orçamento?</h2>
      <p className="text-gray-600">Defina um valor máximo para a experiência da sua viagem.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <input type="checkbox" checked={isFlexible} onChange={(e) => setIsFlexible(e.target.checked)} />
          O orçamento tem alguma flexibilidade?
        </label>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Até</span>
            <span className="font-semibold text-secondary-900">{formatMaxBudgetDisplay(maxBudget)}</span>
          </div>
          <input
            type="range"
            min={BUDGET_SLIDER_MIN}
            max={BUDGET_SLIDER_MAX}
            step={BUDGET_SLIDER_STEP}
            value={Math.min(maxBudget, BUDGET_SLIDER_MAX)}
            onChange={(e) => setMaxBudget(Number(e.target.value))}
            className="w-full accent-primary-600"
          />
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
          >
            Voltar
          </button>
          <button type="submit" className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700">
            Próximo
          </button>
        </div>
      </form>
    </div>
  )
}

