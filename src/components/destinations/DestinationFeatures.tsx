import type { ComponentType } from 'react'
import { PublicDestination, FeatureIcon, PublicDestinationFeature } from '@/core/types/destination'
import {
  IconAccommodation,
  IconAdrenaline,
  IconAttractions,
  IconCulture,
  IconDefault,
  IconFood,
  IconNaturalBeauty,
  IconParty,
  IconRelax,
  IconUniqueness,
} from './FeatureIconGlyphs'

interface DestinationFeaturesProps {
  destination: PublicDestination
}

type FeatureType = FeatureIcon | 'comfort'

const featureMeta: Record<FeatureType, { Icon: ComponentType<{ className?: string }>; title: string }> = {
  culture: { Icon: IconCulture, title: 'Cultura' },
  food: { Icon: IconFood, title: 'Gastronomia' },
  party: { Icon: IconParty, title: 'Bares e Festas' },
  relax: { Icon: IconRelax, title: 'Relaxamento' },
  attractions: { Icon: IconAttractions, title: 'Atrações turísticas' },
  comfort: { Icon: IconAccommodation, title: 'Hospedagens' },
  accommodation: { Icon: IconAccommodation, title: 'Hospedagens' },
  'natural-beauty': { Icon: IconNaturalBeauty, title: 'Beleza Natural' },
  uniqueness: { Icon: IconUniqueness, title: 'Único' },
  adrenaline: { Icon: IconAdrenaline, title: 'Adrenalina' },
}

export function DestinationFeatures({ destination }: DestinationFeaturesProps) {
  if (!destination.features || destination.features.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-6">
        O que {destination.title} oferece
      </h2>
      <div className="grid gap-6">
        {destination.features.map((feature: PublicDestinationFeature, index) => {
          const meta = featureMeta[feature.type as FeatureType]
          const Icon = meta?.Icon ?? IconDefault
          const title = meta?.title ?? 'Outro'

          return (
            <div
              key={index}
              className="border border-accent-500/80 bg-white p-6 rounded-lg shadow-sm min-w-0 overflow-hidden"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent-500 text-secondary-800 rounded-full"
                  aria-hidden
                >
                  <Icon className="h-5 w-5 text-accent-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-baloo font-bold text-lg text-secondary-900 mb-2">{title}</h3>
                  <div
                    className="prose prose-sm max-w-none text-gray-600 overflow-hidden break-words [overflow-wrap:anywhere] [&_img]:max-w-full [&_img]:h-auto [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_iframe]:max-w-full"
                    dangerouslySetInnerHTML={{ __html: feature.description }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
