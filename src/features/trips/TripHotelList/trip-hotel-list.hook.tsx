import { StaysApiService } from "@/services/api";
import { TripHotelDTO } from "@/services/api/stays/by-trip";
import { Notification } from "mars-ds";
import { useState } from "react";
import useSwr from "swr";

export const useTripHotelEdit = (tripId: string) => {
  const [canSendTD, setCanSendTD] = useState(false);
  const [objDTO, setObjDTO] = useState<TripHotelDTO>({} as TripHotelDTO);

  const sendTransactionData = async () =>
    StaysApiService.setStay(tripId, objDTO)
      .then(() => Notification.success("Hotel e quartos selecionados com Sucesso!"))
      .catch(() =>
        Notification.error(
          "Tivemos um problema ao enviar suas informações! Aguarde e tente novamente"
        )
      );
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
