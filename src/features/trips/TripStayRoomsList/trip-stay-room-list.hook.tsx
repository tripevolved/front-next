import { StaysApiService } from "@/services/api";
import { TripHotelDTO } from "@/services/api/stays/by-trip";
import { useState } from "react";
import useSwr from "swr";

const useTripStayRoomEdit = (tripId: string) => {
  const [canGetTD, setCanGetTD] = useState(false);
  const [canSendTD, setCanSendTD] = useState(false);
  const [objDTO, setObjDTO] = useState<TripHotelDTO>({} as TripHotelDTO);

  const getTransactionData = async () => await StaysApiService.getHotels(tripId);
  const {
    data: transactionData,
    isLoading: isLoadingTD,
    error: errorTD,
  } = useSwr(canGetTD ? `accommodation-get-${tripId}` : null, getTransactionData);

  const sendTransactionData = async () => StaysApiService.setStay(tripId, objDTO);
  const { error: errorSentData, isLoading: isLoadingSentData } = useSwr(
    canSendTD ? `accommodation-set-${tripId}` : null,
    sendTransactionData
  );

  return {
    setCanGetTD,
    isLoadingTD,
    transactionData,
    errorTD,

    setObjDTO,
    setCanSendTD,

    isLoadingSentData,
    errorSentData,
  };
};

export default useTripStayRoomEdit;
