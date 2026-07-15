"use client";

import { useCallback, useMemo, useState } from "react";
import useSWR, { useSWRConfig } from "swr";

import { TripsApiService } from "@/clients/trips";
import type { TripAccommodationItem } from "@/clients/trips/accommodations";
import { TripConfigurationSet } from "@/components/trips/TripConfigurationSet";
import { TripNavigationCards } from "@/components/trips/TripNavigationCards";
import { JourneyDetailsSection } from "@/components/trips/JourneyDetailsSection";
import { TripJourneyHero } from "@/components/trips/TripJourneyHero";
import { TripPendingActionsBanner } from "@/components/trips/TripPendingActionsBanner";
import { TripBaseSelectionDrawer } from "@/components/trips/TripBaseSelectionDrawer";
import { TripPendenciasDrawer } from "@/components/trips/TripPendenciasDrawer";
import {
  useAccommodationProposals,
} from "@/components/trips/AccommodationProposalsEntry";
import { AccommodationProposalsDrawer } from "@/components/trips/AccommodationProposalsDrawer";
import { AddAccommodationDrawer } from "@/components/trips/AddAccommodationDrawer";
import { EditTripConfigurationDrawer } from "@/components/trips/EditTripConfigurationDrawer";
import { TripTravelIntentQuizDrawer } from "@/components/trips/TripTravelIntentQuizDrawer";
import type { TripPendingAction } from "@/utils/trips/trip-pending-actions";
import type { TripDetails } from "@/core/types/trip";
import { TravelerType } from "@/core/types/trip";
import type { TripAccommodationProposalsResponse } from "@/core/types/recommendations";
import type { AccommodationAvailabilityQuery, TravelerInput } from "@/clients/accommodations";
import { getTripPendingActions } from "@/utils/trips/trip-pending-actions";
import { formatPtBrDateRangeLong, parseDateOnlyToLocalDate } from "@/utils/helpers/dates.helpers";

const MONTH_NAMES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function formatHeroDates(tripDetails: TripDetails): string {
  const config = tripDetails.configuration;
  if (config?.startDate && config?.endDate) {
    const start = parseDateOnlyToLocalDate(config.startDate);
    const end = parseDateOnlyToLocalDate(config.endDate);
    if (!start || !end) return "Datas a definir";
    return formatPtBrDateRangeLong(start, end);
  }
  if (config?.month != null && config.month >= 1 && config.month <= 12) {
    return `Em ${MONTH_NAMES[config.month - 1]}`;
  }
  return "Datas a definir";
}

type Props = {
  initialTripDetails: TripDetails;
};

