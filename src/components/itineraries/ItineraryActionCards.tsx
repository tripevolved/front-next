"use client";

import { useState } from "react";
import Image from "next/image";
import type { ItineraryItem } from "@/components/itineraries/ItineraryContent";
import type { Cruise } from "@/core/types/cruise";

export function AccommodationCard({
  accommodation,
  detailsHref,
  onOpenDetails,
}: {
  accommodation: ItineraryItem["accommodation"];
  /** Same-page link to journey accommodation details (e.g. #journey-accommodation-{id}) */
  detailsHref?: string;
  /** Opens read-only public details modal (compartilhar page) */
  onOpenDetails?: () => void;
}) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  if (!accommodation) return null;

  const hasDetailsLink = Boolean(detailsHref);
  const hasDetailsModal = Boolean(onOpenDetails);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-medium text-gray-900 mb-2">{accommodation.name}</h4>
          {(accommodation.tags?.some(Boolean) || accommodation.recommendedFor?.some(Boolean)) ? (
            <div className="mb-3 flex flex-wrap gap-2">
              {accommodation.tags?.filter(Boolean).map((tag) => (
                <span key={tag} className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full text-xs">
                  {tag}
                </span>
              ))}
              {accommodation.recommendedFor?.filter(Boolean).map((rec) => (
                <span key={rec} className="bg-accent-100 text-accent-700 px-2 py-0.5 rounded-full text-xs">
                  {rec}
                </span>
              ))}
            </div>
          ) : null}
          <div>
            <div
              className={`text-gray-600 text-sm prose prose-sm max-w-none prose-p:text-gray-600 prose-ul:text-gray-600 prose-ol:text-gray-600 prose-li:text-gray-600 prose-p:text-sm prose-li:text-sm break-words ${!isDescriptionExpanded ? "line-clamp-4" : ""}`}
              dangerouslySetInnerHTML={{ __html: accommodation.description }}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsDescriptionExpanded((prev) => !prev);
              }}
              className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              {isDescriptionExpanded ? "Ver menos" : "Ver mais"}
            </button>
          </div>
          {hasDetailsLink ? (
            <a
              href={detailsHref}
              className="mt-3 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
            >
              <span>Ver detalhes da hospedagem</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          ) : hasDetailsModal ? (
            <button
              type="button"
              onClick={onOpenDetails}
              className="mt-3 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
            >
              <span>Ver detalhes da hospedagem</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          ) : null}
        </div>
        <div className="w-full md:w-48 h-48 relative rounded-full overflow-hidden shrink-0">
          <Image src={accommodation.image} alt={accommodation.name} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}

export function CruiseExperienceCard({ experience }: { experience: ItineraryItem["experience"] }) {
  if (!experience) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-primary mb-4">Experiência</h3>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h4 className="text-lg font-medium text-gray-900 mb-2">{experience.name}</h4>
          <p className="text-gray-600">{experience.description}</p>
        </div>
        <div className="w-full md:w-48 h-48 relative rounded-full overflow-hidden">
          <Image src={experience.image} alt={experience.name} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}

export function CruiseCard({
  cruise,
  onOpenModal,
  readOnly = false,
}: {
  cruise: ItineraryItem["cruise"];
  onOpenModal?: (cruise: Cruise) => void;
  readOnly?: boolean;
}) {
  if (!cruise) return null;

  const interactive = !readOnly && Boolean(onOpenModal);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-primary mb-4">Cruzeiro</h3>
      <div
        className={`flex flex-col md:flex-row gap-6 ${interactive ? "cursor-pointer" : ""}`}
        onClick={interactive ? () => onOpenModal!(cruise) : undefined}
      >
        <div className="flex-1">
          <h4 className="text-lg font-medium text-gray-900 mb-2">{cruise.name}</h4>
          <p className="text-gray-600 mb-2">{cruise.description}</p>
          <p className="text-sm text-primary-600 font-medium">Duração: {cruise.duration}</p>
          {interactive ? (
            <div className="mt-3 flex items-center gap-2 text-primary-600 text-sm">
              <span>Clique para ver detalhes completos</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          ) : null}
        </div>
        <div className="w-full md:w-48 h-48 relative rounded-lg overflow-hidden">
          <Image src={cruise.images[0]} alt={cruise.name} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}
