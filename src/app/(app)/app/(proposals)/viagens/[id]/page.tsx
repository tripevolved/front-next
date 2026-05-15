import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { TripDetails } from "@/core/types";
import { auth0 } from "@/lib/auth0";
import { formatPtBrDateRangeLong, parseDateOnlyToLocalDate } from "@/utils/helpers/dates.helpers";
import { TripConfigurationSet } from "@/components/trips/TripConfigurationSet";
import { TripNavigationCards } from "@/components/trips/TripNavigationCards";
import { JourneyDetailsSection } from "@/components/trips/JourneyDetailsSection";
import { TripJourneyHero } from "@/components/trips/TripJourneyHero";
type Props = {
  params: Promise<{ id: string }>;
};

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

async function getTripById(tripId: string): Promise<TripDetails> {
  const apiBase = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
  if (!apiBase || !apiKey) {
    throw new Error("Missing NEXT_PUBLIC_API_URL or NEXT_PUBLIC_API_KEY");
  }

  let accessToken: string | null = null;
  try {
    const creds: any = await auth0.getAccessToken();
    if (typeof creds === "string") accessToken = creds;
    else if (creds?.accessToken && typeof creds.accessToken === "string") accessToken = creds.accessToken;
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  let trip: TripDetails | null = null;
  try {
    trip = await getTripById(id);
  } catch {
    trip = null;
  }

  const title = trip?.title ? `${trip.title} - Trip Evolved` : "Viagem - Trip Evolved";
  return {
    title,
    description: trip?.title ? `Acompanhe os detalhes da sua viagem${trip.destination ? ` · ${trip.destination}` : ""}.` : "Acompanhe os detalhes da sua viagem.",
  };
}

export default async function ViagemByIdPage({ params }: Props) {
  const { id } = await params;

  let tripDetails: TripDetails | null = null;
  try {
    tripDetails = await getTripById(id);
  } catch {
    tripDetails = null;
  }

  if (!tripDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-6 text-center max-w-md">
          <Image src="/assets/states/empty-state.svg" alt="" width={240} height={240} className="object-contain" />
          <h1 className="text-xl font-bold text-gray-900">Viagem não encontrada</h1>
          <p className="text-gray-600">A viagem solicitada não foi encontrada.</p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 mt-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para o painel
          </Link>
        </div>
      </div>
    );
  }

  const coverImageUrl = tripDetails.coverImage?.url;
  const datesLabel = formatHeroDates(tripDetails);
  const relatedUnique = tripDetails.destinationUniqueName ?? undefined;

  return (
    <div className="min-h-screen">
      <TripJourneyHero
        tripId={tripDetails.id}
        title={tripDetails.title}
        datesLabel={datesLabel}
        coverImageUrl={coverImageUrl}
        destination={tripDetails.destination}
        relatedDestinationUniqueName={relatedUnique}
      />

      {/* Trip Configuration */}
      <section className="md:max-w-[80%] mx-auto -mt-6 relative z-10 px-4 space-y-6">
        <TripConfigurationSet
          tripId={tripDetails.id}
          tripStatus={tripDetails.status}
          configuration={tripDetails.configuration}
        />
        <TripNavigationCards tripId={tripDetails.id} destination={tripDetails.destination ?? undefined} />
      </section>

      {/* Details */}
      <section id="details" className="md:max-w-[80%] mx-auto px-4 py-12 scroll-mt-24">
        <h2 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900 mb-6">Detalhes da jornada</h2>
        <JourneyDetailsSection
          tripId={tripDetails.id}
          destination={tripDetails.destination ?? undefined}
          relatedDestinationUniqueName={relatedUnique}
        />
      </section>
    </div>
  );
}

