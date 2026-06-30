'use client'

import Button from '@/components/common/Button'

type Props = {
  intentSummary: string
  isLoading?: boolean
  onContinue: () => void
  compact?: boolean
}

export function IntentPreviewScreen({ intentSummary, isLoading, onContinue, compact = false }: Props) {
  return (
    <div className={`flex flex-col flex-1 bg-white ${compact ? 'min-h-0' : 'min-h-screen'}`}>
      <div className="flex-1 min-h-0 overflow-y-auto p-6 max-w-2xl mx-auto w-full flex flex-col justify-center gap-8">
        <figure className="relative">
          <span
            className="absolute -top-2 -left-1 font-baloo text-6xl text-accent-400/40 leading-none select-none"
            aria-hidden
          >
            “
          </span>
          <blockquote className="relative border-l-4 border-accent-500 pl-6 pr-2 py-1">
            <p className="font-comfortaa text-secondary-800 text-lg leading-relaxed">{intentSummary}</p>
          </blockquote>
        </figure>

        <p className="font-comfortaa text-sm text-secondary-500 text-center">
          Na próxima etapa, vamos recomendar destinos curados do Caribe para vocês.
        </p>

        <Button
          onClick={onContinue}
          disabled={isLoading}
          className="w-full font-baloo bg-accent-500 text-white py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all disabled:opacity-60"
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
