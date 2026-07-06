import type { DestinationProposalChoice, DestinationProposalResponse } from '@/core/types/recommendations'
import type { TripMatchedDestination, TripProposal } from '@/core/types/trip'

function resolveAlignmentLabel(destination: TripMatchedDestination): string {
  if (destination.alignmentLabel?.trim()) return destination.alignmentLabel
  if (destination.matchScore > 0.8) return 'Muito alinhado'
  if (destination.matchScore >= 0.7) return 'Alinhado'
  return 'Boa alternativa'
}

function resolveWhyRecommended(destination: TripMatchedDestination): string {
  const why = destination.whyRecommended?.trim()
  if (why) return why
  const details = destination.details?.trim()
  if (details) return details
  return 'Destino selecionado para você.'
}

function mapChoice(destination: TripMatchedDestination): DestinationProposalChoice {
  return {
    destinationName: destination.name,
    destinationUniqueName: destination.uniqueName,
    destinationId: destination.destinationId,
    matchScore: destination.matchScore,
    alignmentLabel: resolveAlignmentLabel(destination),
    coverImageUrl: destination.images?.[0]?.url,
    whyRecommended: resolveWhyRecommended(destination),
    alignedWithIntent: destination.alignedWithIntent ?? [],
    tradeoffs: destination.tradeoffs ?? [],
    bestFor: destination.bestFor ?? [],
  }
}

export function mapTripProposalToDestinationProposal(tripProposal: TripProposal): DestinationProposalResponse | null {
  const main = tripProposal.mainChoice ? mapChoice(tripProposal.mainChoice) : null
  const others = (tripProposal.otherChoices ?? []).map(mapChoice)

  if (!main) return null
  return { mainChoice: main, otherChoices: others }
}

