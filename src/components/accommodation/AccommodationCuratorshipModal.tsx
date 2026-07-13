"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import { AccommodationsApiService } from "@/clients/accommodations";
import type { AccommodationCuratorship } from "@/clients/accommodations";
import { AccommodationMustKnowsSection } from "@/components/accommodation/AccommodationMustKnowsSection";
import { getFeatureIcon } from "@/components/accommodation/icons/features/featureIconMap";
import { CircleLoader } from "@/components/common/CircleLoader";
import Button from "@/components/common/Button";

type Props = {
  isOpen: boolean;
  uniqueName: string | null;
  onClose: () => void;
  onContratar: () => void;
};

function CuratorshipQuote({ phrase }: { phrase: string }) {
  return (
    <blockquote className="border-l-4 border-accent-500 bg-secondary-50 px-4 py-3 rounded-r-xl">
      <p className="font-comfortaa text-sm md:text-base text-secondary-800 leading-relaxed italic">
        &ldquo;{phrase}&rdquo;
      </p>
    </blockquote>
  );
}

function CompactHighlights({
  title,
  highlights,
}: {
  title: string;
  highlights: AccommodationCuratorship["highlights"];
}) {
  if (!highlights?.length) return null;

  return (
    <section>
      <h3 className="font-baloo text-lg font-bold text-secondary-900 mb-4">
        Por que escolher o {title}?
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {highlights.map((highlight, index) => {
          const FeatureIcon = getFeatureIcon(highlight.icon);
          return (
            <div
              key={`${highlight.title}:${index}`}
              className="relative overflow-hidden rounded-xl bg-secondary-100 aspect-[3/4]"
            >
              {highlight.imageUrl ? (
                <Image
                  src={highlight.imageUrl}
                  alt={highlight.title}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-accent-100" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-primary-600 shadow">
                <FeatureIcon className="h-3.5 w-3.5" />
              </div>
              <p className="absolute bottom-0 left-0 right-0 p-2 font-baloo text-xs font-bold text-white leading-snug">
                {highlight.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function AccommodationCuratorshipModal({
  isOpen,
  uniqueName,
  onClose,
  onContratar,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<AccommodationCuratorship | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !uniqueName) {
      setData(null);
      setLoading(false);
      setError(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(false);
    AccommodationsApiService.getAccommodationCuratorship(uniqueName)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        if (!cancelled) {
          setData(null);
          setError(true);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, uniqueName]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="accommodation-curatorship-title"
        className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="shrink-0 border-b border-secondary-200 px-5 py-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-comfortaa text-xs text-secondary-500">Curadoria</p>
            <h2
              id="accommodation-curatorship-title"
              className="font-baloo text-xl font-bold text-secondary-900 leading-tight"
            >
              {data?.title ?? (loading ? "Carregando..." : "Hospedagem")}
            </h2>
            {data?.subtitle ? (
              <p className="font-comfortaa text-sm text-secondary-600 mt-1">{data.subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-secondary-200 text-secondary-700 hover:bg-secondary-50 inline-flex items-center justify-center shrink-0"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-5 space-y-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <CircleLoader />
            </div>
          ) : error || !data ? (
            <p className="font-comfortaa text-sm text-secondary-600 text-center py-8">
              Não foi possível carregar a curadoria desta hospedagem.
            </p>
          ) : (
            <>
              {data.curatorshipPhrase ? <CuratorshipQuote phrase={data.curatorshipPhrase} /> : null}
              <CompactHighlights title={data.title} highlights={data.highlights} />
              <AccommodationMustKnowsSection
                mustKnows={data.mustKnows ?? []}
                title="Antes de escolher"
              />
            </>
          )}
        </div>

        <footer className="shrink-0 border-t border-secondary-200 px-5 py-4">
          <Button
            onClick={onContratar}
            className="w-full font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
          >
            Contratar o Círculo Evolved
          </Button>
        </footer>
      </div>
    </div>,
    document.body
  );
}
