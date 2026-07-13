"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { CollectionsApiService } from "@/clients/collections";
import type { Collection } from "@/clients/collections";
import { CollectionHeroBlock } from "@/components/collections/CollectionHeroBlock";
import CollectionAccommodationsSection from "@/components/accommodation/CollectionAccommodationsSection";
import { AccommodationCuratorshipModal } from "@/components/accommodation/AccommodationCuratorshipModal";
import { CircleLoader } from "@/components/common/CircleLoader";
import Button from "@/components/common/Button";

const CIRCULO_SECTION_ID = "preco";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  collectionUniqueName: string | null;
};

export function CaribeCirculoCollectionsDrawer({
  isOpen,
  onClose,
  collectionUniqueName,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [collection, setCollection] = useState<Collection | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [curatorshipUniqueName, setCuratorshipUniqueName] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setCollection(null);
      setLoading(false);
      setError(false);
      setCuratorshipUniqueName(null);
      return;
    }
    if (!collectionUniqueName) return;

    let cancelled = false;
    setLoading(true);
    setError(false);
    CollectionsApiService.getCollectionByUniqueName(collectionUniqueName)
      .then((data) => {
        if (!cancelled) setCollection(data);
      })
      .catch(() => {
        if (!cancelled) {
          setCollection(null);
          setError(true);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, collectionUniqueName]);

  const goToCirculoPurchase = useCallback(() => {
    setCuratorshipUniqueName(null);
    onClose();
    requestAnimationFrame(() => {
      document.getElementById(CIRCULO_SECTION_ID)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/50" onClick={onClose} />

      <aside className="fixed right-0 inset-y-0 z-10 flex h-full w-full flex-col bg-white shadow-2xl md:w-2/3">
        <header className="shrink-0 border-b border-secondary-200 px-5 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="font-comfortaa text-xs text-secondary-500">Coleção no Caribe</p>
            <h2 className="font-baloo text-xl font-bold text-secondary-900 leading-tight truncate">
              {collection?.title ?? "Carregando..."}
            </h2>
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
        </header>

        <div className="flex-1 min-h-0 overflow-y-auto">
          {loading ? (
            <div className="p-10 flex justify-center">
              <CircleLoader />
            </div>
          ) : error || !collection ? (
            <div className="p-10 text-center">
              <p className="font-comfortaa text-secondary-600">Não foi possível carregar a coleção.</p>
            </div>
          ) : (
            <div className="flex flex-col min-h-0 pb-8">
              <CollectionHeroBlock collection={collection} compact />
              <CollectionAccommodationsSection
                collectionUniqueName={collection.uniqueName}
                travelerType={collection.travelerType}
                layout="drawer"
                requireDatesForPick={false}
                onAccommodationPick={(p) => setCuratorshipUniqueName(p.uniqueName)}
              />
              <div className="px-4 pt-2">
                <Button
                  onClick={goToCirculoPurchase}
                  className="w-full font-baloo bg-accent-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent-600 transition-all"
                >
                  Contratar o Círculo Evolved
                </Button>
              </div>
            </div>
          )}
        </div>
      </aside>

      <AccommodationCuratorshipModal
        isOpen={Boolean(curatorshipUniqueName)}
        uniqueName={curatorshipUniqueName}
        onClose={() => setCuratorshipUniqueName(null)}
        onContratar={goToCirculoPurchase}
      />
    </div>,
    document.body
  );
}
