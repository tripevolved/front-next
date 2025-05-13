import { PublicDestination, FeatureIcon } from '@/core/types/destination'

interface DestinationFeaturesProps {
  destination: PublicDestination
}

export function DestinationFeatures({ destination }: DestinationFeaturesProps) {
  if (!destination.features || destination.features.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-6">O que {destination.title} oferece</h2>
      <div className="grid gap-6">
        {destination.features.map((feature, index) => {
          type FeatureType = FeatureIcon;

          const featureDetails: Record<FeatureType, { icon: string; title: string }> = {
            culture: { icon: '🎨', title: 'Cultura' },
            food: { icon: '🍽️', title: 'Gastronomia' },
            party: { icon: '🎉', title: 'Bares e Festas' },
            relax: { icon: '🧘‍♀️', title: 'Relaxamento' },
            attractions: { icon: '🏰', title: 'Atrações turísticas' },
            accommodation: { icon: '🏨', title: 'Hospedagens' },
            "natural-beauty": { icon: '🌄', title: 'Beleza Natural' },
            uniqueness: { icon: '✨', title: 'Único' },
            adrenaline: { icon: '🏄‍♂️', title: 'Adrenalina' },
          };

          const { icon, title } = featureDetails[feature.type as FeatureType] || { icon: '❓', title: 'Outro' };

          return (
            <div key={index} className="bg-accent-100 p-6 rounded-xl shadow-sm">
              <div className="flex items-start mb-2">
                <div className="text-2xl mr-4">{icon}</div>
                <h3 className="font-baloo font-bold text-lg text-secondary-900">{title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  )
} 