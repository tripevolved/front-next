'use client'

import { ResultsTrip } from "@/components/results/ResultsTrip";
import { TripProposal } from "@/core/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TripsApiService as TripApiClient } from "@/clients/trips";

export default function TripResultsPage() {
  const router = useRouter();
  const params = useParams();
  const tripId = params?.tripId as string;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tripProposal, setTripProposal] = useState<TripProposal | null>(null);

  useEffect(() => {
    const fetchTripProposal = async () => {
      if (!tripId) {
        setIsLoading(false);
        setError(true);
        return;
      }
      try {
        const proposal = await TripApiClient.getTripMatches(tripId);
        if (proposal && proposal.mainChoice) {
          setTripProposal(proposal);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Failed to fetch trip proposal:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripProposal();
  }, [tripId]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ResultsTrip
        error={error}
        isLoading={isLoading}
        tripProposal={tripProposal}
        fallback={() =>
          router.push(
            "/resultados?message=Infelizmente%2C%20n%C3%A3o%20encontramos%20sua%20viagem%2C%20mas%20voc%C3%AA%20pode%20descobrir%20seu%20destino%20ideal."
          )
        }
        setDestinationById={async (tripId) => {
          // TODO: Implement your logic to set the destination by ID
          return Promise.resolve();
        }}
      />
    </div>
  );
}