import { TripsApiService } from "@/services/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const REFRESH_INTERVAL = 3000; // 3 seconds
const NOT_REFRESH = 0;
const MAX_REFRESH_COUNT = 5;

export const useTripDetails = () => {
  const [isBuilding, setIsBuilding] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const router = useRouter();
  const tripId = typeof router.query.id === "string" ? router.query.id : "";

  const { isLoading, data, error } = useSWR(
    `trip/${tripId}`,
    () => { setRefreshCount(refreshCount + 1); return TripsApiService.getById(tripId); },
    { refreshInterval: isBuilding && refreshCount <= MAX_REFRESH_COUNT ? REFRESH_INTERVAL : NOT_REFRESH }
  );

  useEffect(() => {
    if (!isLoading) { 
      setIsBuilding(!!data?.isBuilding);
    }
  }, [data, isLoading]);

  const isEmpty = !isLoading && !isBuilding && (!data || error);

  return { isLoading, data, error, isBuilding, isEmpty, refreshCount };
};
