"use client";

import { useState } from "react";
import type { MutableRefObject, Dispatch, SetStateAction } from "react";
import type { TripProposal } from "@/core/types/trip";
import { ResultsDestinationCard } from "@/components/results/ResultsDestinationCard";
import CruiseDestinationDetailsModal from "@/components/cruises/CruiseDestinationDetailsModal";
import AccommodationDestinationDetailsModal from "@/components/accommodation/AccommodationDestinationDetailsModal";

export interface TripProposalContentProps {
  isLoading: boolean;
  tripProposal: TripProposal | null;
  onPlanningTripToGo: Dispatch<SetStateAction<boolean>>;
  selectedDestinationRef: MutableRefObject<string>;
}

export function TripProposalContent({
  isLoading,
  tripProposal,
  onPlanningTripToGo,
  selectedDestinationRef,
}: TripProposalContentProps) {
  const [isCruiseDestinationDetailsModalOpen, setIsCruiseDestinationDetailsModalOpen] = useState(false);
  const [cruiseDestinationUniqueName, setCruiseDestinationUniqueName] = useState<string | undefined>(undefined);

  const [isAccommodationDestinationDetailsModalOpen, setIsAccommodationDestinationDetailsModalOpen] = useState(false);
  const [accommodationDestinationUniqueName, setAccommodationDestinationUniqueName] = useState<string | undefined>(undefined);

  const openCruiseDestinationDetails = (destinationUniqueName: string) => {
    setCruiseDestinationUniqueName(destinationUniqueName);
    setIsCruiseDestinationDetailsModalOpen(true);
  };

  const openAccommodationDestinationDetails = (destinationUniqueName: string) => {
    setAccommodationDestinationUniqueName(destinationUniqueName);
    setIsAccommodationDestinationDetailsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!tripProposal) {
    return null;
  }

  return (
    <>
      <CruiseDestinationDetailsModal
        isOpen={isCruiseDestinationDetailsModalOpen}
        handleClose={() => {
          setIsCruiseDestinationDetailsModalOpen(false);
          setCruiseDestinationUniqueName(undefined);
        }}
        destinationUniqueName={cruiseDestinationUniqueName}
      />

      <AccommodationDestinationDetailsModal
        isOpen={isAccommodationDestinationDetailsModalOpen}
        handleClose={() => {
          setIsAccommodationDestinationDetailsModalOpen(false);
          setAccommodationDestinationUniqueName(undefined);
        }}
        destinationUniqueName={accommodationDestinationUniqueName}
      />

      <div className="w-full max-w-4xl mx-auto">
      {/* Main destination section */}
      {tripProposal.mainChoice && (
        <div className="mb-12 w-full">
          <ResultsDestinationCard
            destination={tripProposal.mainChoice}
            isLarge={true}
            isMainChoice={true}
            onPlanningTripToGo={onPlanningTripToGo}
            setSelectedDestination={selectedDestinationRef}
            onOpenCruiseDestinationDetails={openCruiseDestinationDetails}
            onOpenAccommodationDestinationDetails={openAccommodationDestinationDetails}
          />
        </div>
      )}
      {/* Other destinations */}
      {tripProposal.otherChoices && tripProposal.otherChoices.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-baloo font-bold text-secondary-900 mb-6 text-left">
            Outras opções que você pode gostar
          </h2>

          {/* Mobile: Horizontal scrollable container */}
          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex space-x-4 pr-4">
              {tripProposal.otherChoices.map((destination) => (
                <ResultsDestinationCard
                  key={destination.destinationId}
                  destination={destination}
                  onPlanningTripToGo={onPlanningTripToGo}
                  setSelectedDestination={selectedDestinationRef}
                  onOpenCruiseDestinationDetails={openCruiseDestinationDetails}
                  onOpenAccommodationDestinationDetails={openAccommodationDestinationDetails}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Two-column grid */}
          <div className="hidden md:block w-full">
            <div className="grid grid-cols-2 gap-8">
              {tripProposal.otherChoices.map((destination) => (
                <ResultsDestinationCard
                  key={destination.destinationId}
                  destination={destination}
                  onPlanningTripToGo={onPlanningTripToGo}
                  setSelectedDestination={selectedDestinationRef}
                  onOpenCruiseDestinationDetails={openCruiseDestinationDetails}
                  onOpenAccommodationDestinationDetails={openAccommodationDestinationDetails}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
