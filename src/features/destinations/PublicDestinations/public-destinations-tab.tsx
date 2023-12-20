import type { PublicDestinationsTabProps } from "./public-destinations.types";
import type { PhotoSource } from "@/core/types";

import useSWR from "swr";
import { ProfileApiService } from "@/services/api";

import { LoadingSkeleton as LoadingSkeletonDestinations } from "@/features/dashboard/HasCurrentTrip";
import { Box, CardTrip, EmptyState, ErrorState, Text } from "@/ui";
import { Button, Grid, Pagination } from "mars-ds";
import { KEY_NAME } from "./public-destinations.constants";
import { UserService } from "@/services/user";
import { getWhatsappLink } from "@/utils/helpers/whatsapp.helpers";
import { DestinationSuggestion } from "./destination-suggestion";

export const PublicDestinationsTab = ({
  searchName,
  uniqueName,
  currentPage,
  setPage,
}: PublicDestinationsTabProps) => {
  const fetcher = () =>
    ProfileApiService.getPublicDestinations({ search: searchName, uniqueName, page: currentPage });

  const keyName = [KEY_NAME, uniqueName, currentPage, searchName].join("-");
  const { isLoading, isValidating, data, error } = useSWR(uniqueName ? keyName : null, fetcher);

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
            href={`/destinos/${destination.uniqueName}`}
          >
            <Box className="theme-dark" sx={{ minWidth: 200 }}>
              <Button
                size="sm"
                variant="neutral"
                iconName="arrow-right"
                isRtl
                href={
                  UserService.isAuth()
                    ? `/destinos/${destination.uniqueName}`
                    : getWhatsappLink(`Quero ir para ${destination.name}`)
                }
              >
                Quero ir
              </Button>
            </Box>
          </CardTrip>
        ))}
      </Grid>
      {data.totalPages > 1 ? (
        <Pagination
          current={currentPage}
          onSelectPage={setPage}
          total={data.totalPages}
          siblingCount={1}
        />
      ) : null}
    </>
  );
};
