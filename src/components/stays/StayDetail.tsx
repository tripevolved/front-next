'use client'

import { PublicStay } from '@/core/types/stay'
import { ImageGrid } from '@/components/common/ImageGrid'
import Image from 'next/image'

interface StayDetailProps {
  stay: PublicStay
}

// Helper function to get icon image path
const getIconPath = (iconName: string | undefined): string | null => {
  if (!iconName) return null
  return `/assets/emojis/${iconName}.png`
}

// Helper function to get amenity icon path
const getAmenityIconPath = (iconName: string | undefined): string | null => {
  if (!iconName) return null
  return `/assets/amenities/${iconName}.svg`
}

export function StayDetail({ stay }: StayDetailProps) {
  const imageUrls = stay.images.map((image) => image.url)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section with image grid */}
      {imageUrls.length > 0 && (
        <ImageGrid
          images={imageUrls}
          title={stay.title}
        />
      )}

      {/* Title and info section */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            {stay.title}
          </h1>
          {stay.subtitle && (
            <p className="text-xl md:text-2xl text-gray-600 mb-4">
              {stay.subtitle}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {stay.tags && (
              <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {stay.tags}
              </span>
            )}
            {stay.recommendedFor && stay.recommendedFor.length > 0 && (
              <>
                {stay.recommendedFor.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Highlights Section - Full Width */}
      {stay.highlights && stay.highlights.length > 0 && (
        <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 text-center">
                Por que escolhemos esta hospedagem
              </h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Nossa curadoria especial para casais em busca de momentos inesquecíveis
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stay.highlights.map((highlight, index) => {
                  const iconPath = getIconPath(highlight.icon)
                  
                  return (
                    <div
                      key={index}
                      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      {/* Image Background */}
                      {highlight.imageUrl && (
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={highlight.imageUrl}
                            alt={highlight.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          {iconPath && (
                            <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full p-3 shadow-lg">
                              <div className="relative w-full h-full">
                                <Image
                                  src={iconPath}
                                  alt={highlight.title}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="p-6">
                        {!highlight.imageUrl && iconPath && (
                          <div className="w-12 h-12 mb-4 relative">
                            <Image
                              src={iconPath}
                              alt={highlight.title}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                          {highlight.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                      
                      {/* Decorative element */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left column - Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                  Sobre a Hospedagem
                </h2>
                <div 
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: stay.description }}
                />
              </section>

              {/* Amenities */}
              {stay.amenities && stay.amenities.length > 0 && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    O que te espera nesta hospedagem?
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {stay.amenities.map((amenity, index) => {
                      const amenityIconPath = getAmenityIconPath(amenity.icon)
                      
                      return (
                        <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                          {amenityIconPath && (
                            <div className="w-6 h-6 flex-shrink-0 text-primary-600">
                              <Image
                                src={amenityIconPath}
                                alt={amenity.title}
                                width={24}
                                height={24}
                                className="w-full h-full"
                              />
                            </div>
                          )}
                          <span className="text-gray-700 text-sm">{amenity.title}</span>
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}

              {/* Check-in/Check-out Info */}
              {(stay.checkInInfo || stay.checkOutInfo) && (
                <section>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stay.checkInInfo && (
                      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">
                          Check-in
                        </h3>
                        <p className="text-gray-700 mb-2">
                          <strong>Horário:</strong> {stay.checkInInfo.hour}
                        </p>
                        {stay.checkInInfo.instructions && (
                          <p className="text-gray-700">
                            {stay.checkInInfo.instructions}
                          </p>
                        )}
                      </div>
                    )}
                    {stay.checkOutInfo && (
                      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">
                          Check-out
                        </h3>
                        <p className="text-gray-700 mb-2">
                          <strong>Horário:</strong> {stay.checkOutInfo.hour}
                        </p>
                        {stay.checkOutInfo.instructions && (
                          <p className="text-gray-700">
                            {stay.checkOutInfo.instructions}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>

            {/* Right column - Sidebar */}
            <div className="space-y-6">
              {/* CTA Section for couples trips */}
              <section className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 rounded-lg shadow-lg text-white">
                <h3 className="text-xl font-bold mb-3">
                  Pronto para sua viagem a dois?
                </h3>
                <p className="mb-4 text-white/90">
                  Entre em contato conosco para personalizar sua experiência.
                </p>
                <button className="w-full bg-white text-primary-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                  Solicitar Orçamento
                </button>
              </section>

              {/* Location */}
              <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-gray-900">
                  Localização
                </h2>
                <p className="text-gray-700 mb-2">
                  <strong>Endereço:</strong> {stay.location.address}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Cidade:</strong> {stay.location.city}, {stay.location.country}
                </p>
                {stay.location.nearbyAttractions && stay.location.nearbyAttractions.length > 0 && (
                  <div>
                    <p className="text-gray-700 font-semibold mb-2">Atrações próximas:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {stay.location.nearbyAttractions.map((attraction, index) => (
                        <li key={index}>{attraction}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

