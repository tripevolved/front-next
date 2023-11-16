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
  onShow: (value: string) => void;
}

export const DestinationTab = ({ uniqueName, search, onShow }: DestinationTabProps) => {
  const destinationsComponent = useRef<HTMLDivElement>(null);

  const fetcher = () => ProfileApiService.getPublicDestinations({ uniqueName, search, page: 1 });

  const { isLoading, data, error } = useSWR(
    destinationsComponent.current ? `get-public-destinations-${uniqueName}` : null,
    fetcher
  );

  const parseImage = (sources: PhotoSource[]) =>
    sources.find(({ type }) => type === "md")?.url || null;

  if (error) return <ErrorState />;

  if (isLoading) return <LoadingSkeletonDestinations />;

  if (destinationsComponent.current) {
    onShow(uniqueName as string);
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
  const [currentTab, setCurrentTab] = useState("");

  const handleShow = (uniqueName: string) => {
    console.log("chamou", uniqueName);
    setCurrentTab(uniqueName);
  };

  const TABS = [
    {
      label: "Todos",
      children: <DestinationTab onShow={handleShow} search={searchName} />,
      className: "all",
    },
    {
      label: "Relax",
      children: <DestinationTab uniqueName="relax" onShow={handleShow} search={searchName} />,
    },
    {
      label: "Aventureiro",
      children: <DestinationTab uniqueName="aventureiro" onShow={handleShow} search={searchName} />,
    },
    {
      label: "Agitador",
      children: <DestinationTab uniqueName="agitador" onShow={handleShow} search={searchName} />,
    },
    {
      label: "Automático",
      children: <DestinationTab uniqueName="automatico" onShow={handleShow} search={searchName} />,
    },
    {
      label: "Gastronômico",
      children: (
        <DestinationTab uniqueName="gastronomico" onShow={handleShow} search={searchName} />
      ),
    },
    {
      label: "Colecionador de Pulseirinha",
      children: (
        <DestinationTab
          uniqueName="colecionador-de-pulseirinha"
          onShow={handleShow}
          search={searchName}
        />
      ),
    },
    {
      label: "Alternativo",
      children: <DestinationTab uniqueName="alternativo" onShow={handleShow} search={searchName} />,
    },
    {
      label: "Intelectual",
      children: <DestinationTab uniqueName="intelectual" onShow={handleShow} search={searchName} />,
    },
    {
      label: "Só se vive uma vez",
      children: (
        <DestinationTab uniqueName="so-se-vive-uma-vez" onShow={handleShow} search={searchName} />
      ),
    },
    {
      label: "Negócios",
      children: <DestinationTab uniqueName="negocios" onShow={handleShow} search={searchName} />,
    },
    {
      label: "Espiritual",
      children: <DestinationTab uniqueName="espiritual" onShow={handleShow} search={searchName} />,
    },
    {
      label: "Dinâmico",
      children: <DestinationTab uniqueName="dinamico" onShow={handleShow} search={searchName} />,
    },
    {
      label: "Fã da rotina",
      children: (
        <DestinationTab uniqueName="fa-da-rotina" onShow={handleShow} search={searchName} />
      ),
    },
    {
      label: "Garantido",
      children: <DestinationTab uniqueName="garantido" onShow={handleShow} search={searchName} />,
    },
    {
      label: "Insaciável",
      children: <DestinationTab uniqueName="insaciavel" onShow={handleShow} search={searchName} />,
    },
    {
      label: "Musicalidade",
      children: (
        <DestinationTab uniqueName="musicalidade" onShow={handleShow} search={searchName} />
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
      <Tabs align="left" defaultTabIndex={0} tabs={TABS} />
    </div>
  );
}
