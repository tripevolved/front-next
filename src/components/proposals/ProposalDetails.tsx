"use client";

import type { Accommodation, Flight, OtherInclusion, PricingItem } from "@/core/types/uniqueMoments";

interface ProposalDetailsProps {
  accommodations: Accommodation[];
  flights: Flight[];
  otherInclusions: OtherInclusion[];
  potentialInclusions?: OtherInclusion[];
  pricing: PricingItem[];
  description: string;
  cta: {
    text: string;
    action: string;
  };
}

export function ProposalDetails({ accommodations, flights, otherInclusions, potentialInclusions, pricing, description, cta }: ProposalDetailsProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getTotalPrice = () => {
    return pricing
      .filter(item => item.type !== 'bonus')
      .reduce((total, item) => total + item.amount, 0);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-baloo font-bold text-secondary-900 mb-4">
              Detalhes da Proposta
            </h2>
            <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
              {description}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Inclusions */}
            <div className="lg:col-span-2">
              {/* Accommodations */}
              <div className="mb-8">
                <h3 className="text-2xl font-baloo font-bold text-secondary-900 mb-6">
                  Hospedagem
                </h3>
                <div className="space-y-4">
                  {accommodations.map((accommodation, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <img 
                        src={accommodation.image} 
                        alt={accommodation.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-secondary-900">
                            {accommodation.name}
                          </h4>
                          <span className="text-sm text-secondary-600 bg-white px-2 py-1 rounded">
                            {accommodation.dates}
                          </span>
                        </div>
                        <p className="text-secondary-700 text-sm">
                          {accommodation.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flights */}
              <div className="mb-8">
                <h3 className="text-2xl font-baloo font-bold text-secondary-900 mb-6">
                  Passagens Aéreas
                </h3>
                <div className="space-y-4">
                  {flights.map((flight, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-secondary-900 mb-1">
                            {flight.fromAirport} → {flight.toAirport}
                          </h4>
                          <p className="text-sm text-secondary-600">
                            Voo {flight.flightNumber} • {flight.airline}
                          </p>
                        </div>
                        <span className="text-sm text-secondary-600 bg-white px-2 py-1 rounded">
                          {flight.departureDate}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-secondary-700">
                        <div>
                          <span className="font-medium">Partida:</span><br />
                          {flight.departureTime}
                        </div>
                        <div>
                          <span className="font-medium">Chegada:</span><br />
                          {flight.arrivalTime}
                        </div>
                        <div>
                          <span className="font-medium">Classe:</span><br />
                          {flight.class}
                        </div>
                        <div>
                          <span className="font-medium">Bagagem:</span><br />
                          {flight.baggage}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Inclusions */}
              <div className="mb-8">
                <h3 className="text-2xl font-baloo font-bold text-secondary-900 mb-6">
                  Inclusos
                </h3>
                <div className="space-y-4">
                  {otherInclusions.map((inclusion, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-secondary-900 mb-2">
                        {inclusion.title}
                      </h4>
                      <p className="text-secondary-700 text-sm">
                        {inclusion.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Potential Inclusions */}
              {potentialInclusions && potentialInclusions.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-baloo font-bold text-secondary-900 mb-6">
                    Outras possíveis inclusões (não inclusas no preço)
                  </h3>
                  <div className="space-y-4">
                    {potentialInclusions.map((inclusion, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-secondary-900 mb-2">
                          {inclusion.title}
                        </h4>
                        <p className="text-secondary-700 text-sm">
                          {inclusion.details}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Pricing and CTA */}
            <div className="lg:pl-8">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 sticky top-8">
                {/* Pricing */}
                <div className="mb-8">
                  <h3 className="text-2xl font-baloo font-bold text-secondary-900 mb-6">
                    Investimento
                  </h3>
                  
                  {pricing.map((item, index) => (
                    <div key={index} className="mb-4 flex justify-between items-center">
                      <span className="text-secondary-900">
                        {item.title}
                      </span>
                      <div className="text-right">
                        {item.type === 'bonus' ? (
                          <>
                            <span className="text-lg font-bold text-green-600 block">
                              Grátis
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(item.originalAmount || 0)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-secondary-900">
                            {formatPrice(item.amount)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Total */}
                  <div className="pt-4 border-t border-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-secondary-900">
                        Total
                      </span>
                      <span className="text-2xl font-baloo font-bold text-secondary-900">
                        {formatPrice(getTotalPrice())}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={cta.action}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 text-center block"
                >
                  {cta.text}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 