import { TripHotelList } from "@/core/types";
import { StaysApiService } from "@/services/api";
import { TripHotelDTO } from "@/services/api/stays/by-trip";
import { useState } from "react";

const useTripStayRoomEdit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactionData, setTransactionData] = useState<TripHotelList>({} as TripHotelList);
  const [error, setError] = useState(false);
  const [errorSentData, setErrorSentData] = useState(false);
  const [successSendData, setSuccessSendData] = useState(false);

  const getTransactionData = async (tripId: string) => {
    setIsLoading(true);
    return await StaysApiService.getHotels(tripId)
      .then(setTransactionData)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  };

  const sendData = async (tripId: string, data: TripHotelDTO) => {
    setIsLoading(true);
    return await StaysApiService.setStay(tripId, data)
      .then(() => setSuccessSendData(true))
      .catch(() => setErrorSentData(true));
  };

  return {
    isLoading,
    transactionData,
    error,
    getTransactionData,
    sendData,
    successSendData,
    errorSentData,
  };
};

export default useTripStayRoomEdit;
