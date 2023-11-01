import { TripFlightReservation } from "@/core/types";
import { TransportationApiService } from "@/services/api";
import { useState, useEffect } from "react";
import { useIdParam } from "@/utils/hooks/param.hook";

export const useTripFlights = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TripFlightReservation[]>();
  const [error, setError] = useState(false);

  const idParam = useIdParam();

  const fetchFlightReservations = async (tripId: string | null) => {
    if (!tripId) return setError(true);

    setIsLoading(true);
    setError(false);
    return TransportationApiService.getFlightReservationsById(tripId)
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchFlightReservations(idParam);
    setIsLoading(false);
  }, [idParam]);

  return { isLoading, data, error, tripId: idParam };
};
