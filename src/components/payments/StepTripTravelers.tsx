"use client";

import { useMemo, useState } from "react";
import type { TripConfigurationRoom } from "@/core/types/trip";
import type { TripTravelerInput } from "@/clients/trips/travelers";
import { MaskedCpfInput } from "@/components/common/MaskedCpfInput";

function normalizeCpf(value: string): string {
  return (value ?? "").replace(/\D/g, "").slice(0, 11);
}

function maskBrDate(value: string): string {
  const digits = (value ?? "").replace(/\D/g, "").slice(0, 8);
  const dd = digits.slice(0, 2);
  const mm = digits.slice(2, 4);
  const yyyy = digits.slice(4, 8);
  if (digits.length <= 2) return dd;
  if (digits.length <= 4) return `${dd}/${mm}`;
  return `${dd}/${mm}/${yyyy}`;
}

export function StepTripTravelers({
  rooms,
  travelers,
  setTravelers,
  onNext,
  onBack,
  isSaving,
}: {
  rooms: TripConfigurationRoom[];
  travelers: TripTravelerInput[];
  setTravelers: (next: TripTravelerInput[]) => void;
  onNext: () => void;
  onBack?: () => void;
  isSaving?: boolean;
}) {
  const [touched, setTouched] = useState(false);

  const totalTravelers = useMemo(() => {
    return rooms.reduce((sum, r) => sum + (r.numAdults ?? 0) + (r.numChildren ?? 0), 0) || 1;
  }, [rooms]);

  const roomSizes = useMemo(() => {
    if (!rooms || rooms.length === 0) return [totalTravelers];
    const sizes = rooms.map((r) => Math.max(0, (r.numAdults ?? 0) + (r.numChildren ?? 0)));
    const sum = sizes.reduce((a, b) => a + b, 0);
    // fallback when backend didn't send room breakdown but totalTravelers is known
    if (sum === 0) return [totalTravelers];
    return sizes;
  }, [rooms, totalTravelers]);

  const roomStartIndexes = useMemo(() => {
    const starts: number[] = [];
    let cursor = 0;
    for (const size of roomSizes) {
      starts.push(cursor);
      cursor += size;
    }
    return starts;
  }, [roomSizes]);

  const ensured = useMemo(() => {
    const base: TripTravelerInput[] = [];
    for (let i = 0; i < totalTravelers; i += 1) {
      base.push(
        travelers[i] ?? {
          roomIndex: 0,
          name: "",
          lastName: "",
          cpf: "",
          birthDate: "",
        }
      );
    }
    return base;
  }, [totalTravelers, travelers]);

  const updateTraveler = (idx: number, update: Partial<TripTravelerInput>) => {
    const next = ensured.map((t, i) => (i === idx ? { ...t, ...update } : t));
    setTravelers(next);
  };

  const invalidIndexes = useMemo(() => {
    const invalid: number[] = [];
    ensured.forEach((t, i) => {
      const hasName = (t.name ?? "").trim().length > 1;
      const hasLastName = (t.lastName ?? "").trim().length > 1;
      const cpfDigits = normalizeCpf(t.cpf);
      const hasCpf = cpfDigits.length === 11;
      const hasBirthDate = (t.birthDate ?? "").trim().length === 10; // DD/MM/YYYY
      if (!hasName || !hasLastName || !hasCpf || !hasBirthDate) invalid.push(i);
    });
    return invalid;
  }, [ensured]);

  const canContinue = invalidIndexes.length === 0 && totalTravelers > 0;

  return (
    <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm">
      <h2 className="font-baloo text-xl font-bold text-secondary-900 mb-2">Viajantes</h2>
      <p className="font-comfortaa text-secondary-600 text-sm mb-6">
        Precisamos dos dados básicos de cada viajante para seguir com a reserva.
      </p>

      <div className="space-y-6">
        {roomSizes.map((roomSize, roomIdx) => {
          const start = roomStartIndexes[roomIdx] ?? 0;
          const adults = rooms?.[roomIdx]?.numAdults ?? null;
          const children = rooms?.[roomIdx]?.numChildren ?? null;
          const roomLabel =
            adults != null || children != null
              ? `Quarto ${roomIdx + 1} — ${adults ?? 0} adulto(s)${children ? ` · ${children} criança(s)` : ""}`
              : `Quarto ${roomIdx + 1}`;

          const indexes = Array.from({ length: roomSize }, (_, k) => start + k).filter((i) => i < ensured.length);

          return (
            <div key={`room:${roomIdx}`} className="rounded-2xl border border-secondary-200 p-4">
              <p className="font-baloo font-semibold text-secondary-900 mb-4">{roomLabel}</p>
              <div className="space-y-6">
                {indexes.map((travelerIdxInList, localIdx) => {
                  const t = ensured[travelerIdxInList]!;
                  const showError = touched && invalidIndexes.includes(travelerIdxInList);
                  return (
                    <div key={`traveler:${roomIdx}:${localIdx}`} className="rounded-xl border border-secondary-200 p-4">
                      <p className="font-baloo font-semibold text-secondary-900 mb-3">
                        Viajante {localIdx + 1}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                            Nome
                          </label>
                          <input
                            value={t.name ?? ""}
                            onChange={(e) =>
                              updateTraveler(travelerIdxInList, {
                                roomIndex: roomIdx,
                                name: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                            placeholder="Nome"
                          />
                        </div>
                        <div>
                          <label className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                            Sobrenome
                          </label>
                          <input
                            value={t.lastName ?? ""}
                            onChange={(e) =>
                              updateTraveler(travelerIdxInList, {
                                roomIndex: roomIdx,
                                lastName: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                            placeholder="Sobrenome"
                          />
                        </div>
                        <div>
                          <label className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                            CPF
                          </label>
                          <MaskedCpfInput
                            value={t.cpf ?? ""}
                            onChange={(digits) =>
                              updateTraveler(travelerIdxInList, { roomIndex: roomIdx, cpf: digits })
                            }
                            className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                          />
                        </div>
                        <div>
                          <label className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                            Data de nascimento
                          </label>
                          <input
                            value={t.birthDate ?? ""}
                            onChange={(e) =>
                              updateTraveler(travelerIdxInList, {
                                roomIndex: roomIdx,
                                birthDate: maskBrDate(e.target.value),
                              })
                            }
                            className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                            placeholder="DD/MM/AAAA"
                            inputMode="numeric"
                            autoComplete="bday"
                          />
                        </div>
                      </div>
                      {showError ? (
                        <p className="mt-3 text-sm font-comfortaa text-red-700">
                          Preencha nome, sobrenome, CPF (11 dígitos) e data de nascimento.
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 pt-6">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="font-comfortaa px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
          >
            Voltar
          </button>
        ) : null}
        <button
          type="button"
          disabled={isSaving || !canContinue}
          onClick={() => {
            setTouched(true);
            if (canContinue) onNext();
          }}
          className="font-baloo bg-accent-500 text-secondary-900 px-6 py-2 rounded-full font-semibold hover:bg-accent-600 disabled:opacity-60 transition-all"
        >
          {isSaving ? "Salvando…" : "Continuar"}
        </button>
      </div>
    </section>
  );
}

