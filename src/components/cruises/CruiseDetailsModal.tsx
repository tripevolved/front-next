"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageGrid } from "../common/ImageGrid";
import CruiseRatesCarousel from "./CruisesRatesCarousel";
import CruiseLeadModal from "../consultancy/CruiseLeadModal";
import CruiseShipCard from "./CruiseShipCard";
import CruiseShipDetailsModal from "./CruiseShipDetailsModal";
import { CruisesApiService } from "@/clients/cruises";
import type { CruiseDetails } from "@/clients/cruises/cruises";

type CruiseDetailsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  uniqueName?: string;
};

export default function CruiseDetailsModal({ isOpen, handleClose, uniqueName }: CruiseDetailsModalProps) {
  const [cruiseDetails, setCruiseDetails] = useState<CruiseDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalText, setLeadModalText] = useState('Reservar');
  const [isShipDetailsModalOpen, setIsShipDetailsModalOpen] = useState(false);
  const thankYouText = 'Obrigado! Vamos entrar em contato para planejar sua jornada.';

  useEffect(() => {
    if (isOpen && uniqueName) {
      setLoading(true);
      setError(null);
      CruisesApiService.getCruiseByUniqueName(uniqueName)
        .then((data) => {
          setCruiseDetails(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching cruise details:", err);
          setError("Não foi possível carregar os detalhes do cruzeiro.");
          setLoading(false);
        });
    } else if (!isOpen) {
      // Reset state when modal closes
      setCruiseDetails(null);
      setError(null);
      setExpandedDescriptions(new Set());
    }
  }, [isOpen, uniqueName]);

  const toggleDescription = (index: number) => {
    setExpandedDescriptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Format date range helper
  const formatDateRange = (departureDate: Date, arrivalDate: Date) => {
    const depDate = typeof departureDate === 'string' ? new Date(departureDate) : departureDate;
    const arrDate = typeof arrivalDate === 'string' ? new Date(arrivalDate) : arrivalDate;
    
    const depDay = depDate.getDate();
    const depMonth = depDate.toLocaleDateString('pt-BR', { month: 'long' });
    const depYear = depDate.getFullYear();
    
    const arrDay = arrDate.getDate();
    const arrMonth = arrDate.toLocaleDateString('pt-BR', { month: 'long' });
    const arrYear = arrDate.getFullYear();
    
    if (depMonth === arrMonth && depYear === arrYear) {
      return `De ${depDay} a ${arrDay} de ${depMonth} de ${depYear}`;
    } else {
      return `De ${depDay} de ${depMonth} de ${depYear} a ${arrDay} de ${arrMonth} de ${arrYear}`;
    }
  };

  // Format date helper for itinerary items
  const formatItineraryDate = (dateTime: Date) => {
    const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Format time helper for itinerary items
  const formatItineraryTime = (dateTime: Date) => {
    const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate duration in days
  const calculateDuration = (departureDate: Date, arrivalDate: Date): string => {
    const depDate = typeof departureDate === 'string' ? new Date(departureDate) : departureDate;
    const arrDate = typeof arrivalDate === 'string' ? new Date(arrivalDate) : arrivalDate;
    const diffTime = Math.abs(arrDate.getTime() - depDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;
  };

  // Get search data from cruise details
  const getSearchData = () => {
    if (!cruiseDetails) {
      return {
        month: '',
        duration: '',
        cruiseName: ''
      };
    }

    // Get month from departure date
    const depDate = typeof cruiseDetails.departureDate === 'string' 
      ? new Date(cruiseDetails.departureDate) 
      : cruiseDetails.departureDate;
    const month = depDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

    // Calculate duration
    const duration = calculateDuration(cruiseDetails.departureDate, cruiseDetails.arrivalDate);

    return {
      month: month || '',
      duration: duration || '',
      cruiseName: cruiseDetails.title || ''
    };
  };

  if (!isOpen) return null;
  
  return (
    <div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl py-8 px-3 max-w-5xl w-full relative max-h-[90vh] overflow-hidden flex flex-col">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600 z-10"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto pb-9">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                <span className="ml-3 text-gray-600">Carregando detalhes do cruzeiro...</span>
              </div>
            )}
            
            {error && (
              <div className="text-center py-8">
                <p className="text-red-500 font-comfortaa text-lg">{error}</p>
                <button
                  onClick={() => {
                    if (uniqueName) {
                      setLoading(true);
                      setError(null);
                      CruisesApiService.getCruiseByUniqueName(uniqueName)
                        .then((data) => {
                          setCruiseDetails(data);
                          setLoading(false);
                        })
                        .catch((err) => {
                          console.error("Error fetching cruise details:", err);
                          setError("Não foi possível carregar os detalhes do cruzeiro.");
                          setLoading(false);
                        });
                    }
                  }}
                  className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {!loading && !error && cruiseDetails && (
              <>
                {cruiseDetails.images && cruiseDetails.images.length > 0 && (
                  <div className="w-full mt-2">
                    <ImageGrid 
                      images={cruiseDetails.images} 
                      title={cruiseDetails.title} 
                    />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <span className="text-gray-500">{cruiseDetails.company}</span>
                  <h1 className="font-bold text-primary-500 text-xl">
                    {cruiseDetails.title}
                  </h1>
                  {cruiseDetails.departureDate && cruiseDetails.arrivalDate && (
                    <span className="font-bold text-gray-500">
                      {formatDateRange(cruiseDetails.departureDate, cruiseDetails.arrivalDate)}
                    </span>
                  )}
                </div>
                {cruiseDetails.highlights && cruiseDetails.highlights.length > 0 && (
                  <div className="p-3 md:px-4 px-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cruiseDetails.highlights.map((highlight, index) => (
                      <div key={index} className="flex flex-col gap-2 text-left border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                        {highlight.description && (
                          <span className="text-accent-500 text-sm italic">
                            {highlight.description}
                          </span>
                        )}
                        {highlight.expertQuote && (
                          <span className="text-gray-600 text-md">
                            {highlight.expertQuote}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-col gap-8 p-3">
                  {cruiseDetails.itinerary && cruiseDetails.itinerary.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h1 className="font-bold text-xl">Itinerário</h1>
                      <div className="flex flex-col gap-4">
                        {cruiseDetails.itinerary.map((item, index) => {
                          const imageUrl = item.image?.url || '/assets/blank-image.png';
                          const imageAlt = item.image?.shortDescription || item.title;
                          
                          // Check if this is an embarkation or disembarkation based on date presence
                          const hasEmbarkation = item.embarkationStartDateTime && item.embarkationEndDateTime;
                          const hasDisembarkation = item.disembarkationStartDateTime && item.disembarkationEndDateTime;
                          
                          // Determine which date to show
                          const displayDate = hasEmbarkation && item.embarkationStartDateTime
                            ? item.embarkationStartDateTime
                            : item.arrivalDateTime;
                          
                          // Determine time display based on item type
                          const getTimeDisplay = () => {
                            if (hasEmbarkation) {
                              // Embarkation: show embarkation time range and departure time
                              const embarkRange = `${formatItineraryTime(item.embarkationStartDateTime!)} - ${formatItineraryTime(item.embarkationEndDateTime!)}`;
                              const departure = item.departureDateTime ? formatItineraryTime(item.departureDateTime) : null;
                              return departure 
                                ? `Embarque: ${embarkRange} • Partida: ${departure}`
                                : `Embarque: ${embarkRange}`;
                            } else if (hasDisembarkation) {
                              // Disembarkation: show arrival time and disembarkation time range
                              const arrival = item.arrivalDateTime ? formatItineraryTime(item.arrivalDateTime) : null;
                              const disembarkRange = `${formatItineraryTime(item.disembarkationStartDateTime!)} - ${formatItineraryTime(item.disembarkationEndDateTime!)}`;
                              return arrival
                                ? `Chegada: ${arrival} • Desembarque: ${disembarkRange}`
                                : `Desembarque: ${disembarkRange}`;
                            } else {
                              // Regular port: show arrival and departure times
                              const arrival = item.arrivalDateTime ? formatItineraryTime(item.arrivalDateTime) : null;
                              const departure = item.departureDateTime ? formatItineraryTime(item.departureDateTime) : null;
                              if (arrival && departure) {
                                return `${arrival} - ${departure}`;
                              } else if (arrival) {
                                return `Chegada: ${arrival}`;
                              } else if (departure) {
                                return `Partida: ${departure}`;
                              }
                              return null;
                            }
                          };

                          return (
                            <div
                              key={index}
                              className={`flex gap-4 items-start ${
                                index < cruiseDetails.itinerary!.length - 1
                                  ? 'border-b border-gray-200 pb-4'
                                  : ''
                              }`}
                            >
                              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                                <Image
                                  src={imageUrl}
                                  alt={imageAlt}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex flex-col gap-1 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-primary-500">
                                    Dia {index + 1}
                                  </span>
                                  {displayDate && (
                                    <span className="text-sm text-gray-500">
                                      {formatItineraryDate(displayDate)}
                                    </span>
                                  )}
                                </div>
                                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                {getTimeDisplay() && (
                                  <p className="text-sm text-gray-600">
                                    {getTimeDisplay()}
                                  </p>
                                )}
                                {item.dockType && (
                                  <p className="text-xs text-gray-500 italic">
                                    {item.dockType === 'Tender' ? 'Desembarque por balsa' : 'Atracado no cais'}
                                  </p>
                                )}
                                {item.highlight && (
                                  <p className="text-sm text-accent-500 font-medium">{item.highlight}</p>
                                )}
                                {item.description && (
                                  <div className="flex flex-col gap-1">
                                    {expandedDescriptions.has(index) && (
                                      <p className="text-sm text-gray-500">{item.description}</p>
                                    )}
                                    <button
                                      onClick={() => toggleDescription(index)}
                                      className="text-sm text-primary-500 hover:text-primary-600 font-medium self-start transition-colors"
                                    >
                                      {expandedDescriptions.has(index) ? 'Ver menos' : 'Ver mais'}
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {cruiseDetails.services && cruiseDetails.services.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h1 className="font-bold text-xl">A jornada inclui:</h1>
                      <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-200 rounded-lg bg-white shadow-sm">
                        {cruiseDetails.services.map((service, index) => (
                            <div
                              key={index}
                              className="flex gap-3 items-start p-4"
                            >
                              {service.icon && (
                                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-primary-500">
                                  <img
                                    src={`/assets/services/${service.icon}.svg`}
                                    alt=""
                                    className="w-6 h-6 object-contain"
                                  />
                                </div>
                              )}
                              <div className="flex flex-col gap-0.5 min-w-0">
                                <span className="font-medium text-sm text-gray-900">{service.name}</span>
                                {service.description && (
                                  <span className="text-xs text-gray-600 italic">
                                    {service.description}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  {cruiseDetails.ship && (
                    <div className="flex flex-col gap-3">
                      <h1 className="font-bold text-xl">Navio</h1>
                      <CruiseShipCard
                        shipName={cruiseDetails.ship}
                        onOpenDetails={() => setIsShipDetailsModalOpen(true)}
                      />
                    </div>
                  )}
                  {cruiseDetails.rateView && cruiseDetails.rateView.rates && cruiseDetails.rateView.rates.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h1 className="font-bold text-xl">Quartos</h1>
                      <CruiseRatesCarousel rates={cruiseDetails.rateView.rates} />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          {!loading && !error && cruiseDetails && (
            <div className="absolute bottom-4 left-8 right-8 z-20 bg-gradient-to-t from-white via-white to-transparent pt-4">
              <button
                onClick={() => setIsLeadModalOpen(true)}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
                disabled={leadModalText === thankYouText}
              >
                {leadModalText}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <CruiseLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => { setIsLeadModalOpen(false); setLeadModalText(thankYouText); }}
        searchData={getSearchData()}
      />
      <CruiseShipDetailsModal
        isOpen={isShipDetailsModalOpen}
        onClose={() => setIsShipDetailsModalOpen(false)}
        shipName={cruiseDetails?.ship ?? null}
      />
    </div>
  );
}
