"use client";

import Image from "next/image";
import useSWR from "swr";
import { TripsApiService } from "@/clients/trips";
import type { TripAccommodationDetailsResponse } from "@/clients/trips/accommodations";
import { EmptyOrErrorState } from "@/components/common/EmptyOrErrorState";
import { parseDateOnlyToLocalDate } from "@/utils/helpers/dates.helpers";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
  accommodationId: string;
};

const PLACEHOLDER_IMAGE = "/assets/blank-image.png";

function imageUrl(img?: { url: string } | null): string | null {
  const u = img?.url?.trim();
  return u ? u : null;
}

function formatShortDatePtBR(value: unknown): string | null {
  const d = parseDateOnlyToLocalDate(value);
  if (!d) return null;
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(d);
}

function labelOrDash(s?: string | null): string {
  const v = (s ?? "").trim();
  return v ? v : "—";
}

function safeRemarksHtml(input?: string | null): string | null {
  const s = String(input ?? "").trim();
  return s ? s : null;
}

function formatMoneyBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function formatMoney(value: number, currency?: string | null): string {
  const c = currency?.trim() || "BRL";
  try {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: c }).format(value);
  } catch {
    return formatMoneyBRL(value);
  }
}

function translateReservationStatus(value?: string | null): string {
  const v = (value ?? "").trim().toUpperCase();
  if (!v) return "—";
  if (v === "CONFIRMED") return "Confirmada";
  if (v === "PENDING") return "Pendente";
  if (v === "CANCELED" || v === "CANCELLED") return "Cancelada";
  if (v === "REJECTED") return "Rejeitada";
  return value as string;
}

function translatePaymentStatus(value?: string | null): string {
  const v = (value ?? "").trim().toUpperCase();
  if (!v) return "—";
  if (v === "PAID") return "Paga";
  if (v === "NOT_PAID") return "Não paga";
  return value as string;
}

function isPastDateOnly(value: unknown): boolean {
  const d = parseDateOnlyToLocalDate(value);
  if (!d) return false;
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return d.getTime() < startOfToday.getTime();
}

