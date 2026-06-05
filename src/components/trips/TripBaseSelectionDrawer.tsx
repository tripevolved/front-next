"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { DestinationsApiService } from "@/clients/destinations";
import type { Destination } from "@/clients/destinations/destinations";
import { CollectionsApiService, type Collection } from "@/clients/collections";
import { TripsApiService } from "@/clients/trips";
import { CircleLoader } from "@/components/common/CircleLoader";
import { CollectionHeroBlock } from "@/components/collections/CollectionHeroBlock";
import { CollectionsBrowseList } from "@/components/collections/CollectionsBrowseList";
import { DestinationsBrowseList } from "@/components/destinations/DestinationsBrowseList";
import type { PublicDestination } from "@/core/types/destination";
import { TripBasePathChoice } from "@/components/trips/TripBasePathChoice";

const STEPPER = ["Como começar", "Sua escolha", "Próximo passo"] as const;

type Path = "collections" | "destination";
type SubStep = "choosePath" | "pick" | "confirm" | "done";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
  relatedDestinationUniqueName?: string | null;
  /** Called when the user should continue to accommodation selection. */
  onContinueToAccommodation?: () => void;
  onSaved?: () => void;
};

function imageUrl(img?: { url: string } | null): string {
  const u = img?.url?.trim();
  return u ? u : "/assets/blank-image.png";
}

