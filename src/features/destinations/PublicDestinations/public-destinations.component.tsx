import { PhotoSource, TravelerProfileType } from "@/core/types";
import { LoadingSkeleton as LoadingSkeletonDestinations } from "@/features/dashboard/HasCurrentTrip";
import { ProfileApiService } from "@/services/api";
import { Box, CardTrip, EmptyState, ErrorState, SectionBase } from "@/ui";
import { Button, Grid, Pagination, TextField } from "mars-ds";
import { useState, useRef, useEffect } from "react";
import useSWR from "swr";

interface DestinationTabProps {
  uniqueName: string;
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
  {
    label: "Agitador",
    uniqueName: "agitador",
  },
  {
    label: "Automático",
    uniqueName: "automatico",
  },
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

export function PublicDestinations() {
  const [searchName, setSearchName] = useState("");
  const [currentUniqueName, setCurrentUniqueName] = useState<string>(TABS[0].uniqueName);

  return (
    <SectionBase className="public-destinations" heading="Destinos">
      <br />
      <TextField
        label="Nossos destinos"
        rightIconButton={{ name: "search" }}
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
            size="sm"
            onClick={() => setCurrentUniqueName(uniqueName)}
          >
            {label}
          </Button>
        ))}
      </div>
      <DestinationTab uniqueName={currentUniqueName} />
    </SectionBase>
  );
}

export const DestinationTab = ({ uniqueName }: DestinationTabProps) => {
  const [page, setPage] = useState(1);

  const fetcher = () => ProfileApiService.getPublicDestinations({ uniqueName, page });

  const { isLoading, isValidating, data, error, mutate } = useSWR(
    uniqueName ? `get-public-destinations-${uniqueName}` : null,
    fetcher
  );

  if (error) return <ErrorState />;

  if (isLoading || isValidating) return <LoadingSkeletonDestinations />;

  if (!data) return <EmptyState />;

  useEffect(() => {
    mutate();
  }, [page]);

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
        current={page}
        onSelectPage={(e) => setPage(e)}
        total={data.totalPages}
        siblingCount={2}
      />
    </>
  );
};
