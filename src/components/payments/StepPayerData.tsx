"use client";

import { useEffect, useRef, useState } from "react";
import type { PagamentoStepProps } from "@/core/types/payments";
import type { TripPayerAddress } from "@/core/types";
import { ViaCepClient } from "@/clients/viacep";
import { MaskedCpfInput } from "@/components/common/MaskedCpfInput";
import { PhoneInput } from "@/components/common/PhoneInput";

export function StepPayerData({
  payload,
  setPayload,
  onNext,
  onBack,
  isSaving,
  isLoadingPayer,
  travelerEmail,
}: PagamentoStepProps) {
  const { payer } = payload;
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const lastFetchedCep = useRef<string>("");

  const updatePayer = (update: Partial<typeof payer>) => {
    setPayload({ payer: { ...payer, ...update } });
  };

  const updateAddress = (update: Partial<TripPayerAddress>) => {
    setPayload({
      payer: {
        ...payer,
        address: { ...payer.address, ...update },
      },
    });
  };

  const postalCodeDigits = payer.address.postalCode.replace(/\D/g, "");

  useEffect(() => {
    if (postalCodeDigits.length !== 8) {
      lastFetchedCep.current = "";
      return;
    }
    if (lastFetchedCep.current === postalCodeDigits) return;
    let cancelled = false;
    lastFetchedCep.current = postalCodeDigits;
    setIsLoadingCep(true);
    ViaCepClient.getAddress(postalCodeDigits)
      .then((data) => {
        if (cancelled || !data) return;
        updateAddress({
          address: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          stateProvince: data.uf,
          country: "Brasil",
        });
      })
      .finally(() => {
        if (!cancelled) setIsLoadingCep(false);
      });
    return () => {
      cancelled = true;
    };
  }, [postalCodeDigits]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const displayEmail = travelerEmail ?? payer.email;

  if (isLoadingPayer) {
    return (
      <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm">
        <div className="flex items-center justify-center py-12">
          <p className="font-comfortaa text-secondary-600">Carregando dados do pagador…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-0">
        {/* Top: email from traveler state (pre-populated) */}
        <div className="pb-6">
          <h2 className="font-baloo text-lg font-bold text-secondary-900 mb-2">
            E-mail da conta
          </h2>
          <p className="font-comfortaa text-secondary-900 font-medium">
            {displayEmail || "—"}
          </p>
        </div>

        <div className="my-8 border-t border-secondary-200/50" role="separator" aria-hidden />

        {/* Dados do pagador */}
        <div className="pb-6">
          <h2 className="font-baloo text-xl font-bold text-secondary-900 mb-6">
            Dados do pagador
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                  Nome
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={payer.name}
                  onChange={(e) => updatePayer({ name: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="Nome"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                  Sobrenome
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  value={payer.lastName}
                  onChange={(e) => updatePayer({ lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="Sobrenome"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                Telefone
              </label>
              <PhoneInput
                id="phone"
                value={payer.phone}
                onChange={(digits) => updatePayer({ phone: digits })}
                showCountryCode
                countryCode={payer.phoneCountryCode ?? "+55"}
                onCountryCodeChange={(code) => updatePayer({ phoneCountryCode: code })}
                required
                className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                placeholder="(99) 99999-9999"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cpf" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                  CPF
                </label>
                <MaskedCpfInput
                  id="cpf"
                  value={payer.cpf}
                  onChange={(digits) => updatePayer({ cpf: digits })}
                  required
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <label htmlFor="document" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                  RG
                </label>
                <input
                  id="document"
                  type="text"
                  required
                  value={payer.document}
                  onChange={(e) => updatePayer({ document: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="Número do documento"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="motherName" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                  Nome da mãe
                </label>
                <input
                  id="motherName"
                  type="text"
                  value={payer.motherName}
                  onChange={(e) => updatePayer({ motherName: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="Nome completo da mãe"
                />
              </div>
              <div>
                <span className="block font-comfortaa text-sm font-medium text-secondary-700 mb-2">
                  Sexo
                </span>
                <div className="flex gap-6" role="group" aria-label="Sexo">
                  <label className="inline-flex items-center gap-2 cursor-pointer font-comfortaa text-secondary-900">
                    <input
                      type="radio"
                      checked={payer.gender === "M"}
                      onChange={() => updatePayer({ gender: "M" })}
                      className="rounded border-secondary-200 text-accent-600 focus:ring-accent-500"
                    />
                    Masculino
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer font-comfortaa text-secondary-900">
                    <input
                      type="radio"
                      checked={payer.gender === "F"}
                      onChange={() => updatePayer({ gender: "F" })}
                      className="rounded border-secondary-200 text-accent-600 focus:ring-accent-500"
                    />
                    Feminino
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="birthDate" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                Data de nascimento
              </label>
              <input
                id="birthDate"
                type="text"
                required
                value={payer.birthDate}
                onChange={(e) => updatePayer({ birthDate: e.target.value })}
                className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                placeholder="DD/MM/AAAA"
              />
            </div>
          </div>
        </div>

        <div className="my-8 border-t border-secondary-200/50" role="separator" aria-hidden />

        {/* Endereço */}
        <div className="pb-6">
          <h2 className="font-baloo text-xl font-bold text-secondary-900 mb-6">
            Endereço
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="postalCode" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                  CEP
                </label>
                <input
                  id="postalCode"
                  type="text"
                  value={payer.address.postalCode}
                  onChange={(e) => updateAddress({ postalCode: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="00000-000"
                />
                {isLoadingCep && (
                  <p className="font-comfortaa text-xs text-secondary-500 mt-1">Buscando endereço…</p>
                )}
              </div>
              <div>
                <label htmlFor="address" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                  Logradouro
                </label>
                <input
                  id="address"
                  type="text"
                  value={payer.address.address}
                  onChange={(e) => updateAddress({ address: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="Rua, avenida"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="number" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                  Número
                </label>
                <input
                  id="number"
                  type="text"
                  value={payer.address.number}
                  onChange={(e) => updateAddress({ number: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="Nº"
                />
              </div>
              <div>
                <label htmlFor="complement" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                  Complemento
                </label>
                <input
                  id="complement"
                  type="text"
                  value={payer.address.complement ?? ""}
                  onChange={(e) => updateAddress({ complement: e.target.value || null })}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="Apto, bloco"
                />
              </div>
              <div>
                <label htmlFor="neighborhood" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                  Bairro
                </label>
                <input
                  id="neighborhood"
                  type="text"
                  value={payer.address.neighborhood}
                  onChange={(e) => updateAddress({ neighborhood: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="Bairro"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                  Cidade
                </label>
                <input
                  id="city"
                  type="text"
                  value={payer.address.city}
                  onChange={(e) => updateAddress({ city: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="Cidade"
                />
              </div>
              <div>
                <label htmlFor="stateProvince" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                  Estado
                </label>
                <input
                  id="stateProvince"
                  type="text"
                  value={payer.address.stateProvince}
                  onChange={(e) => updateAddress({ stateProvince: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="UF"
                />
              </div>
              <div>
                <label htmlFor="country" className="block font-comfortaa text-sm font-medium text-secondary-700 mb-1">
                  País
                </label>
                <input
                  id="country"
                  type="text"
                  value={payer.address.country}
                  onChange={(e) => updateAddress({ country: e.target.value })}
                  className="w-full px-3 py-2 border border-secondary-200 rounded-lg font-comfortaa text-secondary-900 focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  placeholder="País"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="font-comfortaa px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
            >
              Voltar
            </button>
          )}
          <button
            type="submit"
            disabled={isSaving}
            className="font-baloo bg-accent-500 text-secondary-900 px-6 py-2 rounded-full font-semibold hover:bg-accent-600 disabled:opacity-60 transition-all"
          >
            {isSaving ? "Salvando…" : "Continuar"}
          </button>
        </div>
      </form>
    </section>
  );
}
