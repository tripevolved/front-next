"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { TripConfigurationSet } from "@/components/trips/TripConfigurationSet";
import { TripItineraryBuilder } from "@/components/trips/TripItineraryBuilder";
import { ItineraryShareButton } from "@/components/trips/ItineraryShareButton";
import { TripsApiService } from "@/clients/trips";
import type { TripDetails } from "@/core/types";
import { formatPtBrDateRangeLong, parseDateOnlyToLocalDate } from "@/utils/helpers/dates.helpers";

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

export default function ItinerarioPage() {
  const params = useParams();
  const id = params?.id as string;

  const { data: tripDetails, error, isLoading } = useSWR(
    id ? `trip-details-${id}` : null,
    () => TripsApiService.getTripDetailsById(id)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (error || !tripDetails) {
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
            Voltar para o painel
          </Link>
        </div>
      </div>
    );
  }

  const coverImageUrl = tripDetails.coverImage?.url;
  const relatedUnique = tripDetails.destinationUniqueName ?? undefined;

  return (
    <div className="min-h-screen">
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
        {!coverImageUrl ? <div className="absolute inset-0 bg-secondary-500 -z-10" /> : null}
        <div className="absolute top-6 left-6 right-6 z-10 flex items-center gap-4">
          <Link
            href={`/app/viagens/${encodeURIComponent(id)}`}
            className="inline-flex items-center gap-1.5 bg-transparent border border-white text-white hover:bg-white/20 px-3 py-1.5 rounded-full text-sm font-medium transition-colors shrink-0"
          >
            Voltar à viagem
          </Link>
        </div>
        <div className="max-w-[80%] mx-auto text-center flex-1 flex flex-col items-center justify-center mt-10">
          <h1 className="text-4xl md:text-5xl font-baloo font-bold mb-4">{tripDetails.title}</h1>
          <p className="text-lg md:text-xl font-comfortaa mb-8">{formatHeroDates(tripDetails)}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-lg mx-auto">
            <a
              href="#itinerary"
              className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-full font-baloo font-semibold hover:bg-primary-50 transition-colors w-fit shrink-0"
            >
              Ver itinerário
            </a>
            <ItineraryShareButton tripId={id} tripTitle={tripDetails.title} />
          </div>
        </div>
      </section>

      <section className="max-w-[80%] mx-auto -mt-6 relative z-[1] px-4">
        <TripConfigurationSet
          tripId={id}
          tripStatus={tripDetails.status}
          configuration={tripDetails.configuration}
        />
      </section>

      <TripItineraryBuilder
        tripId={id}
        destination={tripDetails.destination ?? undefined}
        relatedDestinationUniqueName={relatedUnique}
      />
    </div>
  );
}
