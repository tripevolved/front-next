import Image from 'next/image'
import Link from 'next/link'
import { DestinationsApiService } from '@/clients/destinations'
import { PublicDestination, TravelType } from '@/core/types/destination'
import { PhotoCarousel } from '@/components/PhotoCarousel'
import { DestinationCTA } from '@/components/DestinationCTA'

interface PageProps {
  params: {
    uniqueName: string
  }
}

async function getDestination(uniqueName: string): Promise<PublicDestination> {
  try {
    return await DestinationsApiService.getDestinationByUniqueName(uniqueName)
  } catch (error) {
    throw new Error('Failed to fetch destination')
  }
}

// Helper function to get icon and Portuguese name based on travel type
function getTravelTypeDetails(type: TravelType) {
  const travelTypes = {
    COUPLES: { icon: '💑', name: 'Recomendado para casais' },
    FAMILIES: { icon: '👨‍👩‍👧‍👦', name: 'Recomendado para famílias' },
    INDIVIDUALS: { icon: '👤', name: 'Recomendado para viajantes solo' },
    PAIRS: { icon: '👥', name: 'Recomendado para duplas' },
  };

  return travelTypes[type] || { icon: '✈️', name: 'Outro' };
}

export default async function DestinationPage({ params }: PageProps) {
  const destination = await getDestination(params.uniqueName)
  const { icon, name } = getTravelTypeDetails(destination.travelType)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with main photo */}
      <div className="relative h-[50vh] md:h-[70vh]">
        {destination.photos && destination.photos.length > 0 && (
          <PhotoCarousel photos={destination.photos} title={destination.title} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-5xl font-baloo font-bold text-white mb-2">
              {destination.title}
            </h1>
            
            {/* Destination type with icon */}
            {destination.travelType && (
              <div className="flex items-center mb-4">
                <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-lg font-medium flex items-center">
                  <span className="text-2xl mr-2">{icon}</span>
                  {name}
                </span>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {destination.travelerProfiles.map((profile, index) => (
                <span 
                  key={index}
                  className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {profile}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="w-full md:w-4/5 mx-auto">
          {/* Tips Section */}
          {destination.tips && destination.tips.length > 0 && (
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
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left column - Main content */}
            <div className="md:col-span-2">
              {/* Features */}
              {destination.features && destination.features.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-6">O que {destination.title} oferece</h2>
                  <div className="grid gap-6">
                    {destination.features.map((feature, index) => {
                      type FeatureType = 'culture' | 'food' | 'party' | 'relax' | 'attractions' | 'accommodation' | 'natural-beauty' | 'uniqueness' | 'adrenaline';

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
              )}

              {/* Videos */}
              {destination.videos && destination.videos.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-6">Explorar {destination.title}</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {destination.videos.map((video, index) => (
                      <div key={index} className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                        {video.provider === 'youtube' && (
                          <iframe 
                            src={`https://www.youtube.com/embed/${video.source}`}
                            title={`Video ${index + 1}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          ></iframe>
                        )}
                        {video.provider === 'vimeo' && (
                          <iframe 
                            src={`https://player.vimeo.com/video/${video.source}`}
                            title={`Video ${index + 1}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          ></iframe>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right column - Sidebar */}
            <div>
              {/* Expert recommendation */}
              {destination.recommendedBy && (
                <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                  <h2 className="text-xl font-baloo font-bold text-secondary-900 mb-4">Recomendado por</h2>
                  <div className="flex items-center mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={destination.recommendedBy.photo}
                        alt={destination.recommendedBy.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-baloo font-bold text-lg text-secondary-900">{destination.recommendedBy.name}</h3>
                      <div className="flex space-x-2 mt-1">
                        {destination.recommendedBy.socialMediaInformation.map((social, index) => (
                          <a 
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-primary-600"
                          >
                            {social.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{destination.recommendedBy.recommendationText}"</p>
                </div>
              )}

              {/* CTA */}
              <DestinationCTA 
                destinationTitle={destination.title} 
                destinationUniqueName={destination.uniqueName} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}