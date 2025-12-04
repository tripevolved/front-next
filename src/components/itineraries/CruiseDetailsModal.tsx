"use client";

import { useState } from "react";
import Image from "next/image";
import type { Cruise } from "@/core/types/cruise";

interface CruiseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cruise: Cruise;
}

export function CruiseDetailsModal({ isOpen, onClose, cruise }: CruiseDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'main' | 'itinerary' | 'experiences' | 'ship'>('main');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  const tabs = [
    { id: 'main', label: 'Informações Principais' },
    { id: 'itinerary', label: 'Roteiro' },
    { id: 'experiences', label: 'Experiências' },
    { id: 'ship', label: 'Navio' }
  ] as const;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % cruise.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + cruise.images.length) % cruise.images.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full h-[90vh] flex flex-col overflow-hidden">
        {/* Hero Header with Background Image - Fixed Height */}
        <div className="relative h-64 rounded-t-xl overflow-hidden flex-shrink-0">
          <Image
            src={cruise.images[currentImageIndex]}
            alt={cruise.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
          
          {/* Image Navigation */}
          <div className="absolute top-4 right-4 flex gap-2 z-20 pointer-events-auto">
            <button
              onClick={prevImage}
              className="w-10 h-10 md:w-8 md:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 active:bg-white/40 transition-colors relative z-20"
              aria-label="Imagem anterior"
            >
              <svg className="w-5 h-5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="w-10 h-10 md:w-8 md:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 active:bg-white/40 transition-colors relative z-20"
              aria-label="Próxima imagem"
            >
              <svg className="w-5 h-5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20 pointer-events-auto">
            {cruise.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 md:w-2 md:h-2 rounded-full transition-colors relative z-20 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>

          {/* Header Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10 pointer-events-none">
            <div className="flex justify-between items-end">
              <div className="text-white pointer-events-none">
                <h2 className="text-3xl font-baloo font-bold">{cruise.name}</h2>
                <p className="text-lg opacity-90 mt-1">{cruise.description}</p>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors relative z-20 pointer-events-auto"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs - Fixed Height */}
        <div className="border-b border-gray-200 bg-white flex-shrink-0 overflow-x-auto">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content - Scrollable Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {activeTab === 'main' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Porto de Partida:</span>
                        <p className="font-medium">{cruise.details.main.departurePort}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Porto de Chegada:</span>
                        <p className="font-medium">{cruise.details.main.arrivalPort}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Data de Partida:</span>
                        <p className="font-medium">{cruise.details.main.departureDate}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Data de Chegada:</span>
                        <p className="font-medium">{cruise.details.main.arrivalDate}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Tipo de Cabine:</span>
                        <p className="font-medium">{cruise.details.main.cabinType}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Preço:</span>
                        <p className="font-medium text-primary-600">{cruise.details.main.price}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Destaques</h3>
                    <ul className="space-y-2">
                      {cruise.details.main.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 text-green-600">Incluído</h3>
                    <ul className="space-y-2">
                      {cruise.details.main.included.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 text-red-600">Não Incluído</h3>
                    <ul className="space-y-2">
                      {cruise.details.main.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-4 h-4 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Resumo do Roteiro</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Total de Dias:</span>
                      <p className="font-medium">{cruise.details.itinerary.totalDays} dias</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Dias no Mar:</span>
                      <p className="font-medium">{cruise.details.itinerary.daysAtSea} dias</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Portos:</span>
                      <p className="font-medium">{cruise.details.itinerary.ports.length} portos</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm text-gray-600">Rota:</span>
                    <p className="font-medium">{cruise.details.itinerary.route}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Portos de Escala</h3>
                  <div className="space-y-4">
                    {cruise.details.itinerary.ports.map((port, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={port.image!}
                            alt={`${port.name}, ${port.country}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-0 left-0 p-4 text-white">
                            <h4 className="font-semibold text-lg">{port.name}, {port.country}</h4>
                            <p className="text-sm opacity-90">{port.duration}</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div className="text-sm text-gray-600">
                              <p>Chegada: {port.arrivalTime}</p>
                              <p>Partida: {port.departureTime}</p>
                            </div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Destaques:</span>
                            <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-1">
                              {port.highlights.map((highlight, highlightIndex) => (
                                <li key={highlightIndex} className="text-sm text-gray-700 flex items-center">
                                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'experiences' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cruise.details.experiences.map((experience, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={experience.image!}
                          alt={experience.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            experience.included 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {experience.included ? 'Incluído' : 'Opcional'}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{experience.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{experience.description}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{experience.duration}</span>
                          <span className="capitalize">{experience.category}</span>
                        </div>
                        {experience.price && (
                          <p className="text-sm font-medium text-primary-600 mt-2">{experience.price}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'ship' && (
              <div className="space-y-6">
                {/* Ship Hero Image */}
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={cruise.details.ship.image}
                    alt={cruise.details.ship.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-bold">{cruise.details.ship.name}</h3>
                    <p className="text-lg opacity-90">{cruise.details.ship.company}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Destaques</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {cruise.details.ship.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Comodidades</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cruise.details.ship.amenities.map((amenity, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{amenity.category}</h4>
                        <ul className="space-y-1">
                          {amenity.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-sm text-gray-600 flex items-center">
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Restaurantes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cruise.details.ship.dining.map((restaurant, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="relative h-32">
                          <Image
                            src={restaurant.image!}
                            alt={restaurant.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              restaurant.included 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {restaurant.included ? 'Incluído' : 'Opcional'}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">{restaurant.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{restaurant.description}</p>
                          <span className="text-xs text-gray-500 capitalize">{restaurant.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Entretenimento</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cruise.details.ship.entertainment.map((item, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="relative h-32">
                          <Image
                            src={item.image!}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <span className="text-xs text-gray-500 capitalize">{item.type}</span>
                          </div>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações do Navio</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Empresa:</span>
                      <p className="font-medium">{cruise.details.ship.company}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Capacidade:</span>
                      <p className="font-medium">{cruise.details.ship.capacity.toLocaleString()} passageiros</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Ano de Construção:</span>
                      <p className="font-medium">{cruise.details.ship.yearBuilt}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Reformado:</span>
                      <p className="font-medium">{cruise.details.ship.refurbished || 'Não'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Comprimento:</span>
                      <p className="font-medium">{cruise.details.ship.length}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Largura:</span>
                      <p className="font-medium">{cruise.details.ship.width}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Conveses:</span>
                      <p className="font-medium">{cruise.details.ship.decks}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