export function TripPageClient({ initialTripDetails }: Props) {
  const tripId = initialTripDetails.id;
  const { mutate } = useSWRConfig();

  const { data: tripDetails } = useSWR<TripDetails>(
    ["trip-details", tripId],
    () => TripsApiService.getTripDetailsById(tripId),
    { fallbackData: initialTripDetails, revalidateOnFocus: false }
  );

  const { data: accommodations } = useSWR<TripAccommodationItem[]>(
    ["trip-accommodations", tripId],
    () => TripsApiService.getTripAccommodations(tripId),
    { revalidateOnFocus: false }
  );

  const [planningDrawerOpen, setPlanningDrawerOpen] = useState(false);
  const [baseDrawerOpen, setBaseDrawerOpen] = useState(false);
  const [proposalsDrawerOpen, setProposalsDrawerOpen] = useState(false);
  const [browseDrawerOpen, setBrowseDrawerOpen] = useState(false);
  const [pendenciasOpen, setPendenciasOpen] = useState(false);
  const [travelIntentQuizOpen, setTravelIntentQuizOpen] = useState(false);

  const hasDestination = Boolean(
    tripDetails?.destinationUniqueName?.trim() || tripDetails?.destination?.trim()
  );
  const hasTravelIntent = Boolean(tripDetails?.hasTravelIntent);

  const {
    data: proposalsData,
    error: proposalsError,
    isGenerating: proposalsGenerating,
  } = useAccommodationProposals(tripId, hasDestination, hasTravelIntent);

  const pendingActions = useMemo(
    () => getTripPendingActions(tripDetails, accommodations),
    [tripDetails, accommodations]
  );

  const refreshTripData = useCallback(() => {
    void mutate(["trip-details", tripId]);
    void mutate(["trip-accommodations", tripId]);
    void mutate(["trip-price", tripId]);
    void mutate(["trip-accommodation-proposals", tripId]);
  }, [mutate, tripId]);

  const handleTravelIntentQuizCompleted = useCallback(
    async (proposals: TripAccommodationProposalsResponse) => {
      await mutate(["trip-details", tripId]);
      await mutate(["trip-accommodation-proposals", tripId], proposals, { revalidate: false });
      setProposalsDrawerOpen(true);
    },
    [mutate, tripId],
  );

  const handleOpenDrawer = useCallback((drawer: NonNullable<TripPendingAction["drawer"]>) => {
    if (drawer === "planning") setPlanningDrawerOpen(true);
    else if (drawer === "base") setBaseDrawerOpen(true);
    else if (drawer === "accommodation_proposals") {
      if (hasTravelIntent) setProposalsDrawerOpen(true);
      else setTravelIntentQuizOpen(true);
    } else setBrowseDrawerOpen(true);
  }, [hasTravelIntent]);

  const isGeneratingRecommendations = hasTravelIntent && proposalsGenerating;

  const tripStayDates = useMemo(() => {
    const cfg = tripDetails?.configuration;
    if (!cfg) return { start: null as Date | null, end: null as Date | null };
    return {
      start: parseDateOnlyToLocalDate(cfg.startDate),
      end: parseDateOnlyToLocalDate(cfg.endDate),
    };
  }, [tripDetails?.configuration]);

  const travelerQuery: AccommodationAvailabilityQuery = useMemo(() => {
    const cfg = tripDetails?.configuration;
    const isFamily = cfg?.travelerType === TravelerType.FAMILY || (cfg?.numChildren ?? 0) > 0;
    const adults = Math.max(1, cfg?.numAdults ?? 2);
    const children = Math.max(0, cfg?.numChildren ?? 0);
    const childrenAges = Array.isArray(cfg?.childrenAges) ? cfg!.childrenAges : [];
    const roomsFromTrip =
      Array.isArray(cfg?.rooms) && cfg!.rooms.length > 0
        ? cfg!.rooms.map((r) => ({
            adults: r.numAdults,
            children: r.numChildren,
            childrenAges: r.childrenAges ?? [],
          }))
        : [{ adults, children, childrenAges }];

    const travelerInput: TravelerInput = isFamily
      ? { type: "FAMILY", adults, children, childrenAges, rooms: roomsFromTrip }
      : {
          type: "COUPLE",
          adults: 2,
          children: 0,
          childrenAges: [],
          rooms: [{ adults: 2, children: 0, childrenAges: [] }],
        };

    return { travelerInput };
  }, [tripDetails?.configuration]);

  if (!tripDetails) return null;

  const coverImageUrl = tripDetails.coverImage?.url;
  const datesLabel = formatHeroDates(tripDetails);
  const relatedUnique = tripDetails.destinationUniqueName ?? undefined;
  const collectionUnique = tripDetails.collection?.trim() || undefined;

  return (
    <div className="min-h-screen">
      <TripJourneyHero
        tripId={tripDetails.id}
        title={tripDetails.title}
        datesLabel={datesLabel}
        coverImageUrl={coverImageUrl}
        destination={tripDetails.destination}
        relatedDestinationUniqueName={relatedUnique}
        hideDestinationCta={pendingActions.some((a) => a.id === "base")}
      />

      <section className="md:max-w-[80%] mx-auto -mt-6 relative z-10 px-4 space-y-6">
        <TripPendingActionsBanner
          actions={pendingActions}
          onOpenDrawer={handleOpenDrawer}
          isGeneratingRecommendations={isGeneratingRecommendations}
        />
        <TripConfigurationSet
          tripId={tripDetails.id}
          tripStatus={tripDetails.status}
          configuration={tripDetails.configuration}
        />
        <TripNavigationCards
          tripId={tripDetails.id}
          destination={tripDetails.destination ?? undefined}
          pendingCount={pendingActions.length}
          onOpenPendencias={() => setPendenciasOpen(true)}
          isGeneratingRecommendations={isGeneratingRecommendations}
          proposalCount={proposalsData?.proposals?.length ?? 0}
          hasTravelIntent={hasTravelIntent}
          hasDestination={hasDestination}
          onOpenRecommendations={() => setProposalsDrawerOpen(true)}
          onStartTravelIntentQuiz={() => setTravelIntentQuizOpen(true)}
        />
      </section>

      <section id="details" className="md:max-w-[80%] mx-auto px-4 py-12 scroll-mt-24">
        <h2 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900 mb-6">Detalhes da jornada</h2>
        <JourneyDetailsSection
          tripId={tripDetails.id}
          destination={tripDetails.destination ?? undefined}
          relatedDestinationUniqueName={relatedUnique}
        />
      </section>

      <TripBaseSelectionDrawer
        isOpen={baseDrawerOpen}
        onClose={() => setBaseDrawerOpen(false)}
        tripId={tripId}
        relatedDestinationUniqueName={relatedUnique}
        onSaved={refreshTripData}
        onContinueToAccommodation={() => setProposalsDrawerOpen(true)}
      />

      <EditTripConfigurationDrawer
        isOpen={planningDrawerOpen}
        onClose={() => {
          setPlanningDrawerOpen(false);
          refreshTripData();
        }}
        tripId={tripId}
        configuration={tripDetails.configuration}
      />

      <AccommodationProposalsDrawer
        isOpen={proposalsDrawerOpen}
        onClose={() => setProposalsDrawerOpen(false)}
        tripId={tripId}
        proposals={proposalsData?.proposals ?? []}
        isLoading={proposalsGenerating}
        loadError={Boolean(proposalsError)}
        travelerQuery={travelerQuery}
        stayStartDate={tripStayDates.start}
        stayEndDate={tripStayDates.end}
        onBrowseOther={() => setBrowseDrawerOpen(true)}
        onTripAccommodationsChanged={refreshTripData}
      />

      <TripTravelIntentQuizDrawer
        isOpen={travelIntentQuizOpen}
        onClose={() => setTravelIntentQuizOpen(false)}
        tripId={tripId}
        travelerType={tripDetails.configuration?.travelerType}
        onCompleted={handleTravelIntentQuizCompleted}
      />

      <AddAccommodationDrawer
        isOpen={browseDrawerOpen}
        onClose={() => setBrowseDrawerOpen(false)}
        tripId={tripId}
        relatedDestinationUniqueName={relatedUnique}
        tripDestinationLabel={tripDetails.destination}
        presetDestinationUniqueName={collectionUnique ? undefined : relatedUnique}
        presetCollectionUniqueName={collectionUnique}
        presetStayStartDate={tripStayDates.start}
        presetStayEndDate={tripStayDates.end}
        travelerQuery={travelerQuery}
        onTripAccommodationsChanged={refreshTripData}
      />

      <TripPendenciasDrawer
        isOpen={pendenciasOpen}
        onClose={() => setPendenciasOpen(false)}
        actions={pendingActions}
        onOpenDrawer={handleOpenDrawer}
      />
    </div>
  );
}
