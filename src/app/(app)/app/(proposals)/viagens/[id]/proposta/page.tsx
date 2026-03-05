import React from "react";
import Link from "next/link";
import { UniqueMomentsCarousel } from "@/components/uniqueMoments";
import { ItineraryContent } from "@/components/itineraries";
import { ProposalDetails } from "@/components/proposals";
import { mockPropostaData2 } from "@/core/types/uniqueMoments";

interface PropostaPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropostaPage({ params }: PropostaPageProps) {
  const { id } = await params;
  
  // Mock data - in a real app, this would come from an API
  const propostaData = mockPropostaData2.id === id ? mockPropostaData2 : null;

  if (!propostaData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Proposta não encontrada</h1>
          <p className="text-gray-600">A proposta solicitada não foi encontrada.</p>
        </div>
      </div>
    );
  }

  const heroImage =
    propostaData.uniqueMoments?.[0]?.images?.[0] ?? undefined;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative text-white py-16 min-h-[320px] flex flex-col"
        style={
          heroImage
            ? {
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%), url(${heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : undefined
        }
      >
        {!heroImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 -z-10" />
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
            {propostaData.title}
          </h1>
          <p className="text-lg md:text-xl font-comfortaa mb-2">
            {propostaData.dates}
          </p>
          <p className="text-lg md:text-xl font-comfortaa mb-8">
            {propostaData.travelers}
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
    </div>
  );
} 