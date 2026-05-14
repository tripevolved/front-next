"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { TripsApiService } from "@/clients/trips";
import type { TripConfiguration } from "@/core/types/trip";
import { TravelerType } from "@/core/types/trip";
import { parseDateOnlyToLocalDate } from "@/utils/helpers/dates.helpers";
import { StepDates } from "@/components/trip-planning/StepDates";
import { StepType } from "@/components/trip-planning/StepType";
import { StepBudget, type TripBudgetPayload } from "@/components/trip-planning/StepBudget";
import type { TripDates } from "@/components/trip-planning/types";
import type { TripType } from "@/components/trip-planning/types";
import { WhatsAppDirectButton } from "@/components/WhatsAppDirectButton";

const SUPPORT_WHATSAPP_MESSAGE =
  "Olá! Preciso de ajuda para alterar a configuração da minha viagem no app. A edição automática não está disponível no momento.";

function toIsoDate(value: Date | string | undefined | null): string | null {
  if (value == null) return null;
  let d: Date | null = null;
  if (typeof value === "string") {
    d = parseDateOnlyToLocalDate(value);
    if (!d) {
      const x = new Date(value);
      d = Number.isNaN(x.getTime()) ? null : x;
    }
  } else if (value instanceof Date) {
    d = value;
  }
  if (!d || Number.isNaN(d.getTime())) return null;
  return format(d, "yyyy-MM-dd");
}

function inclusiveDaysFromRange(startIso: string, endIso: string): number {
  const a = parseDateOnlyToLocalDate(startIso);
  const b = parseDateOnlyToLocalDate(endIso);
  if (!a || !b) return 12;
  const ms = Math.max(0, b.getTime() - a.getTime());
  return Math.max(1, Math.floor(ms / (86400000)) + 1);
}

type Step = 1 | 2 | 3;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
  configuration: TripConfiguration;
};

export function EditTripConfigurationDrawer({ isOpen, onClose, tripId, configuration }: Props) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [dates, setDates] = useState<TripDates | null>(null);
  const [tripType, setTripType] = useState<TripType | null>(null);
  const [saving, setSaving] = useState(false);
  const [fatalError, setFatalError] = useState(false);

  const initialDates = useMemo(() => {
    const start = toIsoDate(configuration.startDate);
    const end = toIsoDate(configuration.endDate);
    if (!start || !end) return undefined;
    return {
      startDate: start,
      endDate: end,
      maxDays: inclusiveDaysFromRange(start, end),
    };
  }, [configuration.startDate, configuration.endDate]);

  const initialType = configuration.travelerType ?? TravelerType.COUPLE;

  const step1Initial = useMemo(() => {
    if (dates?.startDate && dates?.endDate) {
      return {
        startDate: dates.startDate,
        endDate: dates.endDate,
        maxDays: dates.maxDays ?? inclusiveDaysFromRange(dates.startDate, dates.endDate),
      };
    }
    return initialDates;
  }, [dates, initialDates]);

  const step2InitialType = tripType?.type ?? initialType;

  const initialBudget = useMemo<TripBudgetPayload>(
    () => ({
      maxBudget: Math.max(3000, configuration.budget ?? 25000),
      isFlexible: configuration.hasFlexibleBudget ?? true,
    }),
    [configuration.budget, configuration.hasFlexibleBudget]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setDates(null);
    setTripType(null);
    setFatalError(false);
  }, [isOpen]);

  const goBack = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

  const performSave = useCallback(
    async (budgetPayload: TripBudgetPayload) => {
      const d = dates;
      const tt = tripType;
      if (!d?.startDate || !d?.endDate || !tt) return;
      setSaving(true);
      setFatalError(false);
      try {
        await TripsApiService.putTripConfiguration(tripId, {
          startDate: d.startDate,
          endDate: d.endDate,
          budget: budgetPayload.maxBudget,
          hasFlexibleBudget: budgetPayload.isFlexible,
          travelerType: tt.type,
        });
        onClose();
        router.refresh();
      } catch {
        setFatalError(true);
      } finally {
        setSaving(false);
      }
    },
    [dates, onClose, router, tripId, tripType]
  );

  if (!isOpen || !mounted) return null;

  const stepTitles: Record<Step, string> = {
    1: "Datas da viagem",
    2: "Com quem você viaja",
    3: "Orçamento",
  };

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Same shell as AddAccommodationDrawer: full-width panel on mobile, md:w-2/3 flush right (no max-w cap). */}
      <aside className="fixed right-0 inset-y-0 z-10 flex h-full w-full flex-col bg-white shadow-2xl md:w-2/3">
        {saving ? (
          <div className="absolute inset-0 z-[71] bg-white/70 flex items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
          </div>
        ) : null}

        <header className="shrink-0 border-b border-secondary-200 p-5">
          <div className="grid grid-cols-[auto,1fr,auto] items-start gap-4">
            <div className="min-w-[96px]">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="h-10 rounded-full border border-secondary-200 bg-white px-4 font-comfortaa text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
                >
                  {"< Voltar"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="h-10 rounded-full border border-secondary-200 bg-white px-4 font-comfortaa text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
                >
                  Fechar
                </button>
              )}
            </div>
            <div className="min-w-0 text-center">
              <p className="font-comfortaa text-xs text-secondary-500">Editar viagem</p>
              <h2 className="font-baloo text-xl font-bold text-secondary-900 leading-tight">{stepTitles[step]}</h2>
              <p className="font-comfortaa text-xs text-secondary-500 mt-1">Passo {step} de 3</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-secondary-200 text-secondary-700 hover:bg-secondary-50 inline-flex items-center justify-center shrink-0"
              aria-label="Fechar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-4 h-2 bg-secondary-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-500 rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto">
          {fatalError ? (
            <div className="p-6 space-y-4">
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-amber-950">
                <p className="font-baloo text-lg font-semibold text-amber-900">Edição indisponível</p>
                <p className="mt-2 font-comfortaa text-sm leading-relaxed text-amber-900/90">
                  Não foi possível salvar as alterações neste momento. Entre em contato com o nosso suporte pelo
                  WhatsApp e vamos te ajudar.
                </p>
              </div>
              <WhatsAppDirectButton
                message={SUPPORT_WHATSAPP_MESSAGE}
                variant="primary"
                className="w-full justify-center"
              >
                Falar com o suporte
              </WhatsAppDirectButton>
              <button
                type="button"
                onClick={() => {
                  setFatalError(false);
                  setStep(3);
                }}
                className="w-full rounded-xl border border-secondary-200 py-2.5 font-comfortaa text-sm font-semibold text-secondary-800 hover:bg-secondary-50"
              >
                Voltar ao orçamento
              </button>
            </div>
          ) : step === 1 ? (
            <StepDates
              title="Quando você pretende viajar?"
              description="Selecione a janela de datas em que você pode viajar e a duração desejada para a sua viagem."
              initial={step1Initial}
              allowPastDates
              onNext={(d) => {
                setDates(d);
                setStep(2);
              }}
              onBack={onClose}
            />
          ) : step === 2 ? (
            <StepType
              initialType={step2InitialType}
              onNext={(t) => {
                setTripType(t);
                setStep(3);
              }}
              onBack={goBack}
              buttonText="Próximo"
            />
          ) : (
            <StepBudget
              initial={initialBudget}
              onNext={(b) => {
                void performSave(b);
              }}
              onBack={goBack}
            />
          )}
        </div>
      </aside>
    </div>,
    document.body
  );
}
