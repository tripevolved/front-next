"use client";

import Image from "next/image";
import { useState } from "react";

import { ImageGrid } from "@/components/common/ImageGrid";
import { EmptyOrErrorState } from "@/components/common/EmptyOrErrorState";
import { AccommodationHighlightsSection } from "@/components/accommodation/AccommodationHighlightsSection";
import { AccommodationAmenitiesGrid } from "@/components/accommodation/AccommodationAmenitiesGrid";
import type { PublicAccommodation } from "@/core/types/accommodations";

const PROSE_CONTAINED =
  "prose prose-lg max-w-none text-gray-700 overflow-hidden break-words [overflow-wrap:anywhere] [&_img]:max-w-full [&_img]:h-auto [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_iframe]:max-w-full";

export type AccommodationDrawerDetailPanelProps = {
  accommodation: PublicAccommodation | null;
  loading: boolean;
  error: boolean;
  /** Shown when detail failed to load but we still know the title (e.g. from availability list). */
  fallbackTitle?: string | null;
};

export function AccommodationDrawerDetailPanel({
  accommodation,
  loading,
  error,
  fallbackTitle,
}: AccommodationDrawerDetailPanelProps) {
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white overflow-hidden animate-pulse shadow-sm">
        <div className="h-44 bg-secondary-100" />
        <div className="p-5 space-y-3">
          <div className="h-6 w-2/3 bg-secondary-100 rounded" />
          <div className="h-4 w-5/6 bg-secondary-100 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <EmptyOrErrorState
        status="error"
        title="Não foi possível carregar a hospedagem"
        description="Tente novamente em alguns instantes."
      />
    );
  }

  if (accommodation) {
    return (
      <div className="space-y-6">
        <div className="overflow-hidden">
          {accommodation.images?.length ? (
            <ImageGrid
              edgeToEdge
              images={accommodation.images.map((img) => ({
                url: img.url,
                shortDescription: img.shortDescription,
              }))}
              title={accommodation.title}
            />
          ) : null}
          <div className="p-5 md:p-6 space-y-6">
            <div className="min-w-0">
              <p className="font-baloo text-2xl font-bold text-secondary-900">{accommodation.title}</p>
              {accommodation.subtitle ? (
                <p className="font-comfortaa text-sm text-secondary-600 mt-1">{accommodation.subtitle}</p>
              ) : null}
              {accommodation.location?.address ? (
                <p className="font-comfortaa text-xs text-secondary-500 mt-1 italic">{accommodation.location.address}</p>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              {(accommodation.tags ?? []).slice(0, 6).map((t, i) => (
                <span key={`tag:${i}`} className="bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {t}
                </span>
              ))}
              {(accommodation.recommendedFor ?? []).slice(0, 6).map((t, i) => (
                <span key={`rec:${i}`} className="bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {t}
                </span>
              ))}
            </div>

            <section className="min-w-0">
              <h3 className="font-baloo text-lg font-bold text-secondary-900 mb-3">Descrição</h3>
              <div
                className={`${PROSE_CONTAINED} text-secondary-700 ${
                  descriptionExpanded ? "" : "max-h-[40vh] overflow-hidden"
                }`}
                dangerouslySetInnerHTML={{ __html: accommodation.description }}
              />
              <button
                type="button"
                onClick={() => setDescriptionExpanded((v) => !v)}
                className="mt-3 text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                {descriptionExpanded ? "Ver menos" : "Ver mais"}
              </button>
            </section>

            {accommodation.amenities?.length ? (
              <section className="min-w-0">
                <h3 className="font-baloo text-lg font-bold text-secondary-900 mb-3">Comodidades</h3>
                <AccommodationAmenitiesGrid amenities={accommodation.amenities} />
              </section>
            ) : null}
          </div>
        </div>

        {accommodation.highlights?.length ? (
          <AccommodationHighlightsSection
            title={accommodation.title}
            highlights={accommodation.highlights}
            fullWidth
            bleedToParentPadding
          />
        ) : null}
      </div>
    );
  }

  if (fallbackTitle) {
    return (
      <div className="min-w-0 px-5 pt-2">
        <p className="font-comfortaa text-xs text-secondary-500">Hospedagem</p>
        <p className="font-baloo text-lg font-bold text-secondary-900 truncate">{fallbackTitle}</p>
      </div>
    );
  }

  return null;
}
