import { Box, Text, SectionBase, Picture, EmptyState, GlobalLoader } from "@/ui";
import type { TripPendingItemProps } from "./trip-pendings.types";

import { useRouter } from "next/router";
import { Button } from "mars-ds";

import useSwr from "swr";
import { TripsApiService } from "@/services/api";

export function TripPending() {
  const router = useRouter();
  const idParam = String(router.query.id);

  const fetcher = async () => TripsApiService.getTripPending(idParam);
  const uniqueKeyName = `travel-pending-${idParam}`;
  const { isLoading, error, data } = useSwr(uniqueKeyName, fetcher);

  const text =
    "Confira suas pendências. É importante cumprir a lista para que tudo saia como o planejado.";

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (!data) return <EmptyState />;

  return (
    <SectionBase className="trip-pendings__section">
      <Box className="trip-pendings__section__body">
        <Text size="md" className="trip-pendings__section__body__sub-title">
          {text}
        </Text>

        <Box className="trip-pendings__section__body__pending-list">
          {data.length ? (
            data.map((pending, i) => <TripPendingItem {...pending} tripid={idParam} key={i} />)
          ) : (
            <Text style={{ color: "#D84848" }}>Erro ao verificar as pendências da Trip...</Text>
          )}
        </Box>
      </Box>
    </SectionBase>
  );
}

const TripPendingItem = ({
  id,
  isMandatory,
  slug,
  title,
  description,
  deadline,
  tripid,
}: TripPendingItemProps) => {
  return (
    <>
      <Box className="trip-pending-item">
        <div>
          <Picture src={`/assets/trip-dashboard/pendings/${slug}.svg`} />
          <Text>{title}</Text>
        </div>
        <Button
          iconName="chevron-right"
          variant="naked"
          size="sm"
          href={`/app/viagens/${tripid}/pendencias/${slug}`}
        />
      </Box>
    </>
  );
};
