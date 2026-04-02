'use client'

import { useState } from 'react'
import { TravelerType } from '@/core/types/trip'
import TripTypeSelector from '../common/TripTypeSelector'
import type { StepTypeOption, TripType } from './types'

/** Only casal e família — demais tipos ficam ocultos neste fluxo por enquanto. */
const DEFAULT_STEP_TYPES: StepTypeOption[] = [
  { id: TravelerType.COUPLE, name: 'Casal', icon: '❤️', available: true },
  { id: TravelerType.FAMILY, name: 'Família', icon: '👨‍👩‍👧‍👦', available: true },
]

const DEFAULT_DISCLAIMER_TEXT = 'Só cuidamos de viagens para casais e famílias.'

export function StepType({
  onNext,
  onBack,
  buttonText = 'Próximo',
  types = DEFAULT_STEP_TYPES,
  disclaimerText,
}: {
  onNext: (type: TripType) => void
  onBack: () => void
  buttonText?: string
  types?: StepTypeOption[]
  /** Omitido → usa o aviso padrão. String vazia oculta o aviso. */
  disclaimerText?: string
}) {
  const [type, setType] = useState<TravelerType | ''>('')
  const resolvedDisclaimer = disclaimerText === undefined ? DEFAULT_DISCLAIMER_TEXT : disclaimerText

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (type) onNext({ type })
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">Com quem você vai viajar?</h2>
      <p className="text-gray-600 mb-6">Selecione o tipo de viagem que melhor se adequa à sua jornada.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TripTypeSelector selectedType={type} onTypeSelect={(t) => setType(t)} types={types} />

        {resolvedDisclaimer ? (
          <p className="text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            {resolvedDisclaimer}
          </p>
        ) : null}

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={!type}
            className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  )
}

