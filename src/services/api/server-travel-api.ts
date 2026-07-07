import { cache } from "react";
import type { PublicAccommodationPageSummary } from "@/core/types/accommodations";

function getTravelApiConfig() {
  const apiBase = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
  if (!apiBase || !apiKey) {
    throw new Error("Missing NEXT_PUBLIC_API_URL or NEXT_PUBLIC_API_KEY");
  }
  return { apiBase, apiKey };
}

async function fetchTravelApi<T>(path: string): Promise<T> {
  const { apiBase, apiKey } = getTravelApiConfig();
  const res = await fetch(`${apiBase}/api/${path}`, {
    method: "GET",
    headers: {
      "X-API-Key": apiKey,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Travel API request failed: ${res.status}`);
  }

  return (await res.json()) as T;
}

export const getAccommodationPageSummary = cache(async (uniqueName: string): Promise<PublicAccommodationPageSummary> => {
  return fetchTravelApi<PublicAccommodationPageSummary>(
    `accommodations/${encodeURIComponent(uniqueName)}/page-summary`
  );
});

export async function fetchAccommodationExtendedFromTravelService(uniqueName: string) {
  return fetchTravelApi(`accommodations/${encodeURIComponent(uniqueName)}/extended`);
}
