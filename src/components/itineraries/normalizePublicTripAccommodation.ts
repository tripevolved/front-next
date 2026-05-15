import type {
  PublicTripAccommodation,
  PublicTripAccommodationRoom,
} from "@/core/types/public-itinerary";
import type { TripImage, TripVideo } from "@/core/types/trip";
import {
  parsePaymentStatus,
  parseReservationStatus,
} from "@/utils/helpers/accommodation-status.helpers";

function asTripImage(value: unknown): TripImage | undefined {
  if (!value || typeof value !== "object") return undefined;
  const url = String((value as { url?: unknown }).url ?? "").trim();
  return url ? { url } : undefined;
}

function asTripVideo(value: unknown): TripVideo | undefined {
  if (!value || typeof value !== "object") return undefined;
  const url = String((value as { url?: unknown }).url ?? "").trim();
  return url ? { url } : undefined;
}

function normalizeRoom(raw: unknown): PublicTripAccommodationRoom | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const name = String(r.name ?? "").trim();
  if (!name) return null;

  return {
    name,
    description: r.description != null ? String(r.description) : null,
    adults: typeof r.adults === "number" ? r.adults : null,
    children: typeof r.children === "number" ? r.children : null,
    boardDescription: r.boardDescription != null ? String(r.boardDescription) : null,
    hasBreakfast: typeof r.hasBreakfast === "boolean" ? r.hasBreakfast : null,
    hasHalfBoard: typeof r.hasHalfBoard === "boolean" ? r.hasHalfBoard : null,
    hasFullBoard: typeof r.hasFullBoard === "boolean" ? r.hasFullBoard : null,
    isAllInclusive: typeof r.isAllInclusive === "boolean" ? r.isAllInclusive : null,
    externalReservationId:
      r.externalReservationId != null ? String(r.externalReservationId) : null,
    reservationStatusReason:
      r.reservationStatusReason != null ? String(r.reservationStatusReason) : null,
    reservationStatus: parseReservationStatus(r.reservationStatus),
    paymentStatus: parsePaymentStatus(r.paymentStatus),
    cancellationPolicy: r.cancellationPolicy != null ? String(r.cancellationPolicy) : null,
    coverImage: asTripImage(r.coverImage) ?? null,
  };
}

/** Normalizes API tripAccommodation payload (supports minor field name variants). */
export function normalizePublicTripAccommodation(raw: unknown): PublicTripAccommodation | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;

  const tripAccommodationId = String(r.tripAccommodationId ?? r.id ?? "").trim();
  const name = String(r.name ?? "").trim();
  if (!tripAccommodationId && !name) return null;

  const images = Array.isArray(r.images)
    ? r.images.map(asTripImage).filter((img): img is TripImage => Boolean(img))
    : [];
  const videos = Array.isArray(r.videos)
    ? r.videos.map(asTripVideo).filter((v): v is TripVideo => Boolean(v))
    : [];
  const rooms = Array.isArray(r.rooms)
    ? r.rooms
        .map(normalizeRoom)
        .filter((room): room is PublicTripAccommodationRoom => room != null)
    : [];

  return {
    tripAccommodationId: tripAccommodationId || name,
    accommodationUniqueName: String(r.accommodationUniqueName ?? "").trim(),
    name,
    description: String(r.description ?? ""),
    tags: Array.isArray(r.tags) ? r.tags.map(String).filter(Boolean) : [],
    recommendedFor: Array.isArray(r.recommendedFor)
      ? r.recommendedFor.map(String).filter(Boolean)
      : [],
    coverImage: asTripImage(r.coverImage) ?? images[0] ?? null,
    images,
    videos,
    rooms,
  };
}
