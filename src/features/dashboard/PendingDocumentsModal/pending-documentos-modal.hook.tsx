import { useEffect, useState } from "react";
import { TripTravelers } from "@/core/types";
import { TravelerApiService } from "@/services/api/traveler";

export const useTripPendingDocuments = (idParam: string | null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataSent, setDataSent] = useState(false);
  const [data, setData] = useState<TripTravelers>();
  const [error, setError] = useState(false);

  const sendDocs = async (data: TripTravelers) => {
    setIsLoading(true);
    setError(false);

    return TravelerApiService.setTripTravelers(data)
      .then(() => {
        setIsLoading(false);
        setDataSent(true);
      })
      .catch(() => {
        setIsLoading(false);
        setError(true);
      });
  };

  const fetchPendingDocuments = async (tripId: string | null) => {
    if (tripId === null) {
      setError(true);
      return;
    }

    setIsLoading(true);
    setError(false);
    return TravelerApiService.getTripTravelers(tripId)
      .then(setData)
      .catch(() => setError(true));
  };

  useEffect(() => {
    if (!idParam) setError(true);

    fetchPendingDocuments(idParam);
    setIsLoading(false);
  }, [idParam]);

  return {
    isLoading,
    data,
    error,
    sendDocs,
    dataSent,
  };
};
