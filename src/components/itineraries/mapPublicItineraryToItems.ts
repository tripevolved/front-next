import type { PublicTripItineraryAction } from "@/core/types/public-itinerary";
import type { ItineraryItem } from "@/components/itineraries/ItineraryContent";
import { normalizePublicTripAccommodation } from "@/components/itineraries/normalizePublicTripAccommodation";

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

export function mapPublicItineraryActionToItem(
  action: PublicTripItineraryAction,
  index: number
): ItineraryItem {
  const start = action.start as Date | string;
  const end = action.end as Date | string;
  const acc = normalizePublicTripAccommodation(action.tripAccommodation);

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
    const image =
      acc.coverImage?.url ?? acc.images?.find((img) => img.url)?.url ?? PLACEHOLDER_IMAGE;
    item.accommodation = {
      accommodationId: acc.tripAccommodationId,
      accommodationUniqueName: acc.accommodationUniqueName,
      name: acc.name,
      description: acc.description,
      image,
      tags: acc.tags ?? [],
      recommendedFor: acc.recommendedFor ?? [],
      publicDetails: acc,
    };
  }

  return item;
}

export function mapPublicItineraryActions(
  actions: PublicTripItineraryAction[] | undefined | null
): ItineraryItem[] {
  return (actions ?? []).map(mapPublicItineraryActionToItem);
}
