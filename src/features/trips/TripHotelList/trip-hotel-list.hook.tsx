import { StaysApiService } from "@/services/api";
import { TripHotelDTO } from "@/services/api/stays/by-trip";
import { useState } from "react";
import useSwr from "swr";

export const useTripHotelEdit = (tripId: string) => {
  const [canSendTD, setCanSendTD] = useState(false);
  const [objDTO, setObjDTO] = useState<TripHotelDTO>({} as TripHotelDTO);

  const sendTransactionData = async () => StaysApiService.setStay(tripId, objDTO);
  const { error: errorSentData, isLoading: isLoadingSentData } = useSwr(
    canSendTD ? `accommodation-set-${tripId}` : null,
    sendTransactionData
  );

  return {
    canSendTD,
    setCanSendTD,
    setObjDTO,

    isLoadingSentData,
    errorSentData,
  };
};
