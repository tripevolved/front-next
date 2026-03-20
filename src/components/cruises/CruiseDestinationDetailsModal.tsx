"use client";

import { useEffect, useState } from "react";

import type { CruiseDetails } from "@/clients/cruises/cruises";
import { CruisesApiService } from "@/clients/cruises";
import CruiseShipDetailsModal from "./CruiseShipDetailsModal";
import CruiseDetailsBody from "./CruiseDetailsBody";
import { WhatsAppDirectButton } from "../WhatsAppDirectButton";

type CruiseDestinationDetailsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  destinationUniqueName?: string;
};

export default function CruiseDestinationDetailsModal({
  isOpen,
  handleClose,
  destinationUniqueName,
}: CruiseDestinationDetailsModalProps) {
  const [cruiseDetails, setCruiseDetails] = useState<CruiseDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());
  const [isShipDetailsModalOpen, setIsShipDetailsModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen && destinationUniqueName) {
      setLoading(true);
      setError(null);

      CruisesApiService.getCruiseByDestinationUniqueName(destinationUniqueName)
        .then((data) => {
          setCruiseDetails(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching destination cruise details:", err);
          setError("Não foi possível carregar os detalhes do cruzeiro.");
          setLoading(false);
        });
    } else if (!isOpen) {
      // Reset state when modal closes
      setCruiseDetails(null);
      setError(null);
      setExpandedDescriptions(new Set());
    }
  }, [isOpen, destinationUniqueName]);

  const toggleDescription = (index: number) => {
    setExpandedDescriptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) newSet.delete(index);
      else newSet.add(index);
      return newSet;
    });
  };

  if (!isOpen) return null;

  return (
    <div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl py-8 px-3 max-w-5xl w-full relative max-h-[90vh] overflow-hidden flex flex-col">
          <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
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

          <div className="flex flex-col gap-3 flex-1 overflow-y-auto pb-9">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                <span className="ml-3 text-gray-600">Carregando detalhes do cruzeiro...</span>
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
                      CruisesApiService.getCruiseByDestinationUniqueName(destinationUniqueName)
                        .then((data) => {
                          setCruiseDetails(data);
                          setLoading(false);
                        })
                        .catch((err) => {
                          console.error("Error fetching destination cruise details:", err);
                          setError("Não foi possível carregar os detalhes do cruzeiro.");
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

            {!loading && !error && cruiseDetails && (
              <CruiseDetailsBody
                cruiseDetails={cruiseDetails}
                variant="modal"
                expandedDescriptions={expandedDescriptions}
                toggleDescription={toggleDescription}
                onOpenShipDetails={() => setIsShipDetailsModalOpen(true)}
              />
            )}
          </div>

          {!loading && !error && cruiseDetails && (
            <div className="absolute bottom-4 left-8 right-8 z-20 bg-gradient-to-t from-white via-white to-transparent pt-4">
              <WhatsAppDirectButton
                message={`Olá! Gostaria de falar sobre o cruzeiro ${cruiseDetails.title || "selecionado"}.`}
                variant="primary"
                className="w-full py-3 px-6"
              >
                Falar com meu especialista
              </WhatsAppDirectButton>
            </div>
          )}
        </div>

        <CruiseShipDetailsModal
          isOpen={isShipDetailsModalOpen}
          onClose={() => setIsShipDetailsModalOpen(false)}
          shipName={cruiseDetails?.ship ?? null}
        />
      </div>
    </div>
  );
}

