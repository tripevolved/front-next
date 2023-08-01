import { useRouter } from "next/router";
import { TripFlightReservation } from "@/core/types";
import { TransportationApiService } from "@/services/api";
import { useState, useEffect } from "react";

export const useTripFlights = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TripFlightReservation[]>();
  const [error, setError] = useState(false);

  const router = useRouter();
  const idParam = typeof router.query.id === "string" ? router.query.id : null;

  const fetchFlightReservations = async (tripId: string | null) => {
    if (tripId === null){
      setError(true);
      return;
    }

    setIsLoading(true);
    setError(false);
    return TransportationApiService.getFlightReservationsById(tripId)
      .then(setData)
      .catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    fetchFlightReservations(idParam);
    setIsLoading(false);
  }, [idParam]);

  return { isLoading, data, error, tripId: idParam };
};
