import { useAppStore } from "@/core/store";
import {
  TripScriptAttraction,
  TripScriptDay,
  UpdateScriptAction,
  UpdateTripScriptPayload,
} from "@/core/types";
import { TripScriptsApiService } from "@/services/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useUpdateAttractions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TripScriptDay>({} as TripScriptDay);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(false);

  const { tripScriptDay } = useAppStore();

  const router = useRouter();
  const idParam = typeof router.query.id === "string" ? router.query.id : null;

  const updateTripScript = (actions: UpdateScriptAction[]) => {
    const updatedList: UpdateTripScriptPayload = {
      id: data.id,
      actions,
    };

    setIsLoading(true);
    TripScriptsApiService.updateScript(idParam!, updatedList)
      .then(() => {
        setIsLoading(false);
        setIsSent(true);
      })
      .catch(() => setError(true));
  };

  useEffect(() => {
    if (!idParam) setError(true);

    setData(tripScriptDay);
    setIsLoading(false);
  }, [idParam]);

  return {
    isLoading,
    error,
    data,
    setData,
    updateTripScript,
    isSent,
  };
};
