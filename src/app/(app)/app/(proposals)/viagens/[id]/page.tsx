import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { TripDetails } from "@/core/types";
import { auth0 } from "@/lib/auth0";
import { formatPtBrDateRangeLong, parseDateOnlyToLocalDate } from "@/utils/helpers/dates.helpers";
import { TripConfigurationSet } from "@/components/trips/TripConfigurationSet";
import { JourneyDetailsSection } from "@/components/trips/JourneyDetailsSection";

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

  const title = trip?.title ? `${trip.title}` : "Viagem";
  const destination = trip?.destination ? ` · ${trip.destination}` : "";

  return {
    title,
    description: trip?.title ? `Acompanhe os detalhes da sua viagem${destination}.` : "Acompanhe os detalhes da sua viagem.",
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

  return (
    <div className="min-h-screen">
      {/* Hero Section (matches /proposta) */}
      <section
        className="relative text-white py-16 min-h-[320px] flex flex-col"
        style={
          coverImageUrl
            ? {
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%), url(${coverImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : undefined
        }
      >
        {!coverImageUrl && <div className="absolute inset-0 bg-secondary-500 -z-10" />}

        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/app"
            className="inline-flex items-center gap-1.5 bg-transparent border border-white text-white hover:bg-white/20 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            aria-label="Voltar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao painel
          </Link>
        </div>

        <div className="max-w-[80%] mx-auto text-center flex-1 flex flex-col items-center justify-center mt-10">
          <h1 className="text-4xl md:text-5xl font-baloo font-bold mb-4">{tripDetails.title}</h1>
          <p className="text-lg md:text-xl font-comfortaa mb-8">{formatHeroDates(tripDetails)}</p>

          <Link
            href="#details"
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-full font-baloo font-semibold hover:bg-primary-50 transition-colors w-fit"
          >
            Ver detalhes
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Trip Configuration */}
      <section className="max-w-[80%] mx-auto -mt-6 relative z-10 px-4">
        <TripConfigurationSet configuration={tripDetails.configuration} hideEditButton />
      </section>

      {/* Details */}
      <section id="details" className="max-w-[80%] mx-auto px-4 py-12 scroll-mt-24">
        <h2 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900 mb-6">Detalhes da jornada</h2>
        <JourneyDetailsSection tripId={tripDetails.id} />
      </section>
    </div>
  );
}

