import { TripsApiService } from "@/services/api";
import { useIdParam } from "@/utils/hooks/param.hook";
import { useEffect, useState } from "react";
import useSWR from "swr";

const REFRESH_INTERVAL = 3000; // 3 seconds
const NOT_REFRESH = 0;
const MAX_REFRESH_COUNT = 5;

export const useTripDetails = () => {
  const [isBuilding, setIsBuilding] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  const idParam = useIdParam();

  const fetcherKey = `trip-details-hook-${idParam}`;
  const fetcher = async () => {
    setRefreshCount((state) => state + 1);
    return TripsApiService.getById(idParam);
  };
  const { isLoading, data, error } = useSWR(fetcherKey, fetcher, {
    refreshInterval:
      isBuilding && refreshCount <= MAX_REFRESH_COUNT ? REFRESH_INTERVAL : NOT_REFRESH,
  });

  useEffect(() => {
    if (isLoading) return;
    setIsBuilding(Boolean(data?.isBuilding));
  }, [data, isLoading]);

  const isEmpty = !isLoading && !isBuilding && (!data || error);

  return { isLoading, data, error, isBuilding, isEmpty, refreshCount };
};
