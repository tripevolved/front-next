"use client";

import Image from "next/image";

import type { CruiseDetails, CruiseItineraryItem } from "@/clients/cruises/cruises";
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

  const toDate = (d: Date | string): Date =>
    typeof d === "string" ? new Date(d) : d;

  const getCruiseDay = (date: Date): number => {
    const d = toDate(date);
    const dep = toDate(cruiseDetails.departureDate);
    const depStart = new Date(dep.getFullYear(), dep.getMonth(), dep.getDate());
    const dStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const diffMs = dStart.getTime() - depStart.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  const getItemDateRange = (item: CruiseItineraryItem): { start: Date; end: Date } | null => {
    const startDate =
      item.embarkationStartDateTime ?? item.arrivalDateTime ?? item.departureDateTime;
    const endDate =
      item.disembarkationEndDateTime ?? item.disembarkationStartDateTime ??
      item.departureDateTime ?? item.arrivalDateTime;
    if (!startDate || !endDate) return null;
    return { start: toDate(startDate), end: toDate(endDate) };
  };

  const getDayLabel = (item: CruiseItineraryItem): string => {
    if (!cruiseDetails.departureDate || !cruiseDetails.arrivalDate) return "";
    const range = getItemDateRange(item);
    if (!range) return "";

    const startDay = getCruiseDay(range.start);
    const endDay = getCruiseDay(range.end);

    if (startDay === endDay) return `Dia ${startDay}`;
    if (endDay === startDay + 1) return `Dias ${startDay} e ${endDay}`;
    return `Dias ${startDay} a ${endDay}`;
  };

  const formatDateWithTime = (date: Date | string) => {
    const d = toDate(date);
    const dateStr = d.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
    });
    const timeStr = d.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${dateStr} às ${timeStr}`;
  };

  const getDateDisplay = (item: CruiseItineraryItem): string | null => {
    const range = getItemDateRange(item);
    if (!range) return null;

    const sameDay =
      range.start.getDate() === range.end.getDate() &&
      range.start.getMonth() === range.end.getMonth() &&
      range.start.getFullYear() === range.end.getFullYear();

    if (sameDay) return formatItineraryDate(range.start);

    const startMonth = range.start.toLocaleDateString("pt-BR", { month: "long" });
    const endMonth = range.end.toLocaleDateString("pt-BR", { month: "long" });
    const year = range.start.getFullYear();

    if (startMonth === endMonth && range.start.getFullYear() === range.end.getFullYear()) {
      return `De ${range.start.getDate()} a ${range.end.getDate()} de ${startMonth} de ${year}`;
    }
    return `De ${range.start.getDate()} de ${startMonth} a ${range.end.getDate()} de ${endMonth} de ${year}`;
  };

  const getTimeDisplay = (item: CruiseItineraryItem): string | null => {
    const hasEmbarkation = item.embarkationStartDateTime && item.embarkationEndDateTime;
    const hasDisembarkation =
      item.disembarkationStartDateTime && item.disembarkationEndDateTime;
    const range = getItemDateRange(item);
    const isMultiDay = range && getCruiseDay(range.start) !== getCruiseDay(range.end);

    if (hasEmbarkation) {
      const embarkStr = isMultiDay
        ? `${formatDateWithTime(item.embarkationStartDateTime!)} - ${formatItineraryTime(item.embarkationEndDateTime!)}`
        : `${formatItineraryTime(item.embarkationStartDateTime!)} - ${formatItineraryTime(item.embarkationEndDateTime!)}`;
      const departure = item.departureDateTime
        ? isMultiDay
          ? formatDateWithTime(item.departureDateTime)
          : formatItineraryTime(item.departureDateTime)
        : null;
      return departure ? `Embarque: ${embarkStr} • Partida: ${departure}` : `Embarque: ${embarkStr}`;
    }

    if (hasDisembarkation) {
      const arrival = item.arrivalDateTime
        ? isMultiDay
          ? formatDateWithTime(item.arrivalDateTime)
          : formatItineraryTime(item.arrivalDateTime)
        : null;
      const disembarkStart = toDate(item.disembarkationStartDateTime!);
      const disembarkEnd = toDate(item.disembarkationEndDateTime!);
      const disembarkSameDay =
        disembarkStart.getDate() === disembarkEnd.getDate() &&
        disembarkStart.getMonth() === disembarkEnd.getMonth();
      const disembarkStr = disembarkSameDay
        ? `${formatItineraryTime(item.disembarkationStartDateTime!)} - ${formatItineraryTime(item.disembarkationEndDateTime!)}`
        : `${formatDateWithTime(item.disembarkationStartDateTime!)} - ${formatDateWithTime(item.disembarkationEndDateTime!)}`;
      return arrival
        ? `Chegada: ${arrival} • Desembarque: ${disembarkStr}`
        : `Desembarque: ${disembarkStr}`;
    }

    const arrival = item.arrivalDateTime
      ? isMultiDay
        ? formatDateWithTime(item.arrivalDateTime)
        : formatItineraryTime(item.arrivalDateTime)
      : null;
    const departure = item.departureDateTime
      ? isMultiDay
        ? formatDateWithTime(item.departureDateTime)
        : formatItineraryTime(item.departureDateTime)
      : null;
    if (arrival && departure) return `${arrival} - ${departure}`;
    if (arrival) return `Chegada: ${arrival}`;
    if (departure) return `Partida: ${departure}`;
    return null;
  };

  return (
    <>
      {cruiseDetails.images && cruiseDetails.images.length > 0 && (
        <div className="w-full mt-2">
          <ImageGrid images={cruiseDetails.images} title={cruiseDetails.title} />
        </div>
      )}

      <div className="flex flex-col gap-1 px-3 md:px-4">
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
        <div className="p-3 md:px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
                const dateDisplay = getDateDisplay(item);
                const timeDisplay = getTimeDisplay(item);

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
                        <span className="font-bold text-primary-500">
                          {getDayLabel(item) || `Dia ${index + 1}`}
                        </span>
                        {dateDisplay && <span className="text-sm text-gray-500">{dateDisplay}</span>}
                      </div>

                      <h3 className="font-semibold text-gray-900">{item.title}</h3>

                      {timeDisplay && <p className="text-sm text-gray-600">{timeDisplay}</p>}

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

