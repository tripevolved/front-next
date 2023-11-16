import { PhotoSource, TravelerProfileType } from "@/core/types";
import { LoadingSkeleton as LoadingSkeletonDestinations } from "@/features/dashboard/HasCurrentTrip";
import { ProfileApiService } from "@/services/api";
import {
  DestinationItem,
  PublicDestinationsRequestParams,
} from "@/services/api/profile/destinations";
import { Box, CardTrip, ErrorState } from "@/ui";
import { Button, Grid, Tabs, TabsProps, TextField } from "mars-ds";
import { useState } from "react";
import useSWR from "swr";

interface DestinationTabProps {
  destinations: Omit<DestinationItem, "title">[];
  isLoading: boolean;
  error: boolean;
}

export const DestinationTab = ({ isLoading, error, destinations }: DestinationTabProps) => {
  const parseImage = (sources: PhotoSource[]) =>
    sources.find(({ type }) => type === "md")?.url || null;

  if (error) return <ErrorState />;

  if (isLoading) return <LoadingSkeletonDestinations />;

  return (
    <Grid columns={{ sm: 1, md: 2, lg: 3 }}>
      {destinations.map((destination, i) => (
        <CardTrip
          key={`${i}-${destination.destinationId}`}
          title={destination.name}
          image={parseImage(destination.coverImage.sources)}
        >
          <Box className="theme-dark" sx={{ minWidth: 200 }}>
            <Button size="sm" variant="neutral" iconName="arrow-right" isRtl>
              Quero ir
            </Button>
          </Box>
        </CardTrip>
      ))}
    </Grid>
  );
};

export function PublicDestinations() {
  const [serachName, setSearchName] = useState("");
  const [] = useState<DestinationItem>();

  const fetcher = () =>
    ProfileApiService.getPublicDestinations({ uniqueName: "", search: serachName, page: 1 });

  const { isLoading, data, error } = useSWR(`get-public-destinations`, fetcher);

  const TABS = [
    {
      label: "Todos",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
    {
      label: "Relax",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
    {
      label: "Aventureiro",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
    {
      label: "Agitador",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
    {
      label: "Automático",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
    {
      label: "Gastronômico",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
    {
      label: "Colecionador de Pulseirinha",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
    {
      label: "Alternativo",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
    {
      label: "Intelectual",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
    {
      label: "Só se vive uma vez",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
    {
      label: "Negócios",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
    {
      label: "Espiritual",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
    {
      label: "Dinâmico",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
    {
      label: "Fã da rotina",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
    {
      label: "Garantido",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
    {
      label: "Insaciável",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
    {
      label: "Automático",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
    {
      label: "Musicalidade",
      children: (
        <DestinationTab isLoading={isLoading} error={error} destinations={data?.destinations!} />
      ),
    },
  ] satisfies TabsProps["tabs"];

  return (
    <div className="public-destinations p-md">
      <TextField
        label="Nossos destinos"
        rightIconButton={{ name: "search" }}
        onChange={(e: any) => setSearchName(e.target.value)}
      />
      <Tabs
        align="left"
        defaultTabIndex={0}
        tabs={TABS}
        onClick={(b) => console.log("isso aquio", b)}
      />
    </div>
  );
}
