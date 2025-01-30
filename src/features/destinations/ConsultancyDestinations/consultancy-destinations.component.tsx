import type { ConsultancyDestinationProps } from "./consultancy-destinations.types";
import type { PhotoSource } from "@/core/types";

import useSWR from "swr";
import { ProfileApiService } from "@/services/api";

import { LoadingSkeleton as LoadingSkeletonDestinations } from "@/features/dashboard/HasCurrentTrip";
import { Box, CardTrip, EmptyState, ErrorState } from "@/ui";
import { Button, Grid } from "mars-ds";
import { UserService } from "@/services/user";
import { getWhatsappLink } from "@/utils/helpers/whatsapp.helpers";
import { DestinationSuggestion } from "../PublicDestinations/destination-suggestion";
import { canSignUp } from "@/utils/helpers/environment.helpers";

export const ConsultancyDestinations = ({
  searchName,
  uniqueName = "all",
  currentPage,
}: ConsultancyDestinationProps) => {
  const fetcher = () =>
    ProfileApiService.getPublicDestinations({ search: searchName, uniqueName, context: "CONSULTANCY", page: currentPage });

  const keyName = ["get-public-destinations", uniqueName, currentPage, searchName].join("-");
  const { isLoading, isValidating, data, error } = useSWR(uniqueName ? keyName : null, fetcher, {
    revalidateOnFocus: false,
  });

  if (error) return <ErrorState />;

  if (isLoading || isValidating) return <LoadingSkeletonDestinations />;

  if (!data) return <EmptyState />;

  if (!data.destinations.length && searchName)
    return <DestinationSuggestion destination={searchName} />;

  if (!data.destinations.length) return <EmptyState />;

  const parseImage = (sources: PhotoSource[]) =>
    sources.find(({ type }) => type === "md")?.url || null;

  return (
    <>
      <Grid columns={{ sm: 1, md: 2, lg: 3 }} className="p-md">
        {data?.destinations.map((destination, i) => (
          <CardTrip
            key={`${i}-${destination.destinationId}`}
            title={destination.name}
            // @ts-ignore
            image={
              destination.coverImage ? parseImage(destination?.coverImage?.sources) : undefined
            }
            href={`/destinos/${destination.uniqueName}?source=consultoria`}
          />
        ))}
      </Grid>
    </>
  );
};
