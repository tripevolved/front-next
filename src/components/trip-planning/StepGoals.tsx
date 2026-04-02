'use client'

import { useState } from 'react'
import { TravelerType } from '@/core/types/trip'
import TripGoalsSelector from '../common/TripGoalsSelector'
import type { TripGoals } from './types'

export function StepGoals({
  onNext,
  onBack,
  tripType,
}: {
  onNext: (goals: TripGoals) => void
  onBack: () => void
  tripType?: TravelerType
}) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ goals: selectedGoals })
  }

  return (
    <div className="p-6 flex flex-col h-full">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">Defina sua viagem</h2>
      <p className="text-gray-600 mb-6">Selecione até 5 palavras que melhor definem a viagem dos seus sonhos.</p>

      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <TripGoalsSelector
          selectedGoals={selectedGoals}
          onGoalsChange={setSelectedGoals}
          tripType={tripType}
          maxSelections={5}
          className="flex-grow"
        />

        <div className="flex justify-between pt-4 mt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={selectedGoals.length === 0}
            className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      </form>
    </div>
  )
}

