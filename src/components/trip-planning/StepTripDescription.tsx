'use client'

import { useState, type FormEvent } from 'react'

export function StepTripDescription({
  onNext,
  onBack,
  initial,
  buttonText = 'Próximo',
}: {
  onNext: (description: string) => void
  onBack: () => void
  initial?: string
  buttonText?: string
}) {
  const [description, setDescription] = useState(initial ?? '')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onNext(description.trim())
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900">Conte um pouco sobre o que você quer viver</h2>
      <p className="text-gray-600">Se quiser, descreva detalhes como estilo, ritmo, preferências e expectativas.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex.: queremos descansar, comer bem e conhecer lugares com clima romântico..."
          rows={7}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-600 focus:border-accent-600 text-gray-900"
        />
        <p className="text-xs text-gray-500">{description.trim().length} caracteres</p>

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
            className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  )
}

