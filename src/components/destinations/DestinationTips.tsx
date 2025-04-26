import { PublicDestination, PublicDestinationTip } from '@/core/types/destination'

interface DestinationTipsProps {
  destination: PublicDestination
}

export function DestinationTips({ destination }: DestinationTipsProps) {
  if (!destination.tips || destination.tips.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 overflow-x-auto">
        {destination.tips.map((tip, index) => {
          type TipType = 'daily-cost' | 'days-to-visit';

          const tipDetails: Record<TipType, { icon: string; title: string }> = {
            "daily-cost": { icon: '💰', title: 'Custo Diário' },
            "days-to-visit": { icon: '📅', title: 'Dias para Visitar' },
          };

          const { icon, title } = tipDetails[tip.type as TipType] || { icon: 'ℹ️', title: 'Informação' };

          return (
            <div key={index} className="relative bg-white p-6 rounded-xl shadow-sm overflow-hidden group">
              <div className="flex items-start mb-2">
                <div className="text-2xl mr-4">{icon}</div>
                <h3 className="font-baloo font-bold text-lg text-secondary-900">{tip.title}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-2">{tip.subtitle}</p>
              {tip.description && (
                <div className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-gray-600 p-4">{tip.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  )
} 