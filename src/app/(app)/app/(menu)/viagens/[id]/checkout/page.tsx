import type { Metadata } from "next";
import type { TripDetails } from "@/core/types";
import { CheckoutTripById } from "@/components/trips/CheckoutTripById";
import { auth0 } from "@/lib/auth0";

interface CheckoutPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getTripForCheckout(tripId: string): Promise<TripDetails> {
  const apiBase = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
  if (!apiBase || !apiKey) {
    throw new Error("Missing NEXT_PUBLIC_API_URL or NEXT_PUBLIC_API_KEY");
  }

  let accessToken: string | null = null;
  try {
    const creds: any = await auth0.getAccessToken();
    if (typeof creds === "string") accessToken = creds;
    else if (creds?.accessToken && typeof creds.accessToken === "string")
      accessToken = creds.accessToken;
    else if (creds?.token && typeof creds.token === "string") accessToken = creds.token;
  } catch {
    accessToken = null;
  }

  const res = await fetch(`${apiBase}/api/trips/${encodeURIComponent(tripId)}`, {
    method: "GET",
    headers: {
      "X-API-Key": apiKey,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch trip: ${res.status}`);
  }
  return (await res.json()) as TripDetails;
}

export async function generateMetadata({ params }: CheckoutPageProps): Promise<Metadata> {
  const { id } = await params;
  let trip: TripDetails | null = null;
  try {
    trip = await getTripForCheckout(id);
  } catch {
    trip = null;
  }

  const title = trip?.title ? `Checkout · ${trip.title}` : "Checkout";
  const destination = trip?.destination ? ` · ${trip.destination}` : "";

  return {
    title,
    description: trip?.title
      ? `Finalize sua hospedagem${destination} e conclua a reserva da viagem.`
      : "Finalize sua hospedagem e conclua a reserva da viagem.",
  };
}

export default async function ViagemCheckoutPage({ params }: CheckoutPageProps) {
  const { id } = await params;
  const trip = await getTripForCheckout(id);
  return <CheckoutTripById tripId={id} initialTrip={trip} />;
}

