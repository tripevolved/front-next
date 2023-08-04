import { TripScriptAttraction } from "@/core/types";
import { TripScriptsApiService } from "@/services/api";
import { useState, useEffect } from "react";

const mockData: TripScriptAttraction[] = [
  {
    id: "a68we4s8f88e",
    address: "Rua do Jaguariuna, 45 - Jardim Verde",
    availabilityInfo: "Disponível o tempo todo",
    isAlreadySelected: false,
    isHighlyRecommended: true,
    name: "Façal da Esperança",
    purchasePrice: 84.56,
  },
  {
    id: "8f35a1da8a4e6",
    address: "Rua Verde, 405 - Jardim da Paz",
    availabilityInfo: "Disponível somente a noite",
    isAlreadySelected: false,
    isHighlyRecommended: true,
    name: "Bar dos Integrantes",
    purchasePrice: 24.87,
  },
];

export const useAddAttractions = (tripId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TripScriptAttraction[]>(mockData);
  const [error, setError] = useState(false);

  const fetchAttractionsData = () => {
    TripScriptsApiService.getAttractions(tripId)
      .then(setData)
      .catch(() => setError(true));
  };

  useEffect(() => {
    if (!tripId) setError(true);

    fetchAttractionsData();
    setIsLoading(false);
  }, [tripId]);

  return {
    isLoading,
    error,
    data,
  };
};
