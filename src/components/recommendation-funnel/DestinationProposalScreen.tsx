'use client'

import type { ReactNode } from 'react'
import Image from 'next/image'
import type { DestinationProposalResponse } from '@/core/types/recommendations'
import Button from '@/components/common/Button'
import { DestinationRecommendationCard } from './DestinationRecommendationCard'

const DEFAULT_EYEBROW = 'Destinos curados para vocês'
const DEFAULT_TITLE = 'Para onde sua viagem nos leva?'

type Props = {
  proposal: DestinationProposalResponse
  intentSummary?: string
  selectedUniqueName: string | null
  onSelect: (uniqueName: string) => void
  onContinue: () => void
  continueLabel?: string
  isContinueLoading?: boolean
  topBar?: ReactNode
  compact?: boolean
  eyebrow?: string
  title?: string
  heroImageSrc?: string
  heroImageAlt?: string
}

export function DestinationProposalScreen({
  proposal,
  intentSummary,
  selectedUniqueName,
  onSelect,
  onContinue,
  continueLabel = 'Continuar com este destino',
  isContinueLoading = false,
  topBar,
  compact = false,
  eyebrow = DEFAULT_EYEBROW,
  title = DEFAULT_TITLE,
  heroImageSrc,
  heroImageAlt = '',
}: Props) {
  const main = proposal.mainChoice

  return (
    <div className={`flex flex-col flex-1 bg-white ${compact ? 'min-h-0' : 'min-h-screen'}`}>
      {topBar ? (
        <div className="shrink-0 border-b border-secondary-200 px-6 py-4">
          {topBar}
        </div>
      ) : null}
      {compact ? (
        <div className="shrink-0 border-b border-secondary-200 p-6 text-center">
          <p className="font-comfortaa text-xs text-secondary-500">{eyebrow}</p>
          <h1 className="font-baloo text-2xl font-bold text-secondary-900 mt-1">{title}</h1>
        </div>
      ) : heroImageSrc ? (
        <div className="relative h-48 md:h-56 shrink-0">
          <Image src={heroImageSrc} alt={heroImageAlt} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
            <p className="font-comfortaa text-sm text-white/80">{eyebrow}</p>
            <h1 className="font-baloo text-2xl md:text-3xl font-bold">{title}</h1>
          </div>
        </div>
      ) : (
        <div className="shrink-0 border-b border-secondary-200 p-6 text-center">
          <p className="font-comfortaa text-xs text-secondary-500">{eyebrow}</p>
          <h1 className="font-baloo text-2xl font-bold text-secondary-900 mt-1">{title}</h1>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full space-y-8">
        {intentSummary && (
          <p className="font-comfortaa text-secondary-600 text-center italic">&ldquo;{intentSummary}&rdquo;</p>
        )}

        {main && (
          <DestinationRecommendationCard
            choice={main}
            isHero
            isSelected={selectedUniqueName === main.destinationUniqueName}
            onSelect={() => onSelect(main.destinationUniqueName)}
          />
        )}

        {proposal.otherChoices && proposal.otherChoices.length > 0 && (
          <div className="space-y-6">
            <h2 className="font-baloo text-xl font-bold text-secondary-900">Outras opções alinhadas</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {proposal.otherChoices.map((choice) => (
                <DestinationRecommendationCard
                  key={choice.destinationUniqueName}
                  choice={choice}
                  isSelected={selectedUniqueName === choice.destinationUniqueName}
                  onSelect={() => onSelect(choice.destinationUniqueName)}
                />
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={onContinue}
          disabled={!selectedUniqueName || isContinueLoading}
          className="w-full font-baloo bg-accent-500 text-white py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all disabled:opacity-50"
        >
          {isContinueLoading ? 'Salvando destino...' : continueLabel}
        </Button>
      </div>
    </div>
  )
}
