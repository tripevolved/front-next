import React from "react";
import { UniqueMomentsCarousel } from "@/components/uniqueMoments";
import { ItineraryContent } from "@/components/itineraries";
import { ProposalDetails } from "@/components/proposals";
import { mockPropostaData } from "@/core/types/uniqueMoments";

interface PropostaPageProps {
  params: Promise<{ id: string }>;
}

export default function PropostaPage({ params }: PropostaPageProps) {
  // For now, use the mock proposta data
  // In the future, this could fetch the proposta by ID from an API
  const propostaData = mockPropostaData;

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-[80%] mx-auto text-center">
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
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-full font-baloo font-semibold hover:bg-primary-50 transition-colors"
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
        type="day"
      />

      {/* Proposal Details */}
      <ProposalDetails
        accommodations={propostaData.accommodations}
        flights={propostaData.flights}
        otherInclusions={propostaData.otherInclusions}
        pricing={propostaData.pricing}
        description={propostaData.description}
        cta={propostaData.cta}
      />
    </div>
  );
} 