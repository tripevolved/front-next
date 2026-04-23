"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type CheckoutAccommodationConditionsStatus = "idle" | "loading" | "ok" | "fail";

type Ctx = {
  statusByTripAccommodationId: Record<string, CheckoutAccommodationConditionsStatus>;
  setStatus: (tripAccommodationId: string, status: CheckoutAccommodationConditionsStatus) => void;
  reset: () => void;
};

const CheckoutConditionsContext = createContext<Ctx | null>(null);

export function CheckoutConditionsProvider({ children }: { children: React.ReactNode }) {
  const [statusByTripAccommodationId, setStatusByTripAccommodationId] = useState<
    Record<string, CheckoutAccommodationConditionsStatus>
  >({});

  const setStatus = useCallback((tripAccommodationId: string, status: CheckoutAccommodationConditionsStatus) => {
    setStatusByTripAccommodationId((prev) => {
      if (prev[tripAccommodationId] === status) return prev;
      return { ...prev, [tripAccommodationId]: status };
    });
  }, []);

  const reset = useCallback(() => setStatusByTripAccommodationId({}), []);

  const value = useMemo(() => ({ statusByTripAccommodationId, setStatus, reset }), [statusByTripAccommodationId, setStatus, reset]);

  return <CheckoutConditionsContext.Provider value={value}>{children}</CheckoutConditionsContext.Provider>;
}

export function useCheckoutConditions() {
  const ctx = useContext(CheckoutConditionsContext);
  if (!ctx) {
    throw new Error("useCheckoutConditions must be used within CheckoutConditionsProvider");
  }
  return ctx;
}

