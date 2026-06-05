'use client'

type StepIntroProps = {
  onNext: () => void
  title?: string
  paragraphs?: string[]
  buttonText?: string
}

export function StepIntro({
  onNext,
  title = 'Vamos começar sua jornada?',
  paragraphs = [
    'Você vai responder a algumas perguntas rápidas sobre a sua viagem - em torno de 5 minutos. Ao final, você poderá construir sua jornada com acesso à nossa curadoria única.',
    'Isso te dará uma direção clara para sua próxima jornada, sem precisar procurar entre milhares de opções.',
  ],
  buttonText = 'Começar',
}: StepIntroProps) {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900">{title}</h2>
      {paragraphs.map((text) => (
        <p key={text} className="text-gray-600">
          {text}
        </p>
      ))}

      <div className="flex justify-center pt-4">
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