export function JourneyAccommodationDetailsModal({ isOpen, onClose, tripId, accommodationId }: Props) {
  const { data, error, isLoading } = useSWR<TripAccommodationDetailsResponse>(
    isOpen && tripId && accommodationId ? ["trip-accommodation-reservations", tripId, accommodationId] : null,
    () => TripsApiService.getTripAccommodationReservation(tripId, accommodationId),
    { revalidateOnFocus: false }
  );

  if (!isOpen) return null;

  const accommodation = data ?? null;
  const cover = imageUrl(accommodation?.coverImage) ?? PLACEHOLDER_IMAGE;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-56 md:h-72 bg-secondary-100">
          <Image src={cover} alt={accommodation?.name ?? "Hospedagem"} fill className="object-cover" sizes="(max-width: 768px) 100vw, 900px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Fechar"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-white">
            <h2 className="font-baloo text-2xl md:text-3xl font-bold leading-tight">
              {accommodation?.name ?? "Hospedagem"}
            </h2>
            <p className="font-comfortaa text-sm text-white/90 mt-1">
              {accommodation?.fullAddress ?? ""}
            </p>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 min-h-0">
          {isLoading ? (
            <div className="p-6 md:p-8 space-y-5 animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-16 rounded-xl bg-secondary-100" />
                <div className="h-16 rounded-xl bg-secondary-100" />
                <div className="h-16 rounded-xl bg-secondary-100" />
              </div>
              <div className="h-6 w-52 bg-secondary-100 rounded" />
              <div className="space-y-3">
                {[0, 1].map((i) => (
                  <div key={i} className="h-24 rounded-2xl bg-secondary-100" />
                ))}
              </div>
            </div>
          ) : error || !accommodation ? (
            <div className="p-6 md:p-8">
              <EmptyOrErrorState
                status="error"
                title="Não foi possível carregar os detalhes"
                description="Tente novamente em alguns instantes."
              />
            </div>
          ) : (
            <div className="p-6 md:p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-secondary-200 bg-secondary-50 p-4">
                  <p className="font-comfortaa text-xs text-secondary-500">Contato</p>
                  <p className="font-comfortaa text-sm text-secondary-900 font-semibold mt-1">
                    {labelOrDash(accommodation.phone ?? null)}
                  </p>
                </div>
                <div className="rounded-2xl border border-secondary-200 bg-secondary-50 p-4">
                  <p className="font-comfortaa text-xs text-secondary-500">Check-in</p>
                  <p className="font-comfortaa text-sm text-secondary-900 font-semibold mt-1">
                    {labelOrDash(formatShortDatePtBR(accommodation.checkInDate))}{" "}
                    {accommodation.checkInHour ? `· ${accommodation.checkInHour}` : ""}
                  </p>
                </div>
                <div className="rounded-2xl border border-secondary-200 bg-secondary-50 p-4">
                  <p className="font-comfortaa text-xs text-secondary-500">Check-out</p>
                  <p className="font-comfortaa text-sm text-secondary-900 font-semibold mt-1">
                    {labelOrDash(formatShortDatePtBR(accommodation.checkOutDate))}{" "}
                    {accommodation.checkOutHour ? `· ${accommodation.checkOutHour}` : ""}
                  </p>
                </div>
              </div>

              <section className="space-y-4">
                <h3 className="font-baloo text-xl md:text-2xl font-bold text-secondary-900">Quartos</h3>

                <div className="space-y-4">
                  {accommodation.rooms.map((r) => {
                    const roomCover = imageUrl(r.coverImage) ?? PLACEHOLDER_IMAGE;
                    const res = r.reservation ?? null;
                    const remarks = safeRemarksHtml(res?.remarks ?? null);
                    const cancellationPolicies = Array.isArray((r as any)?.cancellationPolicies)
                      ? ((r as any).cancellationPolicies as Array<{ amount: number; currency?: string | null; startDate: unknown }>)
                      : [];
                    const travelers = Array.isArray((r as any)?.travelers)
                      ? ((r as any).travelers as Array<{ name: string; age?: number | null; document?: string | null }>)
                      : [];
                    const propertyTaxes = Array.isArray((r as any)?.propertyTaxes)
                      ? ((r as any).propertyTaxes as Array<{ description?: string | null; amount: number; currency?: string | null }>)
                      : [];
                    return (
                      <div key={r.id} className="rounded-2xl border border-secondary-200 bg-white overflow-hidden">
                        {/* Top grid: image left, text right */}
                        <div className="md:grid" style={{ gridTemplateColumns: "35% 65%" }}>
                          <div className="relative w-full h-44 md:h-full bg-secondary-100">
                            <Image
                              src={roomCover}
                              alt={r.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 420px"
                            />
                          </div>
                          <div className="p-5 md:p-6 min-w-0">
                            <p className="font-baloo text-lg font-bold text-secondary-900">{r.name}</p>
                            {r.boardDescription ? (
                              <p className="font-comfortaa text-sm text-secondary-700 mt-1">{r.boardDescription}</p>
                            ) : null}
                            {r.description ? (
                              <div
                                className="prose prose-sm max-w-none text-secondary-700 mt-3 [&_*]:text-secondary-700 [&_img]:max-w-full [&_img]:h-auto"
                                dangerouslySetInnerHTML={{ __html: String(r.description) }}
                              />
                            ) : null}
                          </div>
                        </div>

                        {/* Details below */}
                        <div className="px-5 pb-6 md:px-6 md:pb-7 border-t border-secondary-100 pt-5 space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                            <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-3">
                              <p className="font-comfortaa text-[11px] text-secondary-500">Status da reserva</p>
                              <p className="font-comfortaa text-sm text-secondary-900 font-semibold mt-1">
                                {translateReservationStatus(res?.status ?? null)}
                              </p>
                            </div>
                            <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-3">
                              <p className="font-comfortaa text-[11px] text-secondary-500">Status do pagamento</p>
                              <p className="font-comfortaa text-sm text-secondary-900 font-semibold mt-1">
                                {translatePaymentStatus((res as any)?.paymentStatus ?? null)}
                              </p>
                            </div>
                            <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-3">
                              <p className="font-comfortaa text-[11px] text-secondary-500">Número da reserva</p>
                              <p className="font-comfortaa text-sm text-secondary-900 font-semibold mt-1">
                                {labelOrDash(res?.number ?? null)}
                              </p>
                            </div>
                            <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-3">
                              <p className="font-comfortaa text-[11px] text-secondary-500">
                                Número da reserva no fornecedor
                              </p>
                              <p className="font-comfortaa text-sm text-secondary-900 font-semibold mt-1">
                                {labelOrDash(res?.supplierId ?? null)}
                              </p>
                            </div>
                          </div>

                          {travelers.length > 0 ? (
                            <div>
                              <p className="font-comfortaa text-xs text-secondary-500">Viajantes</p>
                              <ul className="mt-2 space-y-1">
                                {travelers.map((t, idx) => (
                                  <li key={idx} className="font-comfortaa text-sm text-secondary-800">
                                    <span className="font-semibold text-secondary-900">{t.name}</span>
                                    {t.age != null ? ` · ${t.age} anos` : ""}
                                    {t.document ? ` · ${t.document}` : ""}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : null}

                          {propertyTaxes.length > 0 ? (
                            <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-4">
                              <p className="font-comfortaa text-xs text-secondary-500 mb-2">
                                Taxas a serem pagas na hospedagem
                              </p>
                              <ul className="space-y-1">
                                {propertyTaxes.map((t, idx) => (
                                  <li
                                    key={idx}
                                    className={`font-comfortaa text-sm text-secondary-800 flex gap-3 ${
                                      t.description?.trim() ? "justify-between" : "justify-end"
                                    }`}
                                  >
                                    {t.description?.trim() ? (
                                      <span className="min-w-0 text-left">{String(t.description).trim()}</span>
                                    ) : null}
                                    <span className="font-semibold tabular-nums text-secondary-900 shrink-0">
                                      {formatMoney(Number(t.amount ?? 0), t.currency)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : null}

                          {cancellationPolicies.length > 0 ? (
                            <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-4">
                              <p className="font-comfortaa text-xs text-secondary-500 mb-2">
                                Políticas de cancelamento
                              </p>
                              <ul className="space-y-2">
                                {cancellationPolicies.map((p, idx) => {
                                  const past = isPastDateOnly(p.startDate);
                                  const date = formatShortDatePtBR(p.startDate);
                                  const amountLabel = formatMoney(Number(p.amount ?? 0), p.currency ?? "BRL");
                                  return (
                                    <li key={idx} className="font-comfortaa text-sm text-secondary-800">
                                      {past ? (
                                        <div className="space-y-1">
                                          <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-secondary-100 text-secondary-700 border border-secondary-200">
                                            Não reembolsável
                                          </span>
                                          <p className="text-secondary-800">
                                            Multa de cancelamento:{" "}
                                            <span className="font-semibold tabular-nums text-secondary-900">
                                              {amountLabel}
                                            </span>
                                          </p>
                                        </div>
                                      ) : (
                                        <p>
                                          {date ? <span className="text-secondary-600">A partir de {date} · </span> : null}
                                          Multa de cancelamento:{" "}
                                          <span className="font-semibold tabular-nums text-secondary-900">
                                            {amountLabel}
                                          </span>
                                        </p>
                                      )}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ) : null}

                          {remarks ? (
                            <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-4">
                              <p className="font-comfortaa text-xs text-secondary-500 mb-2">Observações</p>
                              <div
                                className="prose prose-sm max-w-none text-secondary-700 [&_*]:text-secondary-700 [&_img]:max-w-full [&_img]:h-auto"
                                dangerouslySetInnerHTML={{ __html: remarks }}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

