"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PhotoCarousel } from "../PhotoCarousel";
import { Photo } from "@/core/types";
import CruiseOptionsCarousel from "./CruisesOptionsCarousel";
import { WhatsAppDirectButton } from "../WhatsAppDirectButton";
import { CruisesApiService } from "@/clients/cruises";
import type { CruiseDetails, CruiseItineraryItem } from "@/clients/cruises/cruises";

type CruiseDetailsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  uniqueName?: string;
};

export default function CruiseDetailsModal({ isOpen, handleClose, uniqueName }: CruiseDetailsModalProps) {
  const [cruiseDetails, setCruiseDetails] = useState<CruiseDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    }
  }, [isOpen, uniqueName]);

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

  // Convert images to Photo format
  const photos: Photo[] = cruiseDetails?.images && cruiseDetails.images.length > 0
    ? cruiseDetails.images.map((image) => ({
        title: cruiseDetails.title,
        sources: [
          {
            height: 400,
            width: 600,
            url: image.url,
            type: "lg" as const,
          },
        ],
        alt: image.shortDescription || cruiseDetails.title,
      }))
    : [];

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
                {photos.length > 0 && (
                  <div className="w-full mt-2 h-96">
                    <PhotoCarousel title="Cruzeiros" photos={photos} autoScroll={false} />
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
                  <div className="p-3 md:px-4 px-2 flex flex-col gap-4">
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
                {/*<div className="flex flex-col gap-8 p-3">
                  {cruiseDetails.itinerary && cruiseDetails.itinerary.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h1 className="font-bold text-xl">Itinerário</h1>
                      <div className="flex flex-col gap-4">
                        {cruiseDetails.itinerary.map((item, index) => (
                          <div
                            key={index}
                            className={`flex gap-4 items-start ${
                              index < cruiseDetails.itinerary!.length - 1
                                ? 'border-b border-gray-200 pb-4'
                                : ''
                            }`}
                          >
                            {item.image && (
                              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                                <Image
                                  src={item.image}
                                  alt={item.port}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="flex flex-col gap-1 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-primary-500">
                                  Dia {item.day}
                                </span>
                                {item.date && (
                                  <span className="text-sm text-gray-500">{item.date}</span>
                                )}
                              </div>
                              <h3 className="font-semibold text-gray-900">{item.port}</h3>
                              {item.time && (
                                <p className="text-sm text-gray-600">
                                  {item.type === 'embark' && 'Embarque • '}
                                  {item.type === 'disembark' && 'Desembarque • '}
                                  {item.time}
                                </p>
                              )}
                              {item.description && (
                                <p className="text-sm text-gray-500">{item.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {cruiseDetails.cabins && cruiseDetails.cabins.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h1 className="font-bold text-xl">Suítes</h1>
                      <CruiseOptionsCarousel />
                    </div>
                  )}

                  {cruiseDetails.gastronomy && cruiseDetails.gastronomy.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h1 className="font-bold text-xl">Gastronomia</h1>
                      <CruiseOptionsCarousel />
                    </div>
                  )}
                </div>*/}
              </>
            )}
          </div>
          {!loading && !error && cruiseDetails && (
            <div className="absolute bottom-4 left-8 right-8 z-20 bg-gradient-to-t from-white via-white to-transparent pt-4">
              <WhatsAppDirectButton
                className="w-full"
                message={`Olá! Gostaria de falar sobre o cruzeiro ${cruiseDetails.title}. Podem me ajudar?`}
              >
                Reservar
              </WhatsAppDirectButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
