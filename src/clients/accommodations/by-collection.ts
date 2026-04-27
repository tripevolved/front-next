import type { PublicAccommodationAmenity, PublicAccommodationLocation } from "@/core/types/accommodations";
import { ApiRequest } from "@/services/api/request";

export type AccommodationByCollectionItem = {
  id: string;
  uniqueName: string;
  title: string;
  subtitle?: string | null;
  destination?: string | null;
  coverImage?: { url: string; shortDescription?: string | null } | null;
  amenities?: PublicAccommodationAmenity[];
  recommendedFor?: string[];
  tags?: string[];
};

function pickDestinationFromPayload(r: Record<string, unknown>): string | null {
  const d = r.destination;
  if (typeof d === "string" && d.trim()) return d.trim();

  const loc = r.location;
  if (typeof loc === "string" && loc.trim()) return loc.trim();
  if (loc && typeof loc === "object" && "address" in loc) {
    const addr = (loc as PublicAccommodationLocation).address;
    if (typeof addr === "string" && addr.trim()) return addr.trim();
  }
  return null;
}

function normalizeCollectionItem(raw: unknown): AccommodationByCollectionItem {
  if (!raw || typeof raw !== "object") {
    return { id: "", uniqueName: "", title: "" };
  }
  const r = raw as Record<string, unknown>;
  const cover = r.coverImage;
  const coverImage =
    cover && typeof cover === "object" && cover !== null && "url" in (cover as object)
      ? (cover as { url: string; shortDescription?: string | null })
      : null;

  return {
    id: String(r.id ?? ""),
    uniqueName: String(r.uniqueName ?? ""),
    title: String(r.title ?? ""),
    subtitle: r.subtitle != null ? String(r.subtitle) : null,
    destination: pickDestinationFromPayload(r),
    coverImage,
    amenities: Array.isArray(r.amenities) ? (r.amenities as PublicAccommodationAmenity[]) : undefined,
    recommendedFor: Array.isArray(r.recommendedFor) ? (r.recommendedFor as string[]) : undefined,
    tags: Array.isArray(r.tags) ? (r.tags as string[]) : undefined,
  };
}

function normalizeByCollectionResponse(
  raw: unknown,
  params?: { offset?: number; limit?: number }
): AccommodationsByCollectionResponse {
  const fallbackLimit = params?.limit ?? 10;
  const empty = (): AccommodationsByCollectionResponse => ({
    accommodations: [],
    offset: params?.offset ?? 0,
    limit: fallbackLimit,
    count: 0,
    totalCount: 0,
  });

  if (Array.isArray(raw)) {
    const accommodations = raw.map(normalizeCollectionItem);
    const n = accommodations.length;
    return {
      accommodations,
      offset: params?.offset ?? 0,
      limit: fallbackLimit,
      count: n,
      totalCount: n,
    };
  }

  if (!raw || typeof raw !== "object") return empty();

  const d = raw as Record<string, unknown>;
  const rawList = d.accommodations ?? d.items ?? d.data;
  const list = Array.isArray(rawList) ? rawList : [];
  const accommodations = list.map(normalizeCollectionItem);

  const offset = typeof d.offset === "number" ? d.offset : (params?.offset ?? 0);
  const limit = typeof d.limit === "number" ? d.limit : fallbackLimit;
  const count = typeof d.count === "number" ? d.count : accommodations.length;
  const totalCount =
    typeof d.totalCount === "number"
      ? d.totalCount
      : typeof d.total === "number"
        ? d.total
        : accommodations.length;

  return { accommodations, offset, limit, count, totalCount };
}

export type AccommodationsByCollectionResponse = {
  accommodations: AccommodationByCollectionItem[];
  offset: number;
  limit: number;
  count: number;
  totalCount: number;
};

export const getAccommodationsByCollection = async (
  collectionUniqueName: string,
  params?: { offset?: number; limit?: number }
): Promise<AccommodationsByCollectionResponse> => {
  const sp = new URLSearchParams();
  if (typeof params?.offset === "number") sp.set("offset", String(params.offset));
  if (typeof params?.limit === "number") sp.set("limit", String(params.limit));

  const route = `accommodations/${encodeURIComponent(collectionUniqueName)}/by-collection${
    sp.toString() ? `?${sp.toString()}` : ""
  }`;
  const raw = await ApiRequest.get<unknown>(route);
  return normalizeByCollectionResponse(raw, params);
};

