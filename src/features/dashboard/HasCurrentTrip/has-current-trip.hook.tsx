import { useAppStore } from "@/core/store";
import { TripsApiService } from "@/services/api";
import useSWR from "swr";

export const useAllTrips = () => {
  const travelerId = useAppStore((state) => state.travelerState.id);

  const fetcherKey = `trips/${travelerId}/all`;
  const fetcher = async () => TripsApiService.getAll(travelerId);
  const { isLoading, error, data, mutate } = useSWR(fetcherKey, fetcher);

  return { isLoading, error, data, mutate };
};
