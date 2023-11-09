import useSWR from "swr";
import { TripsApiService } from "@/services/api";
import { useIdParam } from "@/utils/hooks/param.hook";
import { delay } from "@/utils/helpers/async.helpers";
import { MAX_REFRESH_COUNT, REFRESH_INTERVAL } from "./trip-details-page.constants";
import type { TripDetails } from "@/core/types";

export const useTripDetails = () => {
  const idParam = useIdParam();

  const fetcherKey = idParam ? `trip-details-hook-${idParam}` : null;
  const fetcher = async () => fetchTripById(idParam);
  const { isLoading, data, error } = useSWR(fetcherKey, fetcher);

  return { isLoading, data, error };
};

const fetchTripById = async (id: string, retry = MAX_REFRESH_COUNT): Promise<TripDetails> => {
  const data = await TripsApiService.getById(id);
  if (!data.isBuilding) return data;
  if (retry === 0) {
    throw new Error("Timeout");
  }
  await delay(REFRESH_INTERVAL);
  return fetchTripById(id, retry - 1);
};
