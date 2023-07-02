import { useAppStore } from "@/core/store";
import { AllTrips } from "@/core/types";
import { TripsApiService } from "@/services/api/trip";
import { useState, useEffect } from "react";

export const useAllTrips = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<AllTrips>();
  const [error, setError] = useState(false);

  const { travelerState } = useAppStore();

  const fetchAllTripsInformation = async (travelerId: string) => {
    if (travelerId === null){
      setError(true);
      return;
    }

    setIsLoading(true);
    setError(false);
    return TripsApiService.getAll(travelerId)
      .then(setData)
      .catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    if (!travelerState) setError(true);
    
    fetchAllTripsInformation(travelerState.id);
    setIsLoading(false);
  }, [travelerState]);

  return { isLoading, data, error };
};