export function TripBaseSelectionDrawer({
  isOpen,
  onClose,
  tripId,
  relatedDestinationUniqueName,
  onContinueToAccommodation,
  onSaved,
}: Props) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [browseResetKey, setBrowseResetKey] = useState(0);
  const [path, setPath] = useState<Path | null>(null);
  const [subStep, setSubStep] = useState<SubStep>("choosePath");
  const [pickedDestination, setPickedDestination] = useState<Destination | null>(null);
  const [pickedCollection, setPickedCollection] = useState<Collection | null>(null);
  const [collectionLoading, setCollectionLoading] = useState(false);
  const [collectionError, setCollectionError] = useState<string | null>(null);
  const [destinationDetail, setDestinationDetail] = useState<PublicDestination | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [savedLabel, setSavedLabel] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resetFlow = useCallback(() => {
    setPath(null);
    setSubStep("choosePath");
    setPickedDestination(null);
    setPickedCollection(null);
    setCollectionLoading(false);
    setCollectionError(null);
    setDestinationDetail(null);
    setDetailLoading(false);
    setDetailError(null);
    setSubmitting(false);
    setSubmitError(null);
    setSavedLabel(null);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    resetFlow();
    setBrowseResetKey((k) => k + 1);
  }, [isOpen, resetFlow]);

  const handleClose = useCallback(() => {
    onClose();
    resetFlow();
  }, [onClose, resetFlow]);

  const stepperIndex = useMemo(() => {
    if (subStep === "choosePath") return 0;
    if (subStep === "pick" || subStep === "confirm") return 1;
    return 2;
  }, [subStep]);

  const headerTitle = useMemo(() => {
    if (subStep === "choosePath") return "O que vai guiar sua viagem?";
    if (subStep === "done") return "Base definida";
    if (path === "collections" && subStep === "confirm") {
      return pickedCollection?.title ?? "Confirmar coleção";
    }
    if (path === "collections") return "Escolha uma coleção";
    if (subStep === "confirm") return pickedDestination?.name ?? "Confirmar destino";
    return "Qual o destino da viagem?";
  }, [path, pickedCollection?.title, pickedDestination?.name, subStep]);

  const progressPercent = useMemo(() => {
    if (subStep === "choosePath") return 15;
    if (subStep === "pick") return 45;
    if (subStep === "confirm") return 70;
    return 100;
  }, [subStep]);

  const goBack = () => {
    if (subStep === "confirm") {
      setSubStep("pick");
      setDestinationDetail(null);
      setDetailError(null);
      setPickedCollection(null);
      setCollectionLoading(false);
      setCollectionError(null);
      setSubmitError(null);
      return;
    }
    if (subStep === "pick") {
      setSubStep("choosePath");
      setPath(null);
      setPickedDestination(null);
      setPickedCollection(null);
      setCollectionLoading(false);
      setCollectionError(null);
      return;
    }
    if (subStep === "done") {
      handleClose();
      return;
    }
    handleClose();
  };

  const showBack = subStep === "pick" || subStep === "confirm" || subStep === "done";

  const openCollectionConfirm = useCallback((uniqueName: string) => {
    setSubStep("confirm");
    setPickedCollection(null);
    setCollectionError(null);
    setSubmitError(null);
    setCollectionLoading(true);
    CollectionsApiService.getCollectionByUniqueName(uniqueName)
      .then((collection) => setPickedCollection(collection))
      .catch(() => setCollectionError("Não foi possível carregar os detalhes desta coleção."))
      .finally(() => setCollectionLoading(false));
  }, []);

  const openDestinationConfirm = useCallback((destination: Destination) => {
    setPickedDestination(destination);
    setSubStep("confirm");
    setDestinationDetail(null);
    setDetailError(null);
    setSubmitError(null);
    setDetailLoading(true);
    DestinationsApiService.getDestinationByUniqueName(destination.uniqueName)
      .then((pub) => setDestinationDetail(pub))
      .catch(() => setDetailError("Não foi possível carregar os detalhes deste destino."))
      .finally(() => setDetailLoading(false));
  }, []);

  const saveDestination = useCallback(async () => {
    if (!pickedDestination?.destinationId) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await TripsApiService.setDestinationIdForTrip({
        tripId,
        tripDestination: { destinationId: pickedDestination.destinationId },
      });
      setSavedLabel(pickedDestination.name);
      setSubStep("done");
      onSaved?.();
      router.refresh();
    } catch {
      setSubmitError("Não foi possível salvar o destino. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }, [onSaved, pickedDestination, router, tripId]);

  const saveCollection = useCallback(async () => {
    if (!pickedCollection?.uniqueName) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await TripsApiService.putTripCollection({
        tripId,
        collectionUniqueName: pickedCollection.uniqueName,
      });
      setSavedLabel(pickedCollection.title);
      setSubStep("done");
      onSaved?.();
      router.refresh();
    } catch {
      setSubmitError("Não foi possível salvar a coleção. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }, [onSaved, pickedCollection, router, tripId]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/50" onClick={handleClose} />

      <aside className="fixed right-0 inset-y-0 z-10 flex h-full w-full flex-col bg-white shadow-2xl md:w-2/3">
        <div className="flex justify-between gap-2 border-b border-secondary-100 bg-secondary-50/80 px-5 py-3">
          {STEPPER.map((name, i) => {
            const isActive = i === stepperIndex;
            const isCompleted = i < stepperIndex;
            return (
              <div
                key={name}
                className={`flex flex-col items-center flex-1 min-w-0 ${
                  isActive ? "text-secondary-900" : isCompleted ? "text-secondary-600" : "text-secondary-400"
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-baloo font-semibold shrink-0 mb-1 ${
                    isActive
                      ? "bg-accent-500 text-secondary-900"
                      : isCompleted
                        ? "bg-accent-400/80 text-secondary-900"
                        : "bg-secondary-200 text-secondary-500"
                  }`}
                >
                  {isCompleted ? "✓" : i + 1}
                </span>
                <span className="font-comfortaa text-[10px] md:text-xs text-center truncate w-full">{name}</span>
              </div>
            );
          })}
        </div>

        <header className="shrink-0 border-b border-secondary-200 p-5">
          <div className="grid grid-cols-[auto,1fr,auto] items-start gap-4">
            <div className="min-w-[96px]">
              {showBack ? (
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
                  onClick={handleClose}
                  className="h-10 rounded-full border border-secondary-200 bg-white px-4 font-comfortaa text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
                >
                  Fechar
                </button>
              )}
            </div>
            <div className="min-w-0 text-center">
              <p className="font-comfortaa text-xs text-secondary-500">Base da viagem</p>
              <h2 className="font-baloo text-xl font-bold text-secondary-900 leading-tight">{headerTitle}</h2>
              <p className="font-comfortaa text-xs text-secondary-500 mt-1">
                Passo {stepperIndex + 1} de {STEPPER.length}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
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
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto">
          {subStep === "choosePath" ? (
            <TripBasePathChoice
              onSelectCollections={() => {
                setPath("collections");
                setSubStep("pick");
              }}
              onSelectDestination={() => {
                setPath("destination");
                setSubStep("pick");
              }}
            />
          ) : subStep === "pick" && path === "collections" ? (
            <CollectionsBrowseList
              compact
              title="Coleções para sua viagem"
              subtitle="Escolha a curadoria que vai inspirar esta jornada."
              treatAllAsAccessible
              minimalCards
              onSelectCollection={openCollectionConfirm}
            />
          ) : subStep === "pick" && path === "destination" ? (
            <DestinationsBrowseList
              compact
              resetNonce={browseResetKey}
              relatedDestinationUniqueName={relatedDestinationUniqueName}
              onSelectDestination={openDestinationConfirm}
            />
          ) : subStep === "confirm" && path === "collections" ? (
            <div className="pb-28">
              {collectionLoading ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16">
                  <CircleLoader className="h-16 w-16" />
                  <p className="font-comfortaa text-sm text-secondary-600">Carregando coleção…</p>
                </div>
              ) : pickedCollection ? (
                <>
                  <CollectionHeroBlock collection={pickedCollection} compact />
                  <div className="p-5 space-y-4">
                    {pickedCollection.description ? (
                      <p className="font-comfortaa text-sm text-secondary-700 leading-relaxed">
                        {pickedCollection.description}
                      </p>
                    ) : null}
                    <p className="font-comfortaa text-sm text-secondary-500">
                      Esta coleção será a referência da sua viagem. Em seguida, você escolhe a hospedagem.
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-6 space-y-4">
                  <p className="font-comfortaa text-sm text-secondary-600">
                    {collectionError ?? "Não foi possível exibir esta coleção."}
                  </p>
                </div>
              )}
              {submitError ? (
                <div className="mx-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {submitError}
                </div>
              ) : null}
            </div>
          ) : subStep === "confirm" && path === "destination" ? (
            <div className="p-5 space-y-5 pb-28">
              {detailLoading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-48 w-full rounded-xl bg-secondary-100" />
                  <div className="h-6 w-2/3 rounded bg-secondary-100" />
                  <div className="h-4 w-full rounded bg-secondary-100" />
                </div>
              ) : (
                <>
                  <div className="relative w-full h-52 rounded-xl overflow-hidden bg-secondary-100">
                    <Image
                      src={
                        destinationDetail?.photos?.[0]?.url ??
                        imageUrl(pickedDestination?.coverImage) ??
                        "/assets/blank-image.png"
                      }
                      alt={pickedDestination?.name ?? "Destino"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div>
                    <h3 className="font-baloo text-2xl font-bold text-secondary-900">{pickedDestination?.name}</h3>
                    {destinationDetail?.where ? (
                      <p className="mt-2 font-comfortaa text-sm text-secondary-600">{destinationDetail.where}</p>
                    ) : null}
                  </div>
                  {detailError ? (
                    <p className="font-comfortaa text-sm text-secondary-600">{detailError}</p>
                  ) : null}
                </>
              )}
              {submitError ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {submitError}
                </div>
              ) : null}
            </div>
          ) : subStep === "done" ? (
            <div className="flex flex-col items-center justify-center gap-6 p-10 text-center min-h-[40vh]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-100 text-2xl text-accent-600">
                ✓
              </div>
              <div className="space-y-2 max-w-md">
                <h3 className="font-baloo text-2xl font-bold text-secondary-900">Base salva</h3>
                <p className="font-comfortaa text-secondary-600">
                  {savedLabel ? (
                    <>
                      <span className="font-semibold text-secondary-900">{savedLabel}</span> está definido como base da
                      sua viagem.
                    </>
                  ) : (
                    "Sua escolha foi registrada."
                  )}
                </p>
                <p className="font-comfortaa text-sm text-secondary-500">
                  O próximo passo é escolher onde você vai se hospedar.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    onContinueToAccommodation?.();
                  }}
                  className="flex-1 font-baloo rounded-full bg-accent-500 px-6 py-3 text-base font-semibold text-secondary-900 hover:bg-accent-600"
                >
                  Escolher hospedagem
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 font-comfortaa rounded-full border border-secondary-200 px-6 py-3 text-sm font-semibold text-secondary-700 hover:bg-secondary-50"
                >
                  Fechar
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {subStep === "confirm" && path === "collections" && !collectionLoading && pickedCollection ? (
          <div className="shrink-0 border-t border-secondary-200 bg-white p-4">
            <button
              type="button"
              disabled={submitting}
              onClick={() => void saveCollection()}
              className="w-full rounded-xl bg-accent-500 px-4 py-3 text-center text-sm font-semibold text-secondary-900 shadow-sm hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Salvando…" : "Confirmar coleção"}
            </button>
          </div>
        ) : null}

        {subStep === "confirm" && path === "destination" && !detailLoading ? (
          <div className="shrink-0 border-t border-secondary-200 bg-white p-4">
            <button
              type="button"
              disabled={submitting}
              onClick={() => void saveDestination()}
              className="w-full rounded-xl bg-accent-500 px-4 py-3 text-center text-sm font-semibold text-secondary-900 shadow-sm hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Salvando…" : "Confirmar destino"}
            </button>
          </div>
        ) : null}
      </aside>
    </div>,
    document.body
  );
}
