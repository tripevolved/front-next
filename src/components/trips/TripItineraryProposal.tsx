"use client";

import Image from "next/image";
import useSWR from "swr";
import { TripsApiService } from "@/clients/trips";
import { ItineraryContent, type ItineraryItem, type ItineraryType } from "@/components/itineraries/ItineraryContent";
import { WhatsAppDirectButton } from "@/components/WhatsAppDirectButton";
import type { TripItineraryAction } from "@/core/types/itinerary";
import { UniqueMomentsCarousel } from "@/components/uniqueMoments";
import type { UniqueMoment } from "@/core/types/uniqueMoments";

const ERROR_STATE_IMAGE = "/assets/states/error-state.svg";
const EMPTY_STATE_IMAGE = "/assets/states/empty-state.svg";

const WHATSAPP_EXPERT_MESSAGE = "Olá! Gostaria de falar com um especialista sobre o itinerário da minha viagem.";

const PLACEHOLDER_IMAGE = "/assets/blank-image.png";

function formatActionDate(start: Date | string, end: Date | string): string {
  const s = typeof start === "string" ? new Date(start) : start;
  const e = typeof end === "string" ? new Date(end) : end;
  const opts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return `${s.toLocaleDateString("pt-BR", opts)} – ${e.toLocaleDateString("pt-BR", opts)}`;
}

function mapActionToItineraryItem(action: TripItineraryAction, index: number): ItineraryItem {
  const start = action.start as Date | string;
  const end = action.end as Date | string;
  const acc = action.tripAccommodation;

  const item: ItineraryItem = {
    id: index + 1,
    date: formatActionDate(start, end),
    activity: action.title,
    image: action.coverImage?.url ?? acc?.coverImage?.url ?? PLACEHOLDER_IMAGE,
    description: action.description,
    highlights: {
      description: action.highlight?.description ?? "",
      videos: action.videos?.map((v) => v.url) ?? [],
    },
  };

  if (acc) {
    item.accommodation = {
      accommodationId: acc.tripAccommodationId,
      accommodationUniqueName: acc.accommodationUniqueName,
      name: acc.name,
      description: acc.description,
      image: acc.coverImage?.url ?? PLACEHOLDER_IMAGE,
      tags: acc.tags ?? [],
      recommendedFor: acc.recommendedFor ?? [],
    };
  }

  return item;
}

function mapTripUniqueMomentToCarouselMoment(m: {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  images: Array<{ url?: string | null } | null> | null | undefined;
}): UniqueMoment {
  return {
    id: m.id,
    title: m.title,
    subtitle: m.subtitle,
    description: m.description,
    images: (m.images ?? []).map((img) => img?.url).filter((url): url is string => Boolean(url)),
  };
}

export interface TripItineraryProposalProps {
  tripId: string;
  type: ItineraryType;
  mapImage?: string;
}

export function TripItineraryProposal({ tripId, type, mapImage }: TripItineraryProposalProps) {
  const { data: tripItinerary, error, isLoading } = useSWR(
    tripId ? `trip-itinerary-${tripId}` : null,
    () => TripsApiService.getItinerary(tripId)
  );

  if (isLoading) {
    return (
      <section id="itinerary" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-[80%] mx-auto flex flex-col items-center justify-center min-h-[320px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
          <p className="mt-4 text-secondary-600 font-medium">Carregando itinerário...</p>
        </div>
      </section>
    );
  }

  if (error || !tripItinerary) {
    return (
      <section id="itinerary" className="py-16 bg-gray-50 scroll-mt-20">
        <div className="max-w-[80%] mx-auto flex flex-col items-center gap-6 text-center">
          <Image
            src={ERROR_STATE_IMAGE}
            alt=""
            width={240}
            height={240}
            className="object-contain"
          />
          <p className="text-secondary-600">
            Não foi possível carregar o itinerário. Converse com um especialista para mais informações.
          </p>
          <WhatsAppDirectButton message={WHATSAPP_EXPERT_MESSAGE} variant="primary">
            Falar com um especialista
          </WhatsAppDirectButton>
        </div>
      </section>
    );
  }

  const itinerary: ItineraryItem[] = (tripItinerary.actions ?? []).map(mapActionToItineraryItem);
  const mapImageUrl = mapImage ?? tripItinerary.descriptionImage?.url;
  const uniqueMoments: UniqueMoment[] = (tripItinerary.uniqueMoments ?? []).map(
    mapTripUniqueMomentToCarouselMoment
  );

  if (itinerary.length === 0) {
    return (
      <section id="itinerary" className="py-16 bg-gray-50 scroll-mt-20">
        <div className="max-w-[80%] mx-auto flex flex-col items-center gap-6 text-center">
          <Image
            src={EMPTY_STATE_IMAGE}
            alt=""
            width={240}
            height={240}
            className="object-contain"
          />
          <p className="text-secondary-600">
            Seu itinerário ainda está sendo preparado.
          </p>
          <WhatsAppDirectButton message={WHATSAPP_EXPERT_MESSAGE} variant="primary">
            Falar com um especialista
          </WhatsAppDirectButton>
        </div>
      </section>
    );
  }

  return (
    <>
      {uniqueMoments.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-[80%] mx-auto">
            <h2 className="text-3xl font-baloo font-bold text-secondary-900 mb-8 text-center">
              Momentos Únicos
            </h2>
            <UniqueMomentsCarousel uniqueMoments={uniqueMoments} />
          </div>
        </section>
      )}
      <ItineraryContent
        itinerary={itinerary}
        mapImage={mapImageUrl}
        type={type}
      />
    </>
  );
}
