import { useAppStore } from "@/core/store";
import { TripScriptDay } from "@/core/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const mockData: TripScriptDay = {
  id: "6a84sd68asd",
  date: "sábado, 25/08",
  details: [],
  actions: [
    {
      id: "6a4d6a8s4d68a2",
      attractionId: "68e4tw681cw8t6s",
      attractionPartnerSlug: "8684sr8ts86se9w",
      iconSlug: "restaurant",
      isEditable: true,
      isSelected: false,
      subtitle: "Rua dos Prazeres, Bairro dos Interessantes",
      title: "Restaurante das Delícias",
      tooltip: "",
      type: "RESTAURANT",
    },
    {
      id: "6fa8s4f48dge9hw84",
      attractionId: "68t4a68r6a9xa3",
      attractionPartnerSlug: "8a7fas1aa3ra2w",
      iconSlug: "attraction",
      isEditable: true,
      isSelected: false,
      subtitle: "Rua dos Coiotes, Bairro dos Looneytoones",
      title: "Mural de Flores",
      tooltip: "",
      type: "PARTY",
    },
  ],
};

export const useUpdateAttractions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TripScriptDay>({} as TripScriptDay);
  const [error, setError] = useState(false);

  const { tripScriptDay } = useAppStore();

  const router = useRouter();
  const idParam = typeof router.query.id === "string" ? router.query.id : null;

  useEffect(() => {
    if (!idParam) setError(true);

    setData(mockData);
    setIsLoading(false);
  }, [idParam]);

  return {
    isLoading,
    error,
    data,
    setData,
  };
};
