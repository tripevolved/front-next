"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CruisesApiService } from "@/clients/cruises";
import type { CruiseShip } from "@/clients/cruises/cruiseships";

type CruiseShipCardProps = {
  shipName: string;
  onOpenDetails: () => void;
};

export default function CruiseShipCard({ shipName, onOpenDetails }: CruiseShipCardProps) {
  const [ship, setShip] = useState<CruiseShip | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shipName) return;
    setLoading(true);
    setError(null);
    CruisesApiService.getCruiseShip(shipName)
      .then((data) => {
        setShip(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cruise ship:", err);
        setError("Não foi possível carregar as informações do navio.");
        setLoading(false);
      });
  }, [shipName]);

  const formatYear = (value?: string | Date) => {
    if (!value) return null;
    const date = typeof value === "string" ? new Date(value) : value;
    return date.getFullYear();
  };

  if (!shipName) return null;
  if (loading) {
    return (
      <div className="flex gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50 animate-pulse">
        <div className="w-32 h-24 bg-gray-200 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }
  if (error || !ship) {
    return (
      <div className="p-4 border border-gray-200 rounded-lg bg-white">
        <p className="text-sm text-gray-500">{error || "Navio não encontrado."}</p>
      </div>
    );
  }

  const coverImageUrl = ship.coverImage?.url ?? "/assets/blank-image.png";

  return (
    <button
      type="button"
      onClick={onOpenDetails}
      className="w-full flex gap-4 items-stretch p-0 border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    >
      <div className="relative w-32 sm:w-40 flex-shrink-0 aspect-[4/3] bg-gray-100">
        <Image
          src={coverImageUrl}
          alt={ship.coverImage?.shortDescription ?? ship.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 128px, 160px"
        />
      </div>
      <div className="flex flex-col gap-1 py-3 pr-4 flex-1 min-w-0">
        <span className="font-bold text-primary-500 text-lg">{ship.name}</span>
        {ship.company && (
          <span className="text-sm text-gray-500">{ship.company}</span>
        )}
        {ship.description && (
          <span className="text-sm text-gray-600 line-clamp-2">{ship.description}</span>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-0 mt-1 text-xs text-gray-500">
          {ship.guests != null && <span>{ship.guests.toLocaleString("pt-BR")} passageiros</span>}
          {ship.crew != null && <span>{ship.crew.toLocaleString("pt-BR")} tripulantes</span>}
          {ship.builtAt != null && (
            <span>Construído em {formatYear(ship.builtAt)}</span>
          )}
          {ship.lastRefurbishedAt != null && (
            <span>Reformado em {formatYear(ship.lastRefurbishedAt)}</span>
          )}
        </div>
      </div>
    </button>
  );
}
