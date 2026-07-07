import type { PublicAccommodationExtended } from "@/core/types/accommodations";

export async function getAccommodationExtended(uniqueName: string): Promise<PublicAccommodationExtended> {
  const res = await fetch(`/api/accommodations/${encodeURIComponent(uniqueName)}/extended`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch accommodation extended content: ${res.status}`);
  }

  return (await res.json()) as PublicAccommodationExtended;
}
