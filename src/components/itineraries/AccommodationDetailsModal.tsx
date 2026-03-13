"use client";

import useSWR from "swr";
import { AccommodationsApiService } from "@/clients/accommodations";
import { AccommodationDetail } from "@/components/accommodation/AccommodationDetail";

interface AccommodationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accommodationUniqueName: string;
}

export function AccommodationDetailsModal({
  isOpen,
  onClose,
  accommodationUniqueName,
}: AccommodationDetailsModalProps) {
  const { data: accommodation, error, isLoading } = useSWR(
    isOpen && accommodationUniqueName
      ? `accommodation-${accommodationUniqueName}`
      : null,
    () => AccommodationsApiService.getAccommodationByUniqueName(accommodationUniqueName)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header with close button */}
        <div className="flex justify-end items-center p-4 border-b border-gray-200 shrink-0">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            aria-label="Fechar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 min-h-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600" />
              <p className="mt-4 text-secondary-600">Carregando hospedagem...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <p className="text-secondary-600 text-center">
                Não foi possível carregar as informações da hospedagem.
              </p>
            </div>
          ) : accommodation ? (
            <AccommodationDetail accommodation={accommodation} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
