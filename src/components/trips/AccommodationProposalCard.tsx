'use client'

import Image from 'next/image'
import type { TripAccommodationProposalView } from '@/core/types/recommendations'

const ROLE_LABELS: Record<string, string> = {
  primary: 'Principal recomendação',
  alternative: 'Alternativa',
  fallback: 'Opção viável',
}

function formatPrice(summary?: { lowestTotalPrice?: number; currency?: string } | null) {
  if (summary?.lowestTotalPrice == null) return null
  const currency = summary.currency ?? 'BRL'
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency }).format(summary.lowestTotalPrice)
  } catch {
    return `R$ ${summary.lowestTotalPrice.toFixed(2)}`
  }
}

type Props = {
  proposal: TripAccommodationProposalView
  isHero?: boolean
  onSelect?: () => void
  onViewAlternatives?: () => void
  disabled?: boolean
}

export function AccommodationProposalCard({
  proposal,
  isHero,
  onSelect,
  onViewAlternatives,
  disabled,
}: Props) {
  const rec = proposal.recommendation
  const priceLabel = formatPrice(proposal.availabilitySummary)
  const isPrimaryUnavailable = proposal.role === 'primary' && !proposal.hasAvailability

  return (
    <article
      className={`rounded-2xl border overflow-hidden bg-white shadow-sm ${
        isHero ? 'border-accent-300' : 'border-secondary-200'
      }`}
    >
      <div className={`relative ${isHero ? 'h-52 md:h-56' : 'h-44'}`}>
        <Image
          src={proposal.coverImageUrl || '/assets/blank-image.png'}
          alt={proposal.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className={`p-5 space-y-4 ${isHero ? 'bg-accent-50/30' : ''}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-comfortaa font-semibold uppercase tracking-wide text-accent-700">
            {ROLE_LABELS[proposal.role] ?? 'Recomendação'}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              proposal.hasAvailability
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-secondary-200 text-secondary-700'
            }`}
          >
            {proposal.hasAvailability ? 'Disponível' : 'Sem disponibilidade para suas datas'}
          </span>
        </div>

        <div>
          <h3 className="font-baloo text-xl font-bold text-secondary-900">{proposal.name}</h3>
        </div>

        {rec.whyRecommended && (
          <p className="font-comfortaa text-sm text-secondary-700 leading-relaxed whitespace-pre-wrap">
            {rec.whyRecommended}
          </p>
        )}

        {rec.bestForThisTrip && rec.bestForThisTrip.length > 0 && (
          <div>
            <p className="text-xs font-comfortaa font-semibold uppercase tracking-wide text-secondary-500 mb-2">
              Ideal para esta viagem
            </p>
            <ul className="space-y-1.5">
              {rec.bestForThisTrip.map((item) => (
                <li key={item} className="font-comfortaa text-sm text-secondary-800 flex gap-2">
                  <span className="text-accent-500 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {rec.tradeoffs && rec.tradeoffs.length > 0 && (
          <div>
            <p className="text-xs font-comfortaa font-semibold uppercase tracking-wide text-secondary-500 mb-2">
              Para considerar
            </p>
            <ul className="space-y-1.5">
              {rec.tradeoffs.map((item) => (
                <li key={item} className="font-comfortaa text-sm text-secondary-600 flex gap-2">
                  <span className="shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          {priceLabel && proposal.hasAvailability && (
            <p className="font-comfortaa text-sm font-semibold text-secondary-800 mt-1">
              A partir de {priceLabel}
            </p>
          )}
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          {proposal.hasAvailability && onSelect && (
            <button
              type="button"
              disabled={disabled}
              onClick={onSelect}
              className="font-baloo bg-accent-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-accent-600 disabled:opacity-50 transition-colors"
            >
              Escolher esta hospedagem
            </button>
          )}
          {isPrimaryUnavailable && onViewAlternatives && (
            <button
              type="button"
              onClick={onViewAlternatives}
              className="font-baloo border border-accent-400 text-accent-700 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-accent-50 transition-colors"
            >
              Ver alternativas disponíveis
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
