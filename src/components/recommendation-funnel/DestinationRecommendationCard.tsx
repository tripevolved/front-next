'use client'

import Image from 'next/image'
import type { DestinationProposalChoice } from '@/core/types/recommendations'

const ALIGNMENT_KEY_LABELS: Record<string, string> = {
  ritmo: 'Ritmo',
  hospedagem: 'Hospedagem',
  interesses: 'Interesses',
  epoca: 'Época',
  experiencia: 'Experiência',
  perfil: 'Perfil',
}

function getAlignmentBadgeClass(label: string) {
  if (label === 'Muito alinhado') return 'bg-accent-600 text-white'
  if (label === 'Alinhado') return 'bg-secondary-600 text-white'
  return 'bg-secondary-400 text-white'
}

function formatAlignmentKey(key: string) {
  return ALIGNMENT_KEY_LABELS[key] ?? key.charAt(0).toUpperCase() + key.slice(1)
}

type Props = {
  choice: DestinationProposalChoice
  isSelected: boolean
  isHero?: boolean
  onSelect: () => void
}

export function DestinationRecommendationCard({ choice, isSelected, isHero, onSelect }: Props) {
  const imageUrl = choice.coverImageUrl || '/assets/blank-image.png'

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-xl shadow-md overflow-hidden transition-all ${
        isSelected ? 'ring-2 ring-accent-500 ring-offset-2' : 'hover:shadow-lg'
      }`}
    >
      <div className={`relative ${isHero ? 'h-56 md:h-64' : 'h-48'}`}>
        <Image src={imageUrl} alt={choice.destinationName} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
      </div>

      <div className={`p-5 ${isHero ? 'bg-secondary-50' : 'bg-white'}`}>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-comfortaa font-semibold text-accent-700 uppercase tracking-wide">
            {isHero ? 'Principal recomendação' : 'Alternativa'}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold flex items-center shadow-sm ${getAlignmentBadgeClass(choice.alignmentLabel)}`}
          >
            <span className="mr-1.5">🎯</span>
            {choice.alignmentLabel}
          </span>
        </div>

        <h3 className="font-baloo text-xl font-bold text-secondary-900">{choice.destinationName}</h3>

        <p className="mt-3 font-comfortaa text-secondary-700 leading-relaxed whitespace-pre-wrap">
          {choice.whyRecommended}
        </p>

        {choice.alignedWithIntent?.length > 0 && (
          <ul className="mt-5 space-y-3">
            {choice.alignedWithIntent.map((item) => (
              <li key={`${item.key}-${item.label}`} className="flex gap-3 font-comfortaa text-sm text-secondary-800">
                <span className="text-accent-500 shrink-0 mt-0.5">✓</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary-500">
                    {formatAlignmentKey(item.key)}
                  </p>
                  <p className="mt-0.5">{item.label}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {choice.bestFor?.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-comfortaa font-semibold text-secondary-500 mb-2 uppercase tracking-wide">
              Ideal para
            </p>
            <ul className="space-y-1">
              {choice.bestFor.map((item) => (
                <li key={item} className="font-comfortaa text-sm text-secondary-700">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {choice.tradeoffs?.length > 0 && (
          <div className="mt-5 pt-4 border-t border-secondary-200">
            <p className="text-xs font-comfortaa font-semibold text-secondary-500 mb-2 uppercase tracking-wide">
              Para considerar
            </p>
            <ul className="space-y-1">
              {choice.tradeoffs.map((item) => (
                <li key={item} className="font-comfortaa text-sm text-secondary-600">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </button>
  )
}
