"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CruiseLeadModal from "../consultancy/CruiseLeadModal";
import CruiseShipDetailsModal from "./CruiseShipDetailsModal";
import { CruisesApiService } from "@/clients/cruises";
import type { CruiseDetails } from "@/clients/cruises/cruises";
import CruiseDetailsBody from "./CruiseDetailsBody";

type CruiseDetailPageProps = {
  uniqueName: string;
};

export default function CruiseDetailPage({ uniqueName }: CruiseDetailPageProps) {
  const router = useRouter();
  const [cruiseDetails, setCruiseDetails] = useState<CruiseDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [leadModalText, setLeadModalText] = useState("Reservar");
  const [isShipDetailsModalOpen, setIsShipDetailsModalOpen] = useState(false);
  const thankYouText = "Obrigado! Vamos entrar em contato para planejar sua jornada.";

  useEffect(() => {
    if (uniqueName) {
      setLoading(true);
      setError(null);
      CruisesApiService.getCruiseByUniqueName(uniqueName)
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
  }, [uniqueName]);

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

  const calculateDuration = (departureDate: Date, arrivalDate: Date): string => {
    const depDate = typeof departureDate === "string" ? new Date(departureDate) : departureDate;
    const arrDate = typeof arrivalDate === "string" ? new Date(arrivalDate) : arrivalDate;
    const diffTime = Math.abs(arrDate.getTime() - depDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} ${diffDays === 1 ? "dia" : "dias"}`;
  };

  const getSearchData = () => {
    if (!cruiseDetails) {
      return {
        month: "",
        duration: "",
        cruiseName: "",
      };
    }

    const depDate =
      typeof cruiseDetails.departureDate === "string"
        ? new Date(cruiseDetails.departureDate)
        : cruiseDetails.departureDate;
    const month = depDate.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
    const duration = calculateDuration(cruiseDetails.departureDate, cruiseDetails.arrivalDate);

    return {
      month: month || "",
      duration: duration || "",
      cruiseName: cruiseDetails.title || "",
    };
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white max-w-5xl mx-auto py-8 px-4 md:px-6 relative">
        <Link
          href="/cruzeiros-extraordinarios"
          className="inline-flex items-center gap-2 text-secondary-400 hover:text-secondary-600 mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar para cruzeiros extraordinários
        </Link>

        <div className="flex flex-col gap-3 pb-24">
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
                  setLoading(true);
                  setError(null);
                  CruisesApiService.getCruiseByUniqueName(uniqueName)
                    .then((data) => {
                      setCruiseDetails(data);
                      setLoading(false);
                    })
                    .catch((err) => {
                      console.error("Error fetching cruise details:", err);
                      setError("Não foi possível carregar os detalhes do cruzeiro.");
                      setLoading(false);
                    });
                }}
                className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {!loading && !error && cruiseDetails && (
            <>
              <CruiseDetailsBody
                cruiseDetails={cruiseDetails}
                variant="page"
                expandedDescriptions={expandedDescriptions}
                toggleDescription={toggleDescription}
                onOpenShipDetails={() => setIsShipDetailsModalOpen(true)}
              />
            </>
          )}
        </div>

        {!loading && !error && cruiseDetails && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 px-4 md:px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="max-w-5xl mx-auto">
              <button
                onClick={() => setIsLeadModalOpen(true)}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
                disabled={leadModalText === thankYouText}
              >
                {leadModalText}
              </button>
            </div>
          </div>
        )}
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
