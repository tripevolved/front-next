import Image from 'next/image'
import Link from 'next/link'
import { DestinationsApiService } from '@/clients/destinations'
import { PublicDestination, TravelType } from '@/core/types/destination'
import { PhotoCarousel } from '@/components/PhotoCarousel'

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Left column - Main content */}
            <div className="md:col-span-2">
              {/* Description */}
              <section className="mb-12">
                <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-4">Sobre este destino</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700">
                    {destination.features && destination.features.length > 0 
                      ? destination.features[0].description 
                      : 'Descrição não disponível para este destino.'}
                  </p>
                </div>
              </section>

              {/* Features */}
              {destination.features && destination.features.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-6">O que este destino oferece</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {destination.features.map((feature, index) => (
                      <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-start">
                          <div className="text-2xl mr-4">{feature.type}</div>
                          <div>
                            <h3 className="font-baloo font-bold text-lg text-secondary-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Tips */}
              {destination.tips && destination.tips.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-6">Dicas para sua viagem</h2>
                  <div className="space-y-6">
                    {destination.tips.map((tip, index) => (
                      <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex items-start">
                          <div className="text-2xl mr-4">{tip.type}</div>
                          <div>
                            <h3 className="font-baloo font-bold text-lg text-secondary-900 mb-1">{tip.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">{tip.subtitle}</p>
                            <p className="text-gray-600">{tip.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Videos */}
              {destination.videos && destination.videos.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-baloo font-bold text-secondary-900 mb-6">Vídeos</h2>
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
              <div className="bg-primary-600 text-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-baloo font-bold mb-4">Quer conhecer este destino?</h2>
                <p className="mb-6">Nossos especialistas podem ajudar a planejar sua viagem perfeita para {destination.title}.</p>
                <Link
                  href={`/destinos/${destination.uniqueName}/contato`}
                  className="w-full bg-white text-primary-600 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Falar com especialista
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}