"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { TripConfigurationSet } from "@/components/trips/TripConfigurationSet";
import { UniqueMomentsCarousel } from "@/components/uniqueMoments";
import { ItineraryContent } from "@/components/itineraries";
import { ProposalDetails } from "@/components/proposals";
import { TripsApiService } from "@/clients/trips";
import { mockPropostaData2 } from "@/core/types/uniqueMoments";
import type { TripDetails } from "@/core/types";

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function formatHeroDates(tripDetails: TripDetails): string {
  const config = tripDetails.configuration;
  if (config?.startDate && config?.endDate) {
    const start = new Date(config.startDate);
    const end = new Date(config.endDate);
    const opts: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return `${start.toLocaleDateString("pt-BR", opts)} a ${end.toLocaleDateString("pt-BR", opts)}`;
  }
  if (config?.month != null && config.month >= 1 && config.month <= 12) {
    return `Em ${MONTH_NAMES[config.month - 1]}`;
  }
  return "Datas a definir";
}

export default function PropostaPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data: tripDetails, error, isLoading } = useSWR(
    id ? `trip-details-${id}` : null,
    () => TripsApiService.getTripDetailsById(id)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (error || !tripDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-6 text-center max-w-md">
          <Image
            src="/assets/states/empty-state.svg"
            alt=""
            width={240}
            height={240}
            className="object-contain"
          />
          <h1 className="text-xl font-bold text-gray-900">Proposta não encontrada</h1>
          <p className="text-gray-600">A proposta de viagem não foi encontrada.</p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 mt-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar para o painel
          </Link>
        </div>
      </div>
    );
  }

  // Mock data for sections below hero (to be replaced in later steps)
  const propostaData = mockPropostaData2;
  const coverImageUrl = tripDetails.coverImage?.url;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative text-white py-16 min-h-[320px] flex flex-col"
        style={
          coverImageUrl
            ? {
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%), url(${coverImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : undefined
        }
      >
        {!coverImageUrl && (
          <div className="absolute inset-0 bg-secondary-500 -z-10" />
        )}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href={`/app`}
            className="inline-flex items-center gap-1.5 bg-transparent border border-white text-white hover:bg-white/20 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            aria-label="Voltar"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Voltar ao painel
          </Link>
        </div>
        <div className="max-w-[80%] mx-auto text-center flex-1 flex flex-col items-center justify-center mt-10">
          <h1 className="text-4xl md:text-5xl font-baloo font-bold mb-4">
            {tripDetails.title}
          </h1>
          <p className="text-lg md:text-xl font-comfortaa mb-8">
            {formatHeroDates(tripDetails)}
          </p>

          <a
            href="#itinerary"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-full font-baloo font-semibold hover:bg-primary-50 transition-colors w-fit"
          >
            Ver itinerário
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* Trip Configuration */}
      <section className="max-w-[80%] mx-auto -mt-6 relative z-10 px-4">
        <TripConfigurationSet configuration={tripDetails.configuration} />
      </section>

      {/* Sections below hero still use mock data until later integration steps */}
      {propostaData ? (
        <>
          {/* Unique Moments Carousel Section */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-[80%] mx-auto">
              <h2 className="text-3xl font-baloo font-bold text-secondary-900 mb-8 text-center">
                Momentos Únicos
              </h2>
              <UniqueMomentsCarousel uniqueMoments={propostaData.uniqueMoments} />
            </div>
          </section>

          {/* Itinerary Content */}
          <ItineraryContent
            itinerary={propostaData.itinerary}
            mapImage={propostaData.mapImage}
            type="period"
          />

          {/* Proposal Details */}
          <ProposalDetails
            accommodations={propostaData.accommodations}
            flights={propostaData.flights}
            otherInclusions={propostaData.otherInclusions}
            potentialInclusions={propostaData.potentialInclusions}
            pricing={propostaData.pricing}
            description={propostaData.description}
            cta={propostaData.cta}
          />
        </>
      ) : (
        <section className="py-16 bg-gray-50">
          <div className="max-w-[80%] mx-auto text-center text-secondary-600">
            Conteúdo da proposta em breve.
          </div>
        </section>
      )}
    </div>
  );
}
