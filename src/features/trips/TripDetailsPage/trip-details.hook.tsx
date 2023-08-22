import { TripsApiService } from "@/services/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

const REFRESH_INTERVAL = 3000; // 3 seconds
const NOT_REFRESH = 0;

export const useTripDetails = () => {
  const [isBuilding, setIsBuilding] = useState(false);
  const router = useRouter();
  const tripId = typeof router.query.id === "string" ? router.query.id : "";

  const { isLoading, data, error } = useSWR(
    `trip/${tripId}`,
    () => TripsApiService.getById(tripId),
    { refreshInterval: isBuilding ? REFRESH_INTERVAL : NOT_REFRESH }
  );

  useEffect(() => {
    if (!isLoading) setIsBuilding(!!data?.isBuilding);
  }, [data, isLoading]);

  const isEmpty = !isLoading && !isBuilding && (!data || error);

  return { isLoading, data, error, isBuilding, isEmpty };
};
