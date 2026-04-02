'use client'

import { useState } from 'react'
import TripProfileSelector from '../common/TripProfileSelector'
import type { TripProfile } from './types'

export function StepProfile({
  onNext,
  onBack,
  buttonText = 'Próximo',
}: {
  onNext: (profile: TripProfile) => void
  onBack: () => void
  buttonText?: string
}) {
  const [profile, setProfile] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ profile })
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">Qual é o seu perfil de viajante?</h2>
      <p className="text-gray-600 mb-6">Escolha o perfil que melhor combina com seu estilo de viagem.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TripProfileSelector selectedProfile={profile} onProfileSelect={setProfile} />

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
            disabled={!profile}
            className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  )
}

