import { useAppStore } from "@/core/store";
import { TripsApiService } from "@/services/api";
import { useRouter } from "next/router";
import useSWR from "swr";

export const useAllTrips = (pastTrips: boolean) => {
  const router = useRouter();
  const travelerId = useAppStore((state) => state.travelerState.id);

  const fetcherKey = `trips/${travelerId}/all?pastTrips=${pastTrips}`;
  const fetcher = async () =>
    TripsApiService.getAll(travelerId, pastTrips).then((data) => {
      if (data.currentTrip) {
        const newURLState = { hasCurrentTrip: true };
        router.replace({ pathname: router.pathname, query: newURLState });
      }
      return data;
    });
  const { isLoading, error, data, mutate } = useSWR(fetcherKey, fetcher);

  return { isLoading, error, data, mutate };
};
