'use client'

import { PublicStay } from '@/core/types/stay'
import { ImageGrid } from '@/components/common/ImageGrid'

interface StayDetailProps {
  stay: PublicStay
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

              {/* Highlights Section */}
              {stay.highlights && stay.highlights.length > 0 && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    Por que escolhemos esta hospedagem
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {stay.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        {highlight.icon && (
                          <div className="text-4xl mb-4">{highlight.icon}</div>
                        )}
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">
                          {highlight.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Location */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                  Localização
                </h2>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-gray-700 mb-2">
                    <strong>Endereço:</strong> {stay.location.address}
                  </p>
                  <p className="text-gray-700">
                    <strong>Cidade:</strong> {stay.location.city}, {stay.location.country}
                  </p>
                  {stay.location.nearbyAttractions && stay.location.nearbyAttractions.length > 0 && (
                    <div className="mt-4">
                      <p className="text-gray-700 font-semibold mb-2">Atrações próximas:</p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {stay.location.nearbyAttractions.map((attraction, index) => (
                          <li key={index}>{attraction}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>

              {/* Check-in/Check-out Info */}
              {(stay.checkInInfo || stay.checkOutInfo) && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    Informações de Check-in e Check-out
                  </h2>
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

              {/* Cancellation Policy */}
              {stay.cancellationPolicy && (
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
                    Política de Cancelamento
                  </h2>
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <p className="text-gray-700">
                      {stay.cancellationPolicy}
                    </p>
                  </div>
                </section>
              )}
            </div>

            {/* Right column - Sidebar */}
            <div className="space-y-6">
              {/* Amenities */}
              {stay.amenities && stay.amenities.length > 0 && (
                <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">
                    Comodidades
                  </h2>
                  <div className="space-y-4">
                    {stay.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        {amenity.icon && (
                          <span className="text-2xl flex-shrink-0">{amenity.icon}</span>
                        )}
                        <span className="text-gray-700">{amenity.title}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

