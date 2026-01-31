"use client";

import { useState, useEffect } from "react";
import { ImageGrid } from "../common/ImageGrid";
import { MuxVideoPlayer } from "@/components/MuxVideoPlayer";
import { CruisesApiService } from "@/clients/cruises";
import type { CruiseShipDetails } from "@/clients/cruises/cruiseships";

type CruiseShipDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  shipName: string | null;
};

export default function CruiseShipDetailsModal({
  isOpen,
  onClose,
  shipName,
}: CruiseShipDetailsModalProps) {
  const [details, setDetails] = useState<CruiseShipDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && shipName) {
      setLoading(true);
      setError(null);
      CruisesApiService.getCruiseShipDetails(shipName)
        .then((data) => {
          setDetails(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching cruise ship details:", err);
          setError("Não foi possível carregar os detalhes do navio.");
          setLoading(false);
        });
    } else if (!isOpen) {
      setDetails(null);
      setError(null);
    }
  }, [isOpen, shipName]);

  const formatYear = (value?: string | Date) => {
    if (!value) return null;
    const date = typeof value === "string" ? new Date(value) : value;
    return date.getFullYear();
  };

  if (!isOpen) return null;

  const imageItems = details?.images ?? [];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-xl py-8 px-3 max-w-5xl w-full relative max-h-[90vh] overflow-hidden flex flex-col">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600 z-10"
          aria-label="Fechar"
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
        <div className="flex flex-col gap-3 flex-1 overflow-y-auto pb-9">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
              <span className="ml-3 text-gray-600">Carregando detalhes do navio...</span>
            </div>
          )}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-500 font-comfortaa text-lg">{error}</p>
            </div>
          )}
          {!loading && !error && details && (
            <>
              {imageItems.length > 0 && (
                <div className="w-full mt-2">
                  <ImageGrid
                    images={imageItems}
                    title={details.name}
                  />
                </div>
              )}
              <div className="flex flex-col gap-1 px-2">
                <h1 className="font-bold text-primary-500 text-xl">{details.name}</h1>
                {details.company && (
                  <span className="text-gray-500">{details.company}</span>
                )}
                {details.description && (
                  <p className="text-gray-600 text-sm mt-2">{details.description}</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
                {details.guests != null && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <span className="text-sm text-gray-500 block">Passageiros</span>
                    <span className="font-semibold text-gray-900">
                      {details.guests.toLocaleString("pt-BR")}
                    </span>
                  </div>
                )}
                {details.crew != null && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <span className="text-sm text-gray-500 block">Tripulantes</span>
                    <span className="font-semibold text-gray-900">
                      {details.crew.toLocaleString("pt-BR")}
                    </span>
                  </div>
                )}
                {details.tonnage != null && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <span className="text-sm text-gray-500 block">Tonelagem</span>
                    <span className="font-semibold text-gray-900">
                      {details.tonnage.toLocaleString("pt-BR")}
                    </span>
                  </div>
                )}
                {details.numDecks != null && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <span className="text-sm text-gray-500 block">Decks</span>
                    <span className="font-semibold text-gray-900">{details.numDecks}</span>
                  </div>
                )}
                {details.builtAt != null && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <span className="text-sm text-gray-500 block">Construído</span>
                    <span className="font-semibold text-gray-900">
                      {formatYear(details.builtAt)}
                    </span>
                  </div>
                )}
                {details.lastRefurbishedAt != null && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <span className="text-sm text-gray-500 block">Última reforma</span>
                    <span className="font-semibold text-gray-900">
                      {formatYear(details.lastRefurbishedAt)}
                    </span>
                  </div>
                )}
              </div>
              {details.videos && details.videos.length > 0 && (
                <div className="flex flex-col gap-3 p-2">
                  <h2 className="font-bold text-lg">Vídeos</h2>
                  <div className="flex flex-col gap-4">
                    {details.videos.map((video, index) => (
                      <div key={index} className="w-full aspect-video max-h-96">
                        <MuxVideoPlayer
                          playbackId={video.url}
                          title={video.shortDescription}
                          autoplay={false}
                          loop={false}
                          isMuted={false}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {details.pdfs && details.pdfs.length > 0 && (
                <div className="flex flex-col gap-3 p-2">
                  <h2 className="font-bold text-lg">PDFs</h2>
                  <ul className="flex flex-col gap-2">
                    {details.pdfs.map((pdf, index) => (
                      <li key={index}>
                        <a
                          href={pdf.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-500 hover:underline text-sm"
                        >
                          {pdf.shortDescription || `Documento ${index + 1}`}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
