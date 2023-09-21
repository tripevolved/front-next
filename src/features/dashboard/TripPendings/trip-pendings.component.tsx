import { Box, Text, SectionBase, Picture, EmptyState, GlobalLoader } from "@/ui";
import type { TripPendingItemProps } from "./trip-pendings.types";

import { useRouter } from "next/router";
import { Button, ItemButton, ItemButtonProps, LabelThemes, LabelVariants } from "mars-ds";

import useSwr from "swr";
import { TripsApiService } from "@/services/api";

export function TripPending() {
  const router = useRouter();
  const idParam = String(router.query.id);

  const fetcher = async () => TripsApiService.getTripPending(idParam);
  const uniqueKeyName = `travel-pending-${idParam}`;
  const { isLoading, error, data } = useSwr(uniqueKeyName, fetcher);

  const text =
    "Verifique suas pendências. É importante cumprir a lista para que tudo saia como o planejado.";

  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  if (!data) return <EmptyState />;

  return (
    <SectionBase className="trip-pendings__section py-md">
      <Box className="trip-pendings__section__body">
        <Text size="lg" className="trip-pendings__section__body__sub-title">
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
  slug,
  title,
  tripid,
  description,
  isMandatory,
}: TripPendingItemProps) => {
  const getIconAndName = (slug: TripPendingItemProps["slug"]): ItemButtonProps => {
    const href = `/app/viagens/${tripid}/pendencias/${slug}`;

    if (slug === "viajantes")
      return {
        iconName: "users",
        title: title || "Viajantes",
        subtitle: description || "Informe os dados dos viajantes",
        href,
        label: isMandatory ? "Importante" : undefined,
        labelVariant: isMandatory ? LabelVariants.Warning : undefined,
        labelTheme: LabelThemes.Ghost,
      };

    return {
      iconName: "alert-circle",
      title,
      subtitle: description,
      href,
      label: isMandatory ? "Importante" : undefined,
      labelVariant: isMandatory ? LabelVariants.Warning : undefined,
      labelTheme: LabelThemes.Ghost,
    };
  };

  return <ItemButton {...getIconAndName(slug)} />;
};
