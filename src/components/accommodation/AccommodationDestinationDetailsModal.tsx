"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import type { PublicAccommodation } from "@/core/types/accommodations";
import { AccommodationsApiService } from "@/clients/accommodations";
import { AccommodationDetail } from "./AccommodationDetail";

type AccommodationDestinationDetailsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  destinationUniqueName?: string;
};

export default function AccommodationDestinationDetailsModal({
  isOpen,
  handleClose,
  destinationUniqueName,
}: AccommodationDestinationDetailsModalProps) {
  const [accommodation, setAccommodation] = useState<PublicAccommodation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && destinationUniqueName) {
      setLoading(true);
      setError(null);

      AccommodationsApiService.getAccommodationByDestinationUniqueName(destinationUniqueName)
        .then((data) => {
          setAccommodation(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching destination accommodation details:", err);
          setError("Não foi possível carregar os detalhes da hospedagem.");
          setLoading(false);
        });
    } else if (!isOpen) {
      setAccommodation(null);
      setError(null);
    }
  }, [isOpen, destinationUniqueName]);

  if (!isOpen) return null;

  return (
    <div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-5xl w-full relative max-h-[90vh] overflow-hidden flex flex-col">
          <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
            {destinationUniqueName && accommodation && (
              <Link
                href={`/hospedagens/${accommodation.uniqueName}`}
                className="flex items-center gap-1.5 text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Abrir em página
              </Link>
            )}

            <button onClick={handleClose} className="text-secondary-400 hover:text-secondary-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-3 flex-1 overflow-y-auto py-12 px-4">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                <span className="ml-3 text-gray-600">Carregando detalhes da hospedagem...</span>
              </div>
            )}

            {error && (
              <div className="text-center py-8">
                <p className="text-red-500 font-comfortaa text-lg">{error}</p>
                <button
                  onClick={() => {
                    if (destinationUniqueName) {
                      setLoading(true);
                      setError(null);
                      AccommodationsApiService.getAccommodationByDestinationUniqueName(destinationUniqueName)
                        .then((data) => {
                          setAccommodation(data);
                          setLoading(false);
                        })
                        .catch((err) => {
                          console.error("Error fetching destination accommodation details:", err);
                          setError("Não foi possível carregar os detalhes da hospedagem.");
                          setLoading(false);
                        });
                    }
                  }}
                  className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {!loading && !error && accommodation && (
              <div className="mt-8">
                <AccommodationDetail accommodation={accommodation} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
