import { TripDetails } from "@/core/types";
import { TripsApiService } from "@/services/api/trip";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const useTripDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TripDetails>();
  const [error, setError] = useState(false);

  const router = useRouter();
  const idParam = typeof router.query.id === "string" ? router.query.id : null;

  const fetchTripInformation = async (tripId: string | null) => {
    if (tripId === null){
      setError(true);
      return;
    }      

    setIsLoading(true);
    setError(false);
    return TripsApiService.getById(tripId)
      .then(setData)
      .catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    if (!idParam) setError(true);
    
    fetchTripInformation(idParam);
    setIsLoading(false);
  }, [idParam]);

  return { isLoading, data, error };
};
