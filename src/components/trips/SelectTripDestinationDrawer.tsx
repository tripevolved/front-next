"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { DestinationsApiService } from "@/clients/destinations";
import type { Destination } from "@/clients/destinations/destinations";
import { SuggestDestinationForCuratorship } from "@/components/destinations/SuggestDestinationForCuratorship";
import { TripsApiService } from "@/clients/trips";
import type { PublicDestination } from "@/core/types/destination";

type View = "list" | "detail";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
  relatedDestinationUniqueName?: string | null;
};

function imageUrl(img?: { url: string } | null): string {
  const u = img?.url?.trim();
  return u ? u : "/assets/blank-image.png";
}

function DestinationThumbnailGrid({
  items,
  onPick,
}: {
  items: Destination[];
  onPick: (d: Destination) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((d) => (
        <button
          key={d.uniqueName}
          type="button"
          onClick={() => onPick(d)}
          className="group text-left rounded-xl border border-secondary-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative h-36 w-full bg-secondary-100">
            <Image
              src={imageUrl(d.coverImage)}
              alt={d.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
            <div className="absolute bottom-2 left-3 right-3">
              <p className="font-baloo text-lg font-bold text-white drop-shadow-sm line-clamp-2">{d.name}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export function SelectTripDestinationDrawer({
  isOpen,
  onClose,
  tripId,
  relatedDestinationUniqueName,
}: Props) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<View>("list");
  const [relatedDestinations, setRelatedDestinations] = useState<Destination[] | null>(null);
  const [browseDestinations, setBrowseDestinations] = useState<Destination[] | null>(null);
  const [browseLoading, setBrowseLoading] = useState(false);
  const [browseError, setBrowseError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Destination[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [listDestination, setListDestination] = useState<Destination | null>(null);
  const [detail, setDetail] = useState<PublicDestination | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const debouncedSearch = useMemo(() => search.trim(), [search]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setView("list");
    setListDestination(null);
    setDetail(null);
    setDetailError(null);
    setSubmitError(null);
    setSearch("");
    setSearchResults(null);
    setSearchLoading(false);
    setBrowseDestinations(null);
    setBrowseError(null);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setBrowseLoading(true);
    setBrowseError(null);
    setBrowseDestinations(null);
    DestinationsApiService.getDestinations({
      profile: "all",
      relatedDestination: "",
      search: "",
      page: 1,
      limit: 12,
      context: "PLATFORM",
    })
      .then((res) => {
        if (cancelled) return;
        const items = res?.destinations;
        setBrowseDestinations(Array.isArray(items) ? items : []);
      })
      .catch(() => {
        if (!cancelled) {
          setBrowseError("Não foi possível carregar os destinos.");
          setBrowseDestinations([]);
        }
      })
      .finally(() => {
        if (!cancelled) setBrowseLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    if (!relatedDestinationUniqueName?.trim()) {
      setRelatedDestinations(null);
      return;
    }

    let cancelled = false;
    DestinationsApiService.getDestinations({
      profile: "all",
      relatedDestination: relatedDestinationUniqueName.trim(),
      page: 1,
      limit: 12,
    })
      .then((res) => {
        if (cancelled) return;
        const items = res?.destinations;
        setRelatedDestinations(Array.isArray(items) && items.length > 0 ? items : null);
      })
      .catch(() => {
        if (!cancelled) setRelatedDestinations(null);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, relatedDestinationUniqueName]);

  useEffect(() => {
    if (!isOpen) return;
    const q = debouncedSearch;
    if (!q) {
      setSearchResults(null);
      setSearchLoading(false);
      return;
    }

    let cancelled = false;
    setSearchLoading(true);
    DestinationsApiService.getDestinations({
      profile: "all",
      page: 1,
      limit: 12,
      search: q,
    })
      .then((res) => {
        if (cancelled) return;
        const items = res?.destinations;
        setSearchResults(Array.isArray(items) && items.length > 0 ? items : null);
      })
      .catch(() => {
        if (!cancelled) setSearchResults(null);
      })
      .finally(() => {
        if (!cancelled) setSearchLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, debouncedSearch]);

  const openDetail = useCallback((d: Destination) => {
    setListDestination(d);
    setView("detail");
    setDetail(null);
    setDetailError(null);
    setSubmitError(null);
    setDetailLoading(true);
    DestinationsApiService.getDestinationByUniqueName(d.uniqueName)
      .then((pub) => {
        setDetail(pub);
      })
      .catch(() => {
        setDetailError("Não foi possível carregar os detalhes deste destino.");
      })
      .finally(() => {
        setDetailLoading(false);
      });
  }, []);

  const goBackToList = useCallback(() => {
    setView("list");
    setListDestination(null);
    setDetail(null);
    setDetailError(null);
    setSubmitError(null);
  }, []);

  const handleSelectDestination = useCallback(async () => {
    if (!listDestination?.destinationId) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await TripsApiService.setDestinationIdForTrip({
        tripId,
        tripDestination: { destinationId: listDestination.destinationId },
      });
      onClose();
      router.refresh();
    } catch {
      setSubmitError("Não foi possível salvar o destino. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }, [listDestination, onClose, router, tripId]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/50" onClick={onClose} />

      <aside className="fixed right-0 inset-y-0 z-10 flex h-full w-full flex-col bg-white shadow-2xl md:w-2/3">
        <header className="shrink-0 border-b border-secondary-200 p-5">
          <div className="grid grid-cols-[auto,1fr,auto] items-start gap-4">
            <div className="min-w-[96px]">
              {view === "detail" ? (
                <button
                  type="button"
                  onClick={goBackToList}
                  className="h-10 rounded-full border border-secondary-200 bg-white px-4 font-comfortaa text-sm font-semibold text-secondary-700 hover:bg-secondary-50 hover:text-secondary-900 transition-colors"
                >
                  {"< Voltar"}
                </button>
              ) : null}
            </div>

            <div className="min-w-0 text-center">
              <p className="font-comfortaa text-xs text-secondary-500">Sua viagem</p>
              <h2 className="font-baloo text-xl font-bold text-secondary-900 leading-tight">
                {view === "list" ? "Escolher destino" : listDestination?.name ?? "Detalhes"}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-secondary-200 text-secondary-700 hover:bg-secondary-50 transition-colors inline-flex items-center justify-center shrink-0"
              aria-label="Fechar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto">
          {view === "list" ? (
            <div className="p-5 space-y-8">
              <section className="space-y-4">
                <h3 className="font-baloo text-lg font-bold text-secondary-900">Buscar destino</h3>
                <div className="relative">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Digite um destino..."
                    className="w-full rounded-xl border border-secondary-200 px-4 py-3 font-comfortaa text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  {(debouncedSearch ? searchLoading : browseLoading) ? (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
                    </div>
                  ) : null}
                </div>

                {debouncedSearch ? (
                  searchLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="h-36 rounded-xl bg-secondary-100 animate-pulse" />
                      ))}
                    </div>
                  ) : searchResults && searchResults.length > 0 ? (
                    <DestinationThumbnailGrid items={searchResults} onPick={openDetail} />
                  ) : (
                    <div className="space-y-4">
                      <p className="font-comfortaa text-sm text-secondary-600">Nenhum destino encontrado.</p>
                      <SuggestDestinationForCuratorship
                        destinationQuery={debouncedSearch}
                        anonymousContactMode="inline"
                        compact
                      />
                    </div>
                  )
                ) : browseLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="h-36 rounded-xl bg-secondary-100 animate-pulse" />
                    ))}
                  </div>
                ) : browseError ? (
                  <p className="font-comfortaa text-sm text-red-700">{browseError}</p>
                ) : browseDestinations && browseDestinations.length > 0 ? (
                  <DestinationThumbnailGrid items={browseDestinations} onPick={openDetail} />
                ) : (
                  <p className="font-comfortaa text-sm text-secondary-600">
                    Nenhum destino disponível no momento. Tente buscar acima.
                  </p>
                )}
              </section>

              {relatedDestinations && relatedDestinations.length > 0 ? (
                <section className="space-y-4">
                  <h3 className="font-baloo text-lg font-bold text-secondary-900">Sugestões para você</h3>
                  <DestinationThumbnailGrid items={relatedDestinations} onPick={openDetail} />
                </section>
              ) : null}
            </div>
          ) : (
            <div className="p-5 space-y-5 pb-28">
              {detailLoading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-48 w-full rounded-xl bg-secondary-100" />
                  <div className="h-6 w-2/3 rounded bg-secondary-100" />
                  <div className="h-4 w-full rounded bg-secondary-100" />
                  <div className="h-4 w-5/6 rounded bg-secondary-100" />
                </div>
              ) : detailError ? (
                <div className="space-y-4">
                  <p className="font-comfortaa text-sm text-red-700">{detailError}</p>
                  <p className="font-comfortaa text-sm text-secondary-600">
                    Você ainda pode confirmar{" "}
                    <span className="font-semibold">{listDestination?.name ?? "este destino"}</span> como
                    destino da viagem.
                  </p>
                </div>
              ) : detail ? (
                <>
                  <div className="relative w-full h-52 rounded-xl overflow-hidden bg-secondary-100">
                    {detail.photos?.[0]?.url ? (
                      <Image
                        src={detail.photos[0].url}
                        alt={detail.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <Image src="/assets/blank-image.png" alt="" fill className="object-cover" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-baloo text-2xl font-bold text-secondary-900">{detail.title}</h3>
                    {detail.where ? (
                      <p className="mt-2 font-comfortaa text-sm text-secondary-600">{detail.where}</p>
                    ) : null}
                  </div>
                  {detail.travelerProfiles?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {detail.travelerProfiles.slice(0, 6).map((p) => (
                        <span
                          key={p}
                          className="inline-flex rounded-full bg-accent-500/15 px-3 py-1 text-xs font-semibold text-secondary-800"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {detail.features?.length ? (
                    <ul className="space-y-3">
                      {detail.features.slice(0, 2).map((f, i) => (
                        <li key={i} className="rounded-xl border border-secondary-100 bg-secondary-50/60 p-3">
                          <p className="font-baloo text-sm font-bold text-secondary-900">{f.title}</p>
                          {f.description ? (
                            <div
                              className="mt-1 font-comfortaa text-xs text-secondary-700 leading-relaxed prose prose-sm max-w-none overflow-hidden break-words [overflow-wrap:anywhere] [&_img]:max-w-full [&_img]:h-auto [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1"
                              dangerouslySetInnerHTML={{ __html: f.description }}
                            />
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </>
              ) : null}

              {submitError ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {submitError}
                </div>
              ) : null}
            </div>
          )}
        </div>

        {view === "detail" && listDestination && !detailLoading ? (
          <div className="shrink-0 border-t border-secondary-200 bg-white p-4">
            <button
              type="button"
              disabled={submitting}
              onClick={handleSelectDestination}
              className="w-full rounded-xl bg-accent-500 px-4 py-3 text-center text-sm font-semibold text-secondary-900 shadow-sm hover:bg-accent-600 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Salvando…" : "Selecionar este destino"}
            </button>
          </div>
        ) : null}
      </aside>
    </div>,
    document.body
  );
}
