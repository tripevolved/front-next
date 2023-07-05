import { TripScript } from "@/core/types";
import { TripScriptsApiService } from "@/services/api/tripScripts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export const useTripScriptPreview = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TripScript>();
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
    return TripScriptsApiService.getPreview(tripId)
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
