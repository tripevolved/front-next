import { PhotoSource, TravelerProfileType } from "@/core/types";
import { LoadingSkeleton as LoadingSkeletonDestinations } from "@/features/dashboard/HasCurrentTrip";
import { ProfileApiService } from "@/services/api";
import {
  DestinationItem,
  PublicDestinationsRequestParams,
} from "@/services/api/profile/destinations";
import { Box, CardTrip, ErrorState } from "@/ui";
import { Button, Grid, Tabs, TabsProps, TextField } from "mars-ds";
import { useState, useRef, useEffect, cloneElement } from "react";
import useSWR from "swr";

interface DestinationTabProps {
  uniqueName?: TravelerProfileType;
  search: string;
}

export const DestinationTab = ({ uniqueName, search }: DestinationTabProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const destinationsComponent = useRef<HTMLDivElement>(null);

  const fetcher = () => ProfileApiService.getPublicDestinations({ uniqueName, search, page: 1 });

  const { isLoading, data, error } = useSWR(
    isVisible ? `get-public-destinations-${uniqueName}` : null,
    fetcher
  );

  const parseImage = (sources: PhotoSource[]) =>
    sources.find(({ type }) => type === "md")?.url || null;

  if (error) return <ErrorState />;

  if (isLoading) return <LoadingSkeletonDestinations />;

  if (destinationsComponent.current) {
    setIsVisible(true);
  }

  return (
    <Grid columns={{ sm: 1, md: 2, lg: 3 }} ref={destinationsComponent}>
      {data?.destinations.map((destination, i) => (
        <CardTrip
          key={`${i}-${destination.destinationId}`}
          title={destination.name}
          // @ts-ignore
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
  const [searchName, setSearchName] = useState("");

  const TABS = [
    {
      label: "Todos",
      children: <DestinationTab search={searchName} />,
      className: "all",
    },
    {
      label: "Relax",
      children: <DestinationTab uniqueName="relax" search={searchName} />,
    },
    {
      label: "Aventureiro",
      children: <DestinationTab uniqueName="aventureiro" search={searchName} />,
    },
    {
      label: "Agitador",
      children: <DestinationTab uniqueName="agitador" search={searchName} />,
    },
    {
      label: "Automático",
      children: <DestinationTab uniqueName="automatico" search={searchName} />,
    },
    {
      label: "Gastronômico",
      children: <DestinationTab uniqueName="gastronomico" search={searchName} />,
    },
    {
      label: "Colecionador de Pulseirinha",
      children: <DestinationTab uniqueName="colecionador-de-pulseirinha" search={searchName} />,
    },
    {
      label: "Alternativo",
      children: <DestinationTab uniqueName="alternativo" search={searchName} />,
    },
    {
      label: "Intelectual",
      children: <DestinationTab uniqueName="intelectual" search={searchName} />,
    },
    {
      label: "Só se vive uma vez",
      children: <DestinationTab uniqueName="so-se-vive-uma-vez" search={searchName} />,
    },
    {
      label: "Negócios",
      children: <DestinationTab uniqueName="negocios" search={searchName} />,
    },
    {
      label: "Espiritual",
      children: <DestinationTab uniqueName="espiritual" search={searchName} />,
    },
    {
      label: "Dinâmico",
      children: <DestinationTab uniqueName="dinamico" search={searchName} />,
    },
    {
      label: "Fã da rotina",
      children: <DestinationTab uniqueName="fa-da-rotina" search={searchName} />,
    },
    {
      label: "Garantido",
      children: <DestinationTab uniqueName="garantido" search={searchName} />,
    },
    {
      label: "Insaciável",
      children: <DestinationTab uniqueName="insaciavel" search={searchName} />,
    },
    {
      label: "Automático",
      children: <DestinationTab uniqueName="automatico" search={searchName} />,
    },
    {
      label: "Musicalidade",
      children: <DestinationTab uniqueName="musicalidade" search={searchName} />,
    },
  ] satisfies TabsProps["tabs"];

  return (
    <div className="public-destinations p-md">
      <TextField
        label="Nossos destinos"
        rightIconButton={{ name: "search" }}
        onChange={(e: any) => setSearchName(e.target.value)}
      />
      <Tabs align="left" defaultTabIndex={0} tabs={TABS} />
    </div>
  );
}
