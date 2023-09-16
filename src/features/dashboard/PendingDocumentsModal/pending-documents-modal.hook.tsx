import { useState } from "react";
import { TripTravelers } from "@/core/types";
import { TravelerApiService } from "@/services/api/traveler";

export const useTripPendingDocuments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataSent, setDataSent] = useState(false);
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

  return {
    isLoading,
    error,
    sendDocs,
    dataSent,
  };
};
