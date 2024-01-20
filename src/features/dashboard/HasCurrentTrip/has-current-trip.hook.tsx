import { useAppStore } from "@/core/store";
import { TripsApiService } from "@/services/api";
import useSWR from "swr";

export const useAllTrips = (pastTrips: boolean) => {
  const travelerId = useAppStore((state) => state.travelerState.id);

  const fetcherKey = `trips/${travelerId}/all?pastTrips=${pastTrips}`;
  const fetcher = async () => TripsApiService.getAll(travelerId, pastTrips);
  const { isLoading, error, data, mutate } = useSWR(fetcherKey, fetcher);

  return { isLoading, error, data, mutate };
};
