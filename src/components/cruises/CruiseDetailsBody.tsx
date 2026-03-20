"use client";

import Image from "next/image";

import type { CruiseDetails } from "@/clients/cruises/cruises";
import { ImageGrid } from "../common/ImageGrid";
import CruiseRatesCarousel from "./CruisesRatesCarousel";
import CruiseRestaurantsCarousel from "./CruiseRestaurantsCarousel";
import CruiseShipCard from "./CruiseShipCard";

type CruiseDetailsBodyProps = {
  cruiseDetails: CruiseDetails;
  variant: "page" | "modal";
  expandedDescriptions: Set<number>;
  toggleDescription: (index: number) => void;
  onOpenShipDetails: () => void;
};

export default function CruiseDetailsBody({
  cruiseDetails,
  variant,
  expandedDescriptions,
  toggleDescription,
  onOpenShipDetails,
}: CruiseDetailsBodyProps) {
  const formatDateRange = (departureDate: Date, arrivalDate: Date) => {
    const depDate = typeof departureDate === "string" ? new Date(departureDate) : departureDate;
    const arrDate = typeof arrivalDate === "string" ? new Date(arrivalDate) : arrivalDate;

    const depDay = depDate.getDate();
    const depMonth = depDate.toLocaleDateString("pt-BR", { month: "long" });
    const depYear = depDate.getFullYear();

    const arrDay = arrDate.getDate();
    const arrMonth = arrDate.toLocaleDateString("pt-BR", { month: "long" });
    const arrYear = arrDate.getFullYear();

    if (depMonth === arrMonth && depYear === arrYear) {
      return `De ${depDay} a ${arrDay} de ${depMonth} de ${depYear}`;
    }
    return `De ${depDay} de ${depMonth} de ${depYear} a ${arrDay} de ${arrMonth} de ${arrYear}`;
  };

  const formatItineraryDate = (dateTime: Date) => {
    const date = typeof dateTime === "string" ? new Date(dateTime) : dateTime;
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatItineraryTime = (dateTime: Date) => {
    const date = typeof dateTime === "string" ? new Date(dateTime) : dateTime;
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {cruiseDetails.images && cruiseDetails.images.length > 0 && (
        <div className="w-full mt-2">
          <ImageGrid images={cruiseDetails.images} title={cruiseDetails.title} />
        </div>
      )}

      <div className="flex flex-col gap-1">
        <span className="text-gray-500">{cruiseDetails.company}</span>
        <h1
          className={[
            "font-bold text-primary-500",
            variant === "page" ? "text-2xl md:text-3xl" : "text-xl",
          ].join(" ")}
        >
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
            <div
              key={index}
              className="flex flex-col gap-2 text-left border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
            >
              {highlight.description && (
                <span className="text-accent-500 text-sm italic">{highlight.description}</span>
              )}
              {highlight.expertQuote && (
                <span className="text-gray-600 text-md">{highlight.expertQuote}</span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-8 p-3">
        {cruiseDetails.itinerary && cruiseDetails.itinerary.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-xl">Itinerário</h2>
            <div className="flex flex-col gap-4">
              {cruiseDetails.itinerary.map((item, index) => {
                const imageUrl = item.image?.url || "/assets/blank-image.png";
                const imageAlt = item.image?.shortDescription || item.title;

                // Check if this is an embarkation or disembarkation based on date presence
                const hasEmbarkation = item.embarkationStartDateTime && item.embarkationEndDateTime;
                const hasDisembarkation =
                  item.disembarkationStartDateTime && item.disembarkationEndDateTime;

                // Determine which date to show
                const displayDate = hasEmbarkation && item.embarkationStartDateTime
                  ? item.embarkationStartDateTime
                  : item.arrivalDateTime;

                const getTimeDisplay = () => {
                  if (hasEmbarkation) {
                    const embarkRange = `${formatItineraryTime(item.embarkationStartDateTime!)} - ${formatItineraryTime(
                      item.embarkationEndDateTime!,
                    )}`;
                    const departure = item.departureDateTime
                      ? formatItineraryTime(item.departureDateTime)
                      : null;
                    return departure ? `Embarque: ${embarkRange} • Partida: ${departure}` : `Embarque: ${embarkRange}`;
                  }

                  if (hasDisembarkation) {
                    const arrival = item.arrivalDateTime ? formatItineraryTime(item.arrivalDateTime) : null;
                    const disembarkRange = `${formatItineraryTime(
                      item.disembarkationStartDateTime!,
                    )} - ${formatItineraryTime(item.disembarkationEndDateTime!)}`;
                    return arrival
                      ? `Chegada: ${arrival} • Desembarque: ${disembarkRange}`
                      : `Desembarque: ${disembarkRange}`;
                  }

                  const arrival = item.arrivalDateTime ? formatItineraryTime(item.arrivalDateTime) : null;
                  const departure = item.departureDateTime ? formatItineraryTime(item.departureDateTime) : null;
                  if (arrival && departure) return `${arrival} - ${departure}`;
                  if (arrival) return `Chegada: ${arrival}`;
                  if (departure) return `Partida: ${departure}`;
                  return null;
                };

                return (
                  <div
                    key={index}
                    className={`flex gap-4 items-start ${
                      index < cruiseDetails.itinerary!.length - 1 ? "border-b border-gray-200 pb-4" : ""
                    }`}
                  >
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image src={imageUrl} alt={imageAlt} fill className="object-cover" />
                    </div>

                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary-500">Dia {index + 1}</span>
                        {displayDate && <span className="text-sm text-gray-500">{formatItineraryDate(displayDate)}</span>}
                      </div>

                      <h3 className="font-semibold text-gray-900">{item.title}</h3>

                      {getTimeDisplay() && <p className="text-sm text-gray-600">{getTimeDisplay()}</p>}

                      {item.dockType && (
                        <p className="text-xs text-gray-500 italic">
                          {item.dockType === "Tender" ? "Desembarque por balsa" : "Atracado no cais"}
                        </p>
                      )}

                      {item.highlight && <p className="text-sm text-accent-500 font-medium">{item.highlight}</p>}

                      {item.description && (
                        <div className="flex flex-col gap-1">
                          {expandedDescriptions.has(index) && (
                            <p className="text-sm text-gray-500">{item.description}</p>
                          )}
                          <button
                            onClick={() => toggleDescription(index)}
                            className="text-sm text-primary-500 hover:text-primary-600 font-medium self-start transition-colors"
                          >
                            {expandedDescriptions.has(index) ? "Ver menos" : "Ver mais"}
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
            <h2 className="font-bold text-xl">A jornada inclui:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-200 rounded-lg bg-white shadow-sm">
              {cruiseDetails.services.map((service, index) => (
                <div key={index} className="flex gap-3 items-start p-4">
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
                      <span className="text-xs text-gray-600 italic">{service.description}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {cruiseDetails.ship && (
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-xl">Navio</h2>
            <CruiseShipCard shipName={cruiseDetails.ship} onOpenDetails={onOpenShipDetails} />
          </div>
        )}

        {cruiseDetails.ship && (
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-xl">Restaurantes</h2>
            <CruiseRestaurantsCarousel shipName={cruiseDetails.ship} />
          </div>
        )}

        {cruiseDetails.rateView?.rates && cruiseDetails.rateView.rates.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-xl">Quartos</h2>
            <CruiseRatesCarousel rates={cruiseDetails.rateView.rates} />
          </div>
        )}
      </div>
    </>
  );
}

