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
  const { isLoading, data, error } = useSWR(fetcherKey, fetcher, {revalidateOnFocus: false});

  return { isLoading, data, error };
};

const fetchTripById = async (id: string, retry = MAX_REFRESH_COUNT): Promise<TripDetails> => {
  const {ready} = await TripsApiService.getStatusById(id);
  if(ready) {
    const data = await TripsApiService.getById(id);
    return data;
  }
  if (retry === 0) {
    throw new Error("Timeout");
  }
  await delay(REFRESH_INTERVAL);
  return fetchTripById(id, retry - 1);
};
