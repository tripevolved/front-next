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
  uniqueName: TravelerProfileType | "all";
  search: string;
  onShow: (value: string) => void;
  currentTab: string;
}

export const DestinationTab = ({ uniqueName, search, onShow, currentTab }: DestinationTabProps) => {
  const destinationsComponent = useRef<HTMLDivElement>(null);

  const fetcher = () => ProfileApiService.getPublicDestinations({ uniqueName, search, page: 1 });

  const { isLoading, data, error } = useSWR(
    currentTab == uniqueName ? `get-public-destinations-${uniqueName}` : null,
    fetcher
  );

  const parseImage = (sources: PhotoSource[]) =>
    sources.find(({ type }) => type === "md")?.url || null;

  if (error) return <ErrorState />;

  if (isLoading) return <LoadingSkeletonDestinations />;

  if (
    destinationsComponent.current?.parentElement?.classList.contains("tabs__content--is-active")
  ) {
    onShow(uniqueName as string);
  }

  return (
    <Grid columns={{ sm: 1, md: 2, lg: 3 }} ref={destinationsComponent} className="p-md">
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
  const [currentTab, setCurrentTab] = useState("all");

  const handleShow = (uniqueName: string) => {
    console.log("visivel", uniqueName);
    setCurrentTab(uniqueName);
  };

  const TABS = [
    {
      label: "Todos",
      children: (
        <DestinationTab
          currentTab={currentTab}
          uniqueName="all"
          onShow={handleShow}
          search={searchName}
        />
      ),
      className: "all",
    },
    {
      label: "Relax",
      children: (
        <DestinationTab
          currentTab={currentTab}
          uniqueName="relax"
          onShow={handleShow}
          search={searchName}
        />
      ),
    },
    {
      label: "Aventureiro",
      children: (
        <DestinationTab
          currentTab={currentTab}
          uniqueName="aventureiro"
          onShow={handleShow}
          search={searchName}
        />
      ),
    },
    {
      label: "Agitador",
      children: (
        <DestinationTab
          currentTab={currentTab}
          uniqueName="agitador"
          onShow={handleShow}
          search={searchName}
        />
      ),
    },
    {
      label: "Automático",
      children: (
        <DestinationTab
          currentTab={currentTab}
          uniqueName="automatico"
          onShow={handleShow}
          search={searchName}
        />
      ),
    },
    {
      label: "Gastronômico",
      children: (
        <DestinationTab
          currentTab={currentTab}
          uniqueName="gastronomico"
          onShow={handleShow}
          search={searchName}
        />
      ),
    },
    {
      label: "Colecionador de Pulseirinha",
      children: (
        <DestinationTab
          currentTab={currentTab}
          uniqueName="colecionador-de-pulseirinha"
          onShow={handleShow}
          search={searchName}
        />
      ),
    },
    {
      label: "Alternativo",
      children: (
        <DestinationTab
          currentTab={currentTab}
          uniqueName="alternativo"
          onShow={handleShow}
          search={searchName}
        />
      ),
    },
    {
      label: "Intelectual",
      children: (
        <DestinationTab
          currentTab={currentTab}
          uniqueName="intelectual"
          onShow={handleShow}
          search={searchName}
        />
      ),
    },
    {
      label: "Só se vive uma vez",
      children: (
        <DestinationTab
          currentTab={currentTab}
          uniqueName="so-se-vive-uma-vez"
          onShow={handleShow}
          search={searchName}
        />
      ),
    },
    {
      label: "Negócios",
      children: (
        <DestinationTab
          currentTab={currentTab}
          uniqueName="negocios"
          onShow={handleShow}
          search={searchName}
        />
      ),
    },
    {
      label: "Espiritual",
      children: (
        <DestinationTab
          currentTab={currentTab}
          uniqueName="espiritual"
          onShow={handleShow}
          search={searchName}
        />
      ),
    },
    {
      label: "Dinâmico",
      children: (
        <DestinationTab
          currentTab={currentTab}
          uniqueName="dinamico"
          onShow={handleShow}
          search={searchName}
        />
      ),
    },
    {
      label: "Fã da rotina",
      children: (
        <DestinationTab
          currentTab={currentTab}
          uniqueName="fa-da-rotina"
          onShow={handleShow}
          search={searchName}
        />
      ),
    },
    {
      label: "Garantido",
      children: (
        <DestinationTab
          currentTab={currentTab}
          uniqueName="garantido"
          onShow={handleShow}
          search={searchName}
        />
      ),
    },
    {
      label: "Insaciável",
      children: (
        <DestinationTab
          currentTab={currentTab}
          uniqueName="insaciavel"
          onShow={handleShow}
          search={searchName}
        />
      ),
    },
    {
      label: "Musicalidade",
      children: (
        <DestinationTab
          currentTab={currentTab}
          uniqueName="musicalidade"
          onShow={handleShow}
          search={searchName}
        />
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
