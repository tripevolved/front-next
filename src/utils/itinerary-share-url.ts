export function getPublicItinerarySharePath(shareToken: string): string {
  return `/compartilhar/itinerario/${encodeURIComponent(shareToken)}`;
}

export function getPublicItineraryShareUrl(shareToken: string, origin?: string): string {
  const base = origin ?? (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}${getPublicItinerarySharePath(shareToken)}`;
}
