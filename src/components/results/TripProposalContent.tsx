import type { MutableRefObject, Dispatch, SetStateAction } from "react";
import type { TripProposal } from "@/core/types/trip";
import { ResultsDestinationCard } from "@/components/results/ResultsDestinationCard";

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
      {/* Main destination section */}
      {tripProposal.mainChoice && (
        <div className="mb-12">
          <ResultsDestinationCard
            destination={tripProposal.mainChoice}
            isLarge={true}
            isMainChoice={true}
            onPlanningTripToGo={onPlanningTripToGo}
            setSelectedDestination={selectedDestinationRef}
          />
        </div>
      )}
      {/* Other destinations */}
      {tripProposal.otherChoices && tripProposal.otherChoices.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-baloo font-bold text-secondary-900 mb-6 text-center">
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
                />
              ))}
            </div>
          </div>

          {/* Desktop: Two-column grid with 80% width container */}
          <div className="hidden md:block w-4/5 mx-auto">
            <div className="grid grid-cols-2 gap-8">
              {tripProposal.otherChoices.map((destination) => (
                <ResultsDestinationCard
                  key={destination.destinationId}
                  destination={destination}
                  onPlanningTripToGo={onPlanningTripToGo}
                  setSelectedDestination={selectedDestinationRef}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
