'use client'

export function StepIntro({ onNext }: { onNext: () => void }) {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900">Vamos começar sua jornada?</h2>
      <p className="text-gray-600">
        Você vai responder a algumas perguntas rápidas sobre a sua viagem - em torno de 5 minutos. No final, um
        especialista vai preparar uma recomendação personalizada para você, que você recebe em até 48h.
      </p>
      <p className="text-gray-600">
        Isso te dará uma direção clara para sua próxima jornada, sem precisar procurar entre milhares de opções.
      </p>

      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700"
        >
          Começar
        </button>
      </div>
    </div>
  )
}

