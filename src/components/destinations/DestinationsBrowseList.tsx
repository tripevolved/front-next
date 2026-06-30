"use client";

import { useCallback, useEffect, useState } from "react";

import DestinationCard from "@/components/destinations/DestinationCard";
import { DestinationsApiService } from "@/clients/destinations";
import type { Destination } from "@/clients/destinations/destinations";
import { SuggestDestinationForCuratorship } from "@/components/destinations/SuggestDestinationForCuratorship";
import { CircleLoader } from "@/components/common/CircleLoader";
import { EmptyOrErrorState } from "@/components/common/EmptyOrErrorState";

const PAGE_SIZE = 6;
const PLACEHOLDER_IMAGE = "/assets/blank-image.png";

function destinationImage(d: Destination): string {
  return d.coverImage?.url?.trim() || PLACEHOLDER_IMAGE;
}

type Props = {
  /** When set, shows a “suggestions” row above the main list (same contract as add-hospedagem). */
  relatedDestinationUniqueName?: string | null;
  onSelectDestination: (d: Destination) => void;
  /** Highlights the currently selected destination in the list. */
  selectedUniqueName?: string | null;
  /** Increment when the parent drawer opens so lists and pagination reset cleanly. */
  resetNonce?: number;
  /** Tighter layout for side drawer vs full page. */
  compact?: boolean;
};

export function DestinationsBrowseList({
  relatedDestinationUniqueName,
  onSelectDestination,
  selectedUniqueName = null,
  resetNonce = 0,
  compact = false,
}: Props) {
  const [relatedDestinations, setRelatedDestinations] = useState<Destination[] | null>(null);

  const [searchInput, setSearchInput] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [items, setItems] = useState<Destination[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [listLoading, setListLoading] = useState(true);
  const [listLoadingMore, setListLoadingMore] = useState(false);
  const [listError, setListError] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQuery(searchInput.trim()), 300);
    return () => window.clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    if (!relatedDestinationUniqueName) {
      setRelatedDestinations(null);
      return;
    }
    let cancelled = false;
    DestinationsApiService.getDestinations({
      profile: "all",
      relatedDestination: relatedDestinationUniqueName,
      page: 1,
      limit: 6,
      search: null,
    })
      .then((res) => {
        if (cancelled) return;
        const list = res?.destinations;
        setRelatedDestinations(Array.isArray(list) && list.length > 0 ? list : null);
      })
      .catch(() => {
        if (!cancelled) setRelatedDestinations(null);
      });
    return () => {
      cancelled = true;
    };
  }, [relatedDestinationUniqueName, resetNonce]);

  const apiSearch = debouncedQuery === "" ? null : debouncedQuery;

  useEffect(() => {
    let cancelled = false;
    setListLoading(true);
    setListError(false);
    setItems([]);
    setPage(1);
    DestinationsApiService.getDestinations({
      profile: "all",
      page: 1,
      limit: PAGE_SIZE,
      search: apiSearch,
    })
      .then((res) => {
        if (cancelled) return;
        setItems(res.destinations ?? []);
        setTotalPages(Math.max(1, res.totalPages ?? 1));
        setPage(1);
      })
      .catch(() => {
        if (!cancelled) {
          setListError(true);
          setItems([]);
        }
      })
      .finally(() => {
        if (!cancelled) setListLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [resetNonce, apiSearch]);

  const loadMore = useCallback(async () => {
    if (page >= totalPages || listLoadingMore || listLoading) return;
    setListLoadingMore(true);
    setListError(false);
    try {
      const nextPage = page + 1;
      const res = await DestinationsApiService.getDestinations({
        profile: "all",
        page: nextPage,
        limit: PAGE_SIZE,
        search: apiSearch,
      });
      setItems((prev) => {
        const seen = new Set(prev.map((d) => d.uniqueName));
        const add = (res.destinations ?? []).filter((d) => d.uniqueName && !seen.has(d.uniqueName));
        return [...prev, ...add];
      });
      setPage(nextPage);
      setTotalPages(Math.max(1, res.totalPages ?? totalPages));
    } catch {
      setListError(true);
    } finally {
      setListLoadingMore(false);
    }
  }, [page, totalPages, listLoadingMore, listLoading, apiSearch]);

  const showSuggestEmpty =
    Boolean(debouncedQuery) && !listLoading && !listError && items.length === 0;

  const padding = compact ? "p-4" : "p-5";
  const headingClass = compact
    ? "font-baloo text-base font-bold text-secondary-900"
    : "font-baloo text-lg font-bold text-secondary-900";

  return (
    <div className={`${padding} space-y-8`}>
      {relatedDestinations?.length ? (
        <section className="space-y-4">
          <h3 className={headingClass}>Nossas sugestões</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedDestinations.map((d) => (
              <DestinationCard
                key={d.uniqueName}
                title={d.name}
                image={destinationImage(d)}
                profile={d.travelerProfile ?? null}
                link="#"
                selected={selectedUniqueName === d.uniqueName}
                onClick={() => onSelectDestination(d)}
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-4">
        <h3 className={headingClass}>Destinos</h3>
        <div className="relative">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Buscar um destino..."
            className="w-full rounded-xl border border-secondary-200 px-4 py-3 font-comfortaa text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {listLoading ? (
          <div className="py-12 flex justify-center">
            <CircleLoader />
          </div>
        ) : listError ? (
          <EmptyOrErrorState
            status="error"
            title="Não foi possível carregar destinos"
            description="Tente novamente em alguns instantes."
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((d) => (
                <DestinationCard
                  key={d.uniqueName}
                  title={d.name}
                  image={destinationImage(d)}
                  profile={d.travelerProfile ?? null}
                  link="#"
                  selected={selectedUniqueName === d.uniqueName}
                  onClick={() => onSelectDestination(d)}
                />
              ))}
            </div>
            {showSuggestEmpty ? (
              <div className="space-y-4 pt-2">
                <p className="font-comfortaa text-sm text-secondary-600">Nenhum destino encontrado.</p>
                <SuggestDestinationForCuratorship
                  destinationQuery={debouncedQuery}
                  anonymousContactMode="inline"
                  compact
                />
              </div>
            ) : null}
            {page < totalPages && items.length > 0 ? (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => void loadMore()}
                  disabled={listLoadingMore}
                  className="inline-block font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {listLoadingMore ? "Carregando..." : "Carregar mais"}
                </button>
              </div>
            ) : null}
          </>
        )}
      </section>
    </div>
  );
}
