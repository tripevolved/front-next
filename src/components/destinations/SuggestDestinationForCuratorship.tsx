"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { DestinationsApiService } from "@/clients/destinations";
import { useAppStore } from "@/core/store";

export type SuggestDestinationForCuratorshipProps = {
  /** Search text the user tried (shown in copy and sent as `destination`). */
  destinationQuery: string;
  /**
   * When the traveler is not in store: `modal` opens a contact form in an overlay (public pages).
   * `inline` shows email + checkbox in place (sidebars).
   */
  anonymousContactMode?: "modal" | "inline";
  /** Tighter layout for drawer sidebars. */
  compact?: boolean;
  className?: string;
};

export function SuggestDestinationForCuratorship({
  destinationQuery,
  anonymousContactMode = "inline",
  compact = false,
  className = "",
}: SuggestDestinationForCuratorshipProps) {
  const travelerState = useAppStore((s) => s.travelerState);
  const hasTraveler = Boolean(travelerState?.id?.trim());

  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [allowsContact, setAllowsContact] = useState(true);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const destination = destinationQuery.trim();

  const submit = useCallback(
    async (payload: { email?: string; travelerId?: string }) => {
      setStatus("saving");
      setErrorMessage(null);
      try {
        await DestinationsApiService.postDestinationCuratorshipSuggestion({
          destination,
          allowsContact,
          ...payload,
        });
        setStatus("success");
        setModalOpen(false);
      } catch {
        setStatus("error");
        setErrorMessage("Não foi possível enviar sua sugestão. Tente novamente.");
      }
    },
    [allowsContact, destination]
  );

  const handleSubmitLoggedIn = () => {
    setStatus("idle");
    setErrorMessage(null);
    const emailVal = travelerState?.email?.trim();
    const idVal = travelerState?.id?.trim();
    if (!emailVal || !idVal) {
      setErrorMessage("Dados do viajante incompletos. Entre novamente na conta.");
      setStatus("error");
      return;
    }
    void submit({ email: emailVal, travelerId: idVal });
  };

  const handleSubmitAnonymousInline = () => {
    const e = email.trim();
    if (!e) {
      setErrorMessage("Informe um e-mail válido.");
      setStatus("error");
      return;
    }
    void submit({ email: e });
  };

  const handleSubmitAnonymousModal = () => {
    const e = email.trim();
    if (!e) {
      setErrorMessage("Informe um e-mail válido.");
      return;
    }
    void submit({ email: e });
  };

  const openModal = () => {
    setErrorMessage(null);
    setStatus("idle");
    setEmail("");
    setAllowsContact(true);
    setModalOpen(true);
  };

  if (!destination) return null;

  const boxClass = compact
    ? "rounded-xl border border-secondary-200 bg-secondary-50/80 p-4 space-y-3"
    : "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4 max-w-lg mx-auto";

  if (status === "success") {
    return (
      <div className={[boxClass, className].filter(Boolean).join(" ")}>
        <p className={`font-comfortaa text-secondary-700 ${compact ? "text-sm" : "text-base"}`}>
          Obrigado! Recebemos sua sugestão de destino e nossa curadoria vai avaliar.
        </p>
      </div>
    );
  }

  const labelClass = `font-comfortaa ${compact ? "text-xs" : "text-sm"} text-secondary-700`;
  const inputClass =
    "w-full rounded-xl border border-secondary-200 px-3 py-2 font-comfortaa text-sm outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500";

  const primaryButtonClass = compact
    ? "w-full rounded-xl bg-accent-500 px-4 py-2.5 text-center text-sm font-semibold text-secondary-900 hover:bg-accent-600 transition-colors disabled:opacity-60"
    : "inline-flex justify-center items-center font-baloo bg-accent-500 text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-accent-600 transition-all disabled:opacity-60";

  return (
    <div className={[boxClass, className].filter(Boolean).join(" ")}>
      <p className={`font-comfortaa text-secondary-800 ${compact ? "text-sm" : "text-base"}`}>
        <span className="font-semibold">&quot;{destination}&quot;</span> ainda não passou pela nossa curadoria. Quer que nossos
        especialistas considerem incluí-lo?
      </p>

      {hasTraveler ? (
        <div className="space-y-3">
          <label className={`flex items-start gap-2 ${labelClass}`}>
            <input
              type="checkbox"
              checked={allowsContact}
              onChange={(e) => setAllowsContact(e.target.checked)}
              className="mt-1 rounded border-secondary-300"
            />
            <span>Autorizo contato sobre esta sugestão e novidades da curadoria.</span>
          </label>
          {status === "error" && errorMessage ? (
            <p className="font-comfortaa text-sm text-red-700">{errorMessage}</p>
          ) : null}
          <button
            type="button"
            disabled={status === "saving"}
            onClick={handleSubmitLoggedIn}
            className={primaryButtonClass}
          >
            {status === "saving" ? "Enviando…" : "Enviar sugestão"}
          </button>
        </div>
      ) : anonymousContactMode === "modal" ? (
        <div className="space-y-3">
          {status === "error" && errorMessage ? (
            <p className="font-comfortaa text-sm text-red-700">{errorMessage}</p>
          ) : null}
          <button type="button" onClick={openModal} className={`${primaryButtonClass} w-full sm:w-auto`}>
            Enviar sugestão
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <label htmlFor="suggest-destination-email" className={`block mb-1 ${labelClass}`}>
              Seu e-mail
            </label>
            <input
              id="suggest-destination-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage(null);
              }}
              className={inputClass}
              placeholder="nome@email.com"
            />
          </div>
          <label className={`flex items-start gap-2 ${labelClass}`}>
            <input
              type="checkbox"
              checked={allowsContact}
              onChange={(e) => setAllowsContact(e.target.checked)}
              className="mt-1 rounded border-secondary-300"
            />
            <span>Autorizo contato sobre esta sugestão e novidades da curadoria.</span>
          </label>
          {status === "error" && errorMessage ? (
            <p className="font-comfortaa text-sm text-red-700">{errorMessage}</p>
          ) : null}
          <button
            type="button"
            disabled={status === "saving"}
            onClick={handleSubmitAnonymousInline}
            className={primaryButtonClass}
          >
            {status === "saving" ? "Enviando…" : "Enviar sugestão"}
          </button>
        </div>
      )}

      {mounted && modalOpen && anonymousContactMode === "modal" && !hasTraveler
        ? createPortal(
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50">
              <div
                className="bg-white rounded-2xl p-6 max-w-md w-full relative shadow-xl"
                role="dialog"
                aria-modal="true"
                aria-labelledby="suggest-destination-modal-title"
              >
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  aria-label="Fechar"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h2 id="suggest-destination-modal-title" className="font-baloo text-xl font-bold text-secondary-900 pr-8">
                  Sugerir destino
                </h2>
                <p className="mt-2 font-comfortaa text-sm text-secondary-600">
                  Informe seu e-mail para que possamos considerar{" "}
                  <span className="font-semibold">&quot;{destination}&quot;</span> na curadoria.
                </p>
                <div className="mt-4 space-y-3">
                  <div>
                    <label htmlFor="suggest-modal-email" className="block text-sm font-comfortaa text-secondary-700 mb-1">
                      E-mail
                    </label>
                    <input
                      id="suggest-modal-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorMessage(null);
                      }}
                      className={inputClass}
                      placeholder="nome@email.com"
                    />
                  </div>
                  <label className="flex items-start gap-2 font-comfortaa text-sm text-secondary-700">
                    <input
                      type="checkbox"
                      checked={allowsContact}
                      onChange={(e) => setAllowsContact(e.target.checked)}
                      className="mt-1 rounded border-secondary-300"
                    />
                    <span>Autorizo contato sobre esta sugestão e novidades da curadoria.</span>
                  </label>
                  {errorMessage ? <p className="font-comfortaa text-sm text-red-700">{errorMessage}</p> : null}
                </div>
                <div className="mt-6 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="rounded-xl border border-secondary-200 px-4 py-2.5 font-comfortaa text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    disabled={status === "saving"}
                    onClick={handleSubmitAnonymousModal}
                    className="rounded-xl bg-accent-500 px-4 py-2.5 font-comfortaa text-sm font-semibold text-secondary-900 hover:bg-accent-600 disabled:opacity-60"
                  >
                    {status === "saving" ? "Enviando…" : "Enviar sugestão"}
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
