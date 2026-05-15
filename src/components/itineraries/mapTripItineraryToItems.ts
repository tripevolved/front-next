import type { TripItineraryAction } from "@/core/types/itinerary";
import type { ItineraryItem } from "@/components/itineraries/ItineraryContent";

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

export function mapTripItineraryActionToItem(action: TripItineraryAction, index: number): ItineraryItem {
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

export function mapTripItineraryActions(actions: TripItineraryAction[] | undefined | null): ItineraryItem[] {
  return (actions ?? []).map(mapTripItineraryActionToItem);
}
