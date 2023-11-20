import { PhotoSource, TravelerProfileType } from "@/core/types";
import { LoadingSkeleton as LoadingSkeletonDestinations } from "@/features/dashboard/HasCurrentTrip";
import { ProfileApiService } from "@/services/api";
import { Box, CardTrip, EmptyState, ErrorState, SectionBase } from "@/ui";
import { Button, Grid, Pagination, TextField } from "mars-ds";
import { useState, useRef, useEffect } from "react";
import useSWR from "swr";

interface DestinationTabProps {
  searchName: string;
  uniqueName: string;
  currentPage: number;
  setPage: (page: number) => void;
  requestKey: string;
}

const TABS = [
  {
    label: "Todos",
    uniqueName: "all",
  },
  {
    label: "Relax",
    uniqueName: "relax",
  },
  {
    label: "Aventureiro",
    uniqueName: "aventureiro",
  },
  // {
  //   label: "Agitador",
  //   uniqueName: "agitador",
  // },
  // {
  //   label: "Automático",
  //   uniqueName: "automatico",
  // },
  {
    label: "Gastronômico",
    uniqueName: "gastronomico",
  },
  {
    label: "Alternativo",
    uniqueName: "alternativo",
  },
  {
    label: "Intelectual",
    uniqueName: "intelectual",
  },
  {
    label: "Só se vive uma vez",
    uniqueName: "so-se-vive-uma-vez",
  },
  {
    label: "Negócios",
    uniqueName: "negocios",
  },
  {
    label: "Espiritual",
    uniqueName: "espiritual",
  },
  {
    label: "Dinâmico",
    uniqueName: "dinamico",
  },
  {
    label: "Fã da rotina",
    uniqueName: "fa-da-rotina",
  },
  {
    label: "Garantido",
    uniqueName: "garantido",
  },
  {
    label: "Insaciável",
    uniqueName: "insaciavel",
  },
  {
    label: "Musicalidade",
    uniqueName: "musicalidade",
  },
];

const BASE_REQUESTKEY = "get-public-destinations";

export function PublicDestinations() {
  const [searchName, setSearchName] = useState("");
  const [currentUniqueName, setCurrentUniqueName] = useState<string>(TABS[0].uniqueName);
  const [currentPage, setCurrentPage] = useState(1);

  const handleTabSelection = (uniqueName: string) => {
    setCurrentUniqueName(uniqueName);
    setCurrentPage(1);
  };

  return (
    <SectionBase
      className="public-destinations"
      heading="Destinos"
      style={{ color: "var(--color-brand-1)" }}
    >
      <br />
      <TextField
        label="Nossos destinos"
        rightIconButton={{ name: "search" }}
        value={searchName}
        onChange={(e: any) => setSearchName(e.target.value)}
      />
      <br />
      <div className="public-destinations__tab">
        {TABS.map(({ label, uniqueName }) => (
          <Button
            className="public-destinations__tab-button"
            data-active={uniqueName === currentUniqueName}
            variant="text"
            key={uniqueName}
            style={{ minWidth: 115 }}
            size="sm"
            onClick={() => handleTabSelection(uniqueName)}
          >
            {label}
          </Button>
        ))}
      </div>
      <DestinationTab
        requestKey={`${BASE_REQUESTKEY}-${currentUniqueName}-page=${currentPage}-search=${searchName}`}
        uniqueName={currentUniqueName}
        currentPage={currentPage}
        setPage={setCurrentPage}
        searchName={searchName}
      />
    </SectionBase>
  );
}

export const DestinationTab = ({
  requestKey,
  searchName,
  uniqueName,
  currentPage,
  setPage,
}: DestinationTabProps) => {
  const fetcher = () =>
    ProfileApiService.getPublicDestinations({ search: searchName, uniqueName, page: currentPage });

  const { isLoading, isValidating, data, error } = useSWR(uniqueName ? requestKey : null, fetcher);

  if (error) return <ErrorState />;

  if (isLoading || isValidating) return <LoadingSkeletonDestinations />;

  if (!data) return <EmptyState />;

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
                href={`/destinos/${destination.uniqueName}`}
              >
                Quero ir
              </Button>
            </Box>
          </CardTrip>
        ))}
      </Grid>
      <Pagination
        current={currentPage}
        onSelectPage={(e) => setPage(e)}
        total={data.totalPages}
        siblingCount={1}
      />
    </>
  );
};
