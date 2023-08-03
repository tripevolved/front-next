import { useAppStore } from "@/core/store";
import { TripScriptDay } from "@/core/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useUpdateAttractions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<TripScriptDay>({} as TripScriptDay);
  const [error, setError] = useState(false);

  const { tripScriptDay } = useAppStore();

  const router = useRouter();
  const idParam = typeof router.query.id === "string" ? router.query.id : null;

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
  };
};
