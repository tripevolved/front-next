"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CruiseLeadModal from "../consultancy/CruiseLeadModal";
import CruiseShipDetailsModal from "./CruiseShipDetailsModal";
import { CruisesApiService } from "@/clients/cruises";
import type { CruiseDetails } from "@/clients/cruises/cruises";
import CruiseDetailsBody from "./CruiseDetailsBody";

type CruiseDetailsModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  uniqueName?: string;
  startDate?: string;
  endDate?: string;
};

export default function CruiseDetailsModal({
  isOpen,
  handleClose,
  uniqueName,
  startDate,
  endDate,
}: CruiseDetailsModalProps) {
  const router = useRouter();
  const [cruiseDetails, setCruiseDetails] = useState<CruiseDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalText, setLeadModalText] = useState('Reservar');
  const [isShipDetailsModalOpen, setIsShipDetailsModalOpen] = useState(false);
  const thankYouText = 'Obrigado! Vamos entrar em contato para planejar sua jornada.';

  useEffect(() => {
    if (isOpen && uniqueName) {
      setLoading(true);
      setError(null);
      CruisesApiService.getCruiseByUniqueName(uniqueName, { startDate, endDate })
        .then((data) => {
          setCruiseDetails(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching cruise details:", err);
          setError("Não foi possível carregar os detalhes do cruzeiro.");
          setLoading(false);
        });
    } else if (!isOpen) {
      // Reset state when modal closes
      setCruiseDetails(null);
      setError(null);
      setExpandedDescriptions(new Set());
    }
  }, [isOpen, uniqueName, startDate, endDate]);

  const toggleDescription = (index: number) => {
    setExpandedDescriptions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Calculate duration in days
  const calculateDuration = (departureDate: Date, arrivalDate: Date): string => {
    const depDate = typeof departureDate === 'string' ? new Date(departureDate) : departureDate;
    const arrDate = typeof arrivalDate === 'string' ? new Date(arrivalDate) : arrivalDate;
    const diffTime = Math.abs(arrDate.getTime() - depDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} ${diffDays === 1 ? 'dia' : 'dias'}`;
  };

  // Get search data from cruise details
  const getSearchData = () => {
    if (!cruiseDetails) {
      return {
        month: '',
        duration: '',
        cruiseName: ''
      };
    }

    // Get month from departure date
    const depDate = typeof cruiseDetails.departureDate === 'string' 
      ? new Date(cruiseDetails.departureDate) 
      : cruiseDetails.departureDate;
    const month = depDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

    // Calculate duration
    const duration = calculateDuration(cruiseDetails.departureDate, cruiseDetails.arrivalDate);

    return {
      month: month || '',
      duration: duration || '',
      cruiseName: cruiseDetails.title || ''
    };
  };

  const pageHref = (() => {
    if (!uniqueName) return "#";
    const params = new URLSearchParams();
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    const query = params.toString();
    return `/cruzeiros-extraordinarios/${uniqueName}${query ? `?${query}` : ""}`;
  })();

  if (!isOpen) return null;

  return (
    <div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl py-8 px-3 max-w-5xl w-full relative max-h-[90vh] overflow-hidden flex flex-col">
          <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
            {uniqueName && (
              <Link
                href={pageHref}
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
            <button
              onClick={handleClose}
              className="text-secondary-400 hover:text-secondary-600"
            >
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
                    if (uniqueName) {
                      setLoading(true);
                      setError(null);
                      CruisesApiService.getCruiseByUniqueName(uniqueName, { startDate, endDate })
                        .then((data) => {
                          setCruiseDetails(data);
                          setLoading(false);
                        })
                        .catch((err) => {
                          console.error("Error fetching cruise details:", err);
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
              <button
                onClick={() => setIsLeadModalOpen(true)}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
                disabled={leadModalText === thankYouText}
              >
                {leadModalText}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <CruiseLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => {
          setIsLeadModalOpen(false);
          setLeadModalText(thankYouText);
          router.push("/obrigado");
        }}
        onBack={() => setIsLeadModalOpen(false)}
        searchData={getSearchData()}
      />
      <CruiseShipDetailsModal
        isOpen={isShipDetailsModalOpen}
        onClose={() => setIsShipDetailsModalOpen(false)}
        shipName={cruiseDetails?.ship ?? null}
      />
    </div>
  );
}
