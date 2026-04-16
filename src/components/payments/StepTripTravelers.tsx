"use client";

import { useMemo, useState } from "react";
import type { TripTravelerInput } from "@/clients/travelers/travelers";

function toIsoDateFromBr(br: string): string {
  const m = br.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return "";
  const [, dd, mm, yyyy] = m;
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function normalizeCpf(value: string): string {
  return (value ?? "").replace(/\D/g, "").slice(0, 11);
}

export function StepTripTravelers({
  count,
  travelers,
  setTravelers,
  onNext,
  onBack,
  isSaving,
}: {
  count: number;
  travelers: TripTravelerInput[];
  setTravelers: (next: TripTravelerInput[]) => void;
  onNext: () => void;
  onBack?: () => void;
  isSaving?: boolean;
}) {
  const [touched, setTouched] = useState(false);

  const ensured = useMemo(() => {
    const base: TripTravelerInput[] = [];
    for (let i = 0; i < count; i += 1) {
      base.push(
        travelers[i] ?? {
          name: "",
          lastName: "",
          cpf: "",
          birthDate: "",
        }
      );
    }
    return base;
  }, [count, travelers]);

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
      const hasBirthDate = (t.birthDate ?? "").trim().length === 10; // YYYY-MM-DD
      if (!hasName || !hasLastName || !hasCpf || !hasBirthDate) invalid.push(i);
    });
    return invalid;
  }, [ensured]);

  const canContinue = invalidIndexes.length === 0 && count > 0;

  return (
    <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm">
      <h2 className="font-baloo text-xl font-bold text-secondary-900 mb-2">Viajantes</h2>
      <p className="font-comfortaa text-secondary-600 text-sm mb-6">
        Precisamos dos dados básicos de cada viajante para seguir com a reserva.
      </p>

      <div className="space-y-6">
        {ensured.map((t, idx) => {
          const showError = touched && invalidIndexes.includes(idx);
          return (
            <div key={idx} className="rounded-xl border border-secondary-200 p-4">
              <p className="font-baloo font-semibold text-secondary-900 mb-3">Viajante {idx + 1}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                    Nome
                  </label>
                  <input
                    value={t.name ?? ""}
                    onChange={(e) => updateTraveler(idx, { name: e.target.value })}
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
                    onChange={(e) => updateTraveler(idx, { lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    placeholder="Sobrenome"
                  />
                </div>
                <div>
                  <label className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                    CPF
                  </label>
                  <input
                    value={t.cpf ?? ""}
                    onChange={(e) => updateTraveler(idx, { cpf: normalizeCpf(e.target.value) })}
                    className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    placeholder="00000000000"
                    inputMode="numeric"
                  />
                </div>
                <div>
                  <label className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                    Data de nascimento
                  </label>
                  <input
                    value={t.birthDate ?? ""}
                    onChange={(e) => {
                      const v = e.target.value.trim();
                      // allow both ISO and BR for convenience
                      const iso = v.includes("/") ? toIsoDateFromBr(v) : v;
                      updateTraveler(idx, { birthDate: iso });
                    }}
                    className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                    placeholder="AAAA-MM-DD"
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

