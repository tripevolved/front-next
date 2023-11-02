import { useAppStore } from "@/core/store";
import { TripScriptDay, UpdateScriptAction, UpdateTripScriptPayload } from "@/core/types";
import { TripScriptsApiService } from "@/services/api";
import { useIdParam } from "@/utils/hooks/param.hook";
import { useEffect, useState } from "react";

export const useUpdateAttractions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TripScriptDay>({} as TripScriptDay);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(false);

  const { tripScriptDay } = useAppStore();

  const idParam = useIdParam();

  const updateTripScript = () => {
    const actions = data.actions.map(
      (action) => ({ id: action.id, attractionId: action.attractionId } as UpdateScriptAction)
    );

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
