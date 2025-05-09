'use client'

import { ResultsTrip } from "@/components/results/ResultsTrip";
import { useParams, useRouter } from "next/navigation";

export default function TripResultsPage() {
  const router = useRouter();
  const params = useParams();
  const tripId = params?.tripId as string;

  return (
    <ResultsTrip
      tripId={tripId}
      isPublic
      fallback={() =>
        router.push(
          "/resultados?message=Infelizmente%2C%20n%C3%A3o%20encontramos%20sua%20viagem%2C%20mas%20voc%C3%AA%20pode%20descobrir%20seu%20destino%20ideal."
        )
      }
    />
  );
}