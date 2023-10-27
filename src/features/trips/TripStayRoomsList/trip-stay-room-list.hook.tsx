import { StaysApiService } from "@/services/api";
import { TripHotelDTO } from "@/services/api/stays/by-trip";
import { useState } from "react";
import useSwr from "swr";

const useTripStayRoomEdit = (tripId: string) => {
  const [canSendPayload, setCanSendPayload] = useState(false);
  const [objDTO, setObjDTO] = useState<TripHotelDTO>({} as TripHotelDTO);

  const sendTransactionData = async () => StaysApiService.setStay(tripId, objDTO);
  const { error: errorSentData, isLoading: isLoadingSentData } = useSwr(
    canSendPayload ? `accommodation-set-${tripId}` : null,
    sendTransactionData
  );

  return {
    setObjDTO,
    setCanSendPayload,
    canSendPayload,

    isLoadingSentData,
    errorSentData,
  };
};

export default useTripStayRoomEdit;
