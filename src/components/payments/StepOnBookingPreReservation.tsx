"use client";

import { useEffect, useRef, useState } from "react";
import { TripsApiService } from "@/clients/trips";
import { CircleLoader } from "@/components/common/CircleLoader";

const preReservationRuns = new Map<string, Promise<void>>();

type Props = {
  tripId: string;
  accommodationIds: string[];
  onComplete: () => void;
  onBack?: () => void;
};

/**
 * Automatic pre-reservation: POST /trips/{tripId}/accommodations/{tripAccommodationId}/bookings (no body).
 */
export function StepOnBookingPreReservation({ tripId, accommodationIds, onComplete, onBack }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const idsKey = accommodationIds.join(",");
  const preReservationKey = `${tripId}:${idsKey}`;

  useEffect(() => {
    let cancelled = false;
    setError(null);

    const run = async () => {
      if (accommodationIds.length === 0) {
        if (!cancelled) onCompleteRef.current();
        return;
      }

      // StrictMode-safe guardrail: share one in-flight run per key (no duplicate POST),
      // but still allow every mount to observe completion and advance the step.
      let promise = preReservationRuns.get(preReservationKey);
      if (!promise) {
        promise = (async () => {
          for (const tripAccommodationId of accommodationIds) {
            await TripsApiService.postTripAccommodationBookings(tripId, tripAccommodationId);
          }
        })();
        preReservationRuns.set(preReservationKey, promise);
      }

      try {
        await promise;
        if (!cancelled) onCompleteRef.current();
      } catch (e) {
        if (cancelled) return;
        preReservationRuns.delete(preReservationKey);
        setError(e instanceof Error ? e.message : "Não foi possível concluir a pré-reserva.");
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [tripId, idsKey, retryKey, preReservationKey]);

  return (
    <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm">
      <h2 className="font-baloo text-xl font-bold text-secondary-900">Pré-reserva</h2>
      {!error ? (
        <div className="mt-6 flex flex-col items-center gap-4 py-4">
          <CircleLoader className="h-16 w-16" />
          <p className="font-comfortaa text-center text-secondary-700">
            Estamos confirmando a pré-reserva. Aguarde um instante…
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-comfortaa text-sm text-red-800">
            {error}
          </div>
          <div className="flex flex-wrap gap-3">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="font-comfortaa px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors border border-secondary-200"
              >
                Voltar
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => {
                preReservationRuns.delete(preReservationKey);
                setRetryKey((k) => k + 1);
              }}
              className="font-baloo bg-accent-500 text-secondary-900 px-6 py-2 rounded-full font-semibold hover:bg-accent-600 transition-all"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
