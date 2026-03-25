"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "@/core/store";
import { CustomersService } from "@/clients/customers";
import type { RelationshipType, SubscriptionTravelerItem } from "@/clients/customers";
import { updateTravelerState } from "@/services/user/update-traveler-state";

const REMOVAL_CONTACT_EMAIL = "info@tripevolved.com.br";
const MAX_SUBSCRIPTION_TRAVELERS = 6;

function relationshipLabel(type: RelationshipType): string {
  switch (type) {
    case "SELF":
      return "Eu";
    case "SPOUSE":
      return "Cônjuge";
    case "CHILD":
      return "Filho(a)";
    case "OTHER":
      return "Outro";
    default:
      return type;
  }
}

function formatDate(value: Date | string): string {
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function CirculoEvolvedAdminPage() {
  const travelerState = useAppStore((state) => state.travelerState);
  const subscription = travelerState?.subscription;

  const canManageTravelers = Boolean(subscription?.id);
  const showTravelersList = subscription?.hasTravelers === true;

  const [travelers, setTravelers] = useState<SubscriptionTravelerItem[] | null>(null);
  const [travelersLoading, setTravelersLoading] = useState(false);
  const [travelersError, setTravelersError] = useState<string | null>(null);

  useEffect(() => {
    if (!subscription?.id || !showTravelersList) {
      setTravelers(null);
      setTravelersError(null);
      setTravelersLoading(false);
      return;
    }

    let cancelled = false;
    setTravelersLoading(true);
    setTravelersError(null);

    CustomersService.getSubscriptionTravelers(subscription.id)
      .then((data) => {
        if (!cancelled) setTravelers(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) {
          setTravelers(null);
          setTravelersError("Não foi possível carregar a lista de viajantes.");
        }
      })
      .finally(() => {
        if (!cancelled) setTravelersLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [subscription?.id, showTravelersList]);

  /** Known count when we can decide the limit; null while loading list or if the list failed to load. */
  const resolvedTravelerCount: number | null =
    !showTravelersList ? 0 : travelersLoading ? null : travelers !== null ? travelers.length : null;

  const canAddTraveler =
    resolvedTravelerCount !== null && resolvedTravelerCount < MAX_SUBSCRIPTION_TRAVELERS;

  const atMaxTravelers =
    resolvedTravelerCount !== null && resolvedTravelerCount >= MAX_SUBSCRIPTION_TRAVELERS;

  const selfTravelerAlreadyPresent =
    showTravelersList &&
    travelers !== null &&
    travelers.some((t) => t.relationshipType === "SELF");

  const relationshipOptions = useMemo(
    () =>
      [
        { value: "SELF" as const, label: "Eu" },
        { value: "SPOUSE" as const, label: "Cônjuge" },
        { value: "CHILD" as const, label: "Filho(a)" },
        { value: "OTHER" as const, label: "Outro" },
      ] satisfies Array<{ value: RelationshipType; label: string }>,
    []
  );

  const selectableRelationshipOptions = useMemo(() => {
    if (selfTravelerAlreadyPresent) {
      return relationshipOptions.filter((opt) => opt.value !== "SELF");
    }
    return relationshipOptions;
  }, [relationshipOptions, selfTravelerAlreadyPresent]);

  const [relationshipType, setRelationshipType] = useState<RelationshipType>("SPOUSE");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState(""); // YYYY-MM-DD
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (selfTravelerAlreadyPresent && relationshipType === "SELF") {
      setRelationshipType("SPOUSE");
    }
  }, [selfTravelerAlreadyPresent, relationshipType]);

  const isSelfRelationship = relationshipType === "SELF";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!subscription?.id) {
      setSubmitError("Não foi possível identificar sua assinatura para cadastrar viajantes.");
      return;
    }

    if (!canAddTraveler) {
      setSubmitError(
        `É possível cadastrar no máximo ${MAX_SUBSCRIPTION_TRAVELERS} viajantes. Entre em contato com ${REMOVAL_CONTACT_EMAIL} se precisar de ajuda.`
      );
      return;
    }

    const nameForApi = isSelfRelationship
      ? (travelerState?.name ?? "").trim()
      : name.trim();
    if (!nameForApi) {
      setSubmitError(
        isSelfRelationship
          ? "Não foi possível identificar seu nome no perfil. Atualize seus dados e tente novamente."
          : "Informe o nome do viajante."
      );
      return;
    }

    if (!birthDate) {
      setSubmitError("Informe a data de nascimento.");
      return;
    }

    setIsSubmitting(true);
    try {
      await CustomersService.createSubscriptionTraveler({
        customerSubscriptionId: subscription.id,
        relationshipType,
        name: nameForApi,
        birthDate,
      });

      await updateTravelerState();

      const hasList = useAppStore.getState().travelerState?.subscription?.hasTravelers === true;
      const subId = useAppStore.getState().travelerState?.subscription?.id;
      if (hasList && subId) {
        try {
          const list = await CustomersService.getSubscriptionTravelers(subId);
          setTravelers(Array.isArray(list) ? list : []);
        } catch {
          /* list refresh optional; next page load or effect will retry */
        }
      }

      setName("");
      setBirthDate("");
      setRelationshipType("SPOUSE");
      setSubmitSuccess("Viajante cadastrado com sucesso.");
    } catch (err) {
      setSubmitError("Não foi possível cadastrar o viajante. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <header className="mb-8">
          <h1 className="font-baloo text-2xl md:text-3xl font-bold text-secondary-900">
            Círculo Evolved
          </h1>
          <p className="font-comfortaa text-secondary-600 mt-1">
            Informações da sua assinatura
          </p>
        </header>

        <section className="bg-white rounded-2xl border border-secondary-200 p-6 md:p-8 shadow-sm space-y-6">
          {subscription ? (
            <div>
              <h2 className="font-baloo text-lg font-bold text-secondary-900 mb-4">
                {subscription.status === "Active" ? "Assinatura ativa" : "Assinatura Inativa"}
              </h2>
              <p className="font-comfortaa text-secondary-700">
                De {formatDate(subscription.dateFrom)} até {formatDate(subscription.dateTo)}
              </p>
            </div>
          ) : (
            <p className="font-comfortaa text-secondary-600">
              Nenhuma assinatura encontrada.
            </p>
          )}

          <div className="border-t border-secondary-200 pt-6">
            <h3 className="font-baloo text-lg font-bold text-secondary-900 mb-2">
              Viajantes autorizados
            </h3>
            <p className="font-comfortaa text-secondary-600 text-sm mb-4">
              Cadastre as pessoas que podem viajar com o assinante. Limite de{" "}
              {MAX_SUBSCRIPTION_TRAVELERS} viajantes por assinatura.
            </p>

            {canManageTravelers && (
              <p className="font-comfortaa text-secondary-600 text-sm mb-4">
                Para remover um viajante cadastrado, envie um e-mail para{" "}
                <a
                  href={`mailto:${REMOVAL_CONTACT_EMAIL}?subject=Remo%C3%A7%C3%A3o%20de%20viajante%20%E2%80%94%20C%C3%ADrculo%20Evolved`}
                  className="text-accent-600 hover:underline font-medium"
                >
                  {REMOVAL_CONTACT_EMAIL}
                </a>
                .
              </p>
            )}

            {canManageTravelers && atMaxTravelers && (
              <div
                className="mb-4 p-4 bg-secondary-50 border border-secondary-200 rounded-xl font-comfortaa text-sm text-secondary-800"
                role="status"
              >
                Você já atingiu o limite de {MAX_SUBSCRIPTION_TRAVELERS} viajantes. Se precisar incluir mais
                pessoas ou alterar sua lista, fale com a gente em{" "}
                <a
                  href={`mailto:${REMOVAL_CONTACT_EMAIL}?subject=Limite%20de%20viajantes%20%E2%80%94%20C%C3%ADrculo%20Evolved`}
                  className="text-accent-600 hover:underline font-medium"
                >
                  {REMOVAL_CONTACT_EMAIL}
                </a>
                .
              </div>
            )}

            {showTravelersList && canManageTravelers && (
              <div className="mb-6">
                <h4 className="font-comfortaa text-sm font-semibold text-secondary-900 mb-2">
                  Viajantes cadastrados
                </h4>
                {travelersLoading && (
                  <p className="font-comfortaa text-secondary-600 text-sm">Carregando…</p>
                )}
                {travelersError && (
                  <div
                    className="p-3 bg-red-50 border border-red-200 rounded-xl font-comfortaa text-sm text-red-800"
                    role="alert"
                  >
                    {travelersError}
                  </div>
                )}
                {!travelersLoading && !travelersError && travelers && travelers.length === 0 && (
                  <p className="font-comfortaa text-secondary-600 text-sm">
                    Nenhum viajante na lista.
                  </p>
                )}
                {!travelersLoading && travelers && travelers.length > 0 && (
                  <ul className="divide-y divide-secondary-200 rounded-xl border border-secondary-200 overflow-hidden">
                    {travelers.map((t) => (
                      <li
                        key={t.travelerId}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-4 py-3 bg-white font-comfortaa text-sm text-secondary-800"
                      >
                        <span className="font-medium text-secondary-900">{t.travelerName}</span>
                        <span className="text-secondary-600">
                          {relationshipLabel(t.relationshipType)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {!canManageTravelers ? (
              <div className="p-4 bg-secondary-50 border border-secondary-200 rounded-xl font-comfortaa text-sm text-secondary-700">
                Não foi possível carregar o identificador da sua assinatura para cadastrar viajantes.
              </div>
            ) : atMaxTravelers ? null : (
              <form onSubmit={onSubmit} className="space-y-4">
                {showTravelersList && travelersLoading && (
                  <p className="font-comfortaa text-secondary-600 text-sm">
                    Verificando seus viajantes cadastrados…
                  </p>
                )}
                {submitError && (
                  <div
                    className="p-4 bg-red-50 border border-red-200 rounded-xl font-comfortaa text-sm text-red-800"
                    role="alert"
                  >
                    {submitError}
                  </div>
                )}
                {submitSuccess && (
                  <div
                    className="p-4 bg-green-50 border border-green-200 rounded-xl font-comfortaa text-sm text-green-800"
                    role="status"
                  >
                    {submitSuccess}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="font-comfortaa text-sm text-secondary-700">
                      Parentesco
                    </span>
                    <select
                      value={relationshipType}
                      onChange={(e) => setRelationshipType(e.target.value as RelationshipType)}
                      className="mt-1 w-full rounded-xl border border-secondary-200 bg-white px-3 py-2 font-comfortaa text-secondary-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
                      disabled={isSubmitting || !canAddTraveler}
                    >
                      {selectableRelationshipOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="font-comfortaa text-sm text-secondary-700">
                      Data de nascimento
                    </span>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-secondary-200 bg-white px-3 py-2 font-comfortaa text-secondary-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
                      disabled={isSubmitting || !canAddTraveler}
                      required
                    />
                  </label>
                </div>

                {!isSelfRelationship && (
                  <label className="block">
                    <span className="font-comfortaa text-sm text-secondary-700">
                      Nome completo
                    </span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-secondary-200 bg-white px-3 py-2 font-comfortaa text-secondary-900 focus:outline-none focus:ring-2 focus:ring-accent-500"
                      placeholder="Ex.: Maria Silva"
                      disabled={isSubmitting || !canAddTraveler}
                      required
                    />
                  </label>
                )}

                <button
                  type="submit"
                  className="inline-flex items-center justify-center font-baloo bg-accent-500 text-secondary-900 px-6 py-3 rounded-full font-semibold hover:bg-accent-600 transition-colors disabled:opacity-60"
                  disabled={isSubmitting || !canAddTraveler}
                >
                  {isSubmitting ? "Salvando…" : "Adicionar viajante"}
                </button>
              </form>
            )}
          </div>

          <div className="pt-4">
            <Link
              href="/app"
              className="inline-block font-comfortaa px-4 py-2 text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors border border-secondary-200"
            >
              Voltar
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
