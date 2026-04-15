"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { TripsApiService } from "@/clients/trips";
import {
  parseAccommodationApiDateTime,
  type AvailabilityTravelerType,
} from "@/clients/accommodations";
import type { FamilyRoom } from "@/components/trip-planning/familyTypes";
import { CircleLoader } from "@/components/common/CircleLoader";
import { useAppStore } from "@/core/store";
import { buildRoomsInput, type CreateTripByAccommodationRoomInput } from "@/clients/trips/by-accommodation";

const LOADING_STEPS = [
  {
    title: "Confirmando sua hospedagem",
    body: "Estamos validando a tarifa escolhida, o fornecedor e o período das datas com nossos sistemas.",
  },
  {
    title: "Montando sua viagem",
    body: "Organizando datas, perfil de viajantes (casal ou família) e vinculando tudo à sua reserva.",
  },
  {
    title: "Preparando o checkout",
    body: "Em instantes você será redirecionado para a página segura de pagamento e conclusão da reserva.",
  },
] as const;

function parseTravelerType(raw: string | null): AvailabilityTravelerType | null {
  if (raw === "COUPLE" || raw === "FAMILY") return raw;
  return null;
}

function parseRooms(raw: string | null, travelerType: AvailabilityTravelerType): FamilyRoom[] | undefined {
  if (travelerType !== "FAMILY" || raw == null || raw.trim() === "") return undefined;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return undefined;
    return parsed as FamilyRoom[];
  } catch {
    return undefined;
  }
}

function parseRoomsInput(raw: string | null): CreateTripByAccommodationRoomInput[] | undefined {
  if (raw == null || raw.trim() === "") return undefined;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return undefined;
    const out: CreateTripByAccommodationRoomInput[] = [];
    for (const item of parsed) {
      const r = item as any;
      if (
        typeof r?.adults !== "number" ||
        typeof r?.children !== "number" ||
        !Array.isArray(r?.childrenAges) ||
        typeof r?.rateId !== "string" ||
        typeof r?.accommodationRoomId !== "string" ||
        typeof r?.vendor !== "string"
      ) {
        return undefined;
      }
      out.push({
        adults: r.adults,
        children: r.children,
        childrenAges: r.childrenAges,
        rateId: r.rateId,
        accommodationRoomId: r.accommodationRoomId,
        vendor: r.vendor,
      });
    }
    return out.length ? out : undefined;
  } catch {
    return undefined;
  }
}

/** Public marketing URL for an accommodation detail page. */
export function accommodationPublicPath(uniqueName: string): string {
  return `/hospedagens/${encodeURIComponent(uniqueName)}`;
}

export function CheckoutTripCreationFallback() {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-8 px-4 py-12"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <CircleLoader />
      <div className="max-w-md text-center space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Inicializando o checkout</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Carregando os dados da página. Em seguida vamos criar sua viagem e abrir o checkout.
        </p>
      </div>
    </div>
  );
}

export function CheckoutTripCreationClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ranRef = useRef(false);
  const travelerId = useAppStore((s) => s.travelerState?.id);

  const [error, setError] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (error !== null) return;
    const id = window.setInterval(() => {
      setStepIndex((i) => (i + 1) % LOADING_STEPS.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [error]);

  useEffect(() => {
    if (!searchParams) {
      setError("Não foi possível ler os dados do checkout.");
      return;
    }

    const accommodation = searchParams.get("accommodation")?.trim();
    const accommodationRoomId = searchParams.get("accommodationRoomId")?.trim();
    const startDate = searchParams.get("startDate")?.trim();
    const endDate = searchParams.get("endDate")?.trim();
    const travelerType = parseTravelerType(searchParams.get("travelerType"));
    const rateId = searchParams.get("rateId")?.trim();
    const vendor = searchParams.get("vendor")?.trim();
    const uniqueTransactionId = searchParams.get("uniqueTransactionId")?.trim();
    const uniqueTransactionValidUntil = parseAccommodationApiDateTime(
      searchParams.get("uniqueTransactionValidUntil")
    );
    const roomsRaw = searchParams.get("rooms");

    if (
      !accommodation ||
      !accommodationRoomId ||
      !startDate ||
      !endDate ||
      !travelerType ||
      !rateId ||
      !vendor ||
      !uniqueTransactionId ||
      !uniqueTransactionValidUntil
    ) {
      if (!ranRef.current) {
        ranRef.current = true;
        setError(
          "Não foi possível iniciar o checkout. Volte à hospedagem, escolha as datas e tente reservar novamente."
        );
      }
      return;
    }

    const roomsInput = parseRoomsInput(roomsRaw);
    const rooms = parseRooms(roomsRaw, travelerType);

    if (travelerType === "FAMILY" && !roomsInput && (!rooms || rooms.length === 0)) {
      if (!ranRef.current) {
        ranRef.current = true;
        setError(
          "Para reservas em família é necessário informar os quartos. Refaça a busca e tente novamente."
        );
      }
      return;
    }

    const tid = travelerId?.trim();
    if (!tid) {
      return;
    }

    if (ranRef.current) return;
    ranRef.current = true;

    TripsApiService.createTripByAccommodation({
      travelerId: tid,
      accommodationUniqueName: accommodation,
      uniqueTransactionId,
      uniqueTransactionValidUntil,
      startDate,
      endDate,
      travelerType,
      rooms:
        roomsInput ??
        buildRoomsInput({
          travelerType,
          accommodationRoomId,
          rateId,
          vendor,
          rooms,
        }),
    })
      .then(({ id }) => {
        router.replace(`/app/viagens/${id}/checkout`);
      })
      .catch(() => {
        ranRef.current = false;
        setError("Não foi possível criar a viagem. Tente novamente em instantes.");
      });
  }, [router, searchParams, travelerId]);

  const accommodationUniqueName = searchParams?.get("accommodation")?.trim() ?? null;
  const backToAccommodationHref =
    accommodationUniqueName && accommodationUniqueName.length > 0
      ? accommodationPublicPath(accommodationUniqueName)
      : null;

  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-10">
        <div className="max-w-md w-full rounded-xl border border-red-200 bg-red-50 px-5 py-5 text-center text-red-900 space-y-4">
          <p className="text-sm font-medium leading-relaxed">{error}</p>
          {backToAccommodationHref ? (
            <Link
              href={backToAccommodationHref}
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-primary-600 bg-white px-5 py-3 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50"
            >
              Voltar à hospedagem
            </Link>
          ) : null}
        </div>
      </div>
    );
  }

  const step = LOADING_STEPS[stepIndex];

  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-8 px-4 py-12"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={`${step.title}. ${step.body}`}
    >
      <CircleLoader />
      <div className="max-w-md text-center space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-primary-700">
          Criando sua viagem
        </p>
        <h2 className="text-xl font-semibold text-gray-900 leading-snug">{step.title}</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{step.body}</p>
        <p className="text-xs text-gray-400 pt-1">
          Etapa {(stepIndex % LOADING_STEPS.length) + 1} de {LOADING_STEPS.length} · isso costuma levar
          só alguns segundos
        </p>
      </div>
    </div>
  );
}
