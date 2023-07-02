import { TripAbstract } from "@/core/types";
import { TripsApiService } from "@/services/api/trip";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const useTripDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TripAbstract>();
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
    return TripsApiService.getByIdForDashboard(tripId)
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
