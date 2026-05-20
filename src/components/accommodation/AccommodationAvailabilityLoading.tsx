"use client";

import { useEffect, useState } from "react";
import { CircleLoader } from "@/components/common/CircleLoader";

const ROTATION_CYCLE_MS = 25_000;

const LOADING_MESSAGES = [
  "Verificando disponibilidade para suas datas…",
  "Consultando tarifas e políticas de cancelamento…",
  "Buscando quartos disponíveis…",
  "Comparando opções de pensão e valores…",
  "Quase lá — finalizando sua busca…",
] as const;

export function AccommodationAvailabilityLoading() {
  const [messageIndex, setMessageIndex] = useState(0);
  const stepMs = ROTATION_CYCLE_MS / LOADING_MESSAGES.length;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, stepMs);
    return () => window.clearInterval(interval);
  }, [stepMs]);

  return (
    <div
      className="flex flex-col items-center justify-center gap-5 py-12 px-4"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <CircleLoader />
      <p className="text-gray-600 font-comfortaa text-sm md:text-base text-center max-w-md min-h-[3rem] transition-opacity duration-300">
        {LOADING_MESSAGES[messageIndex]}
      </p>
    </div>
  );
}
