"use client";

import Image from "next/image";

import type { Collection } from "@/clients/collections";

function travelerTypeLabel(travelerType: Collection["travelerType"]) {
  if (travelerType === "FAMILY") return "Família";
  return "Casal";
}

export type CollectionHeroBlockProps = {
  collection: Collection;
  /** Shorter hero for drawer */
  compact?: boolean;
};

export function CollectionHeroBlock({ collection, compact = false }: CollectionHeroBlockProps) {
  const heroImageUrl = collection.images?.[0]?.url ?? null;
  const py = compact ? "py-12 md:py-16" : "py-24 md:py-32";

  return (
    <section className="relative overflow-hidden bg-secondary-900 shrink-0">
      {heroImageUrl ? (
        <div className="absolute inset-0">
          <Image src={heroImageUrl} alt={collection.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/85 via-secondary-900/55 to-secondary-900/10" />
        </div>
      ) : null}

      <div className={`relative w-full px-4 ${py}`}>
        <div className="max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 bg-accent-500/90 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-baloo">
            {travelerTypeLabel(collection.travelerType)}
          </div>
          <h1 className={`font-baloo font-bold leading-tight mt-4 ${compact ? "text-3xl md:text-4xl" : "text-4xl md:text-6xl"}`}>
            {collection.title}
          </h1>
          {collection.subtitle ? (
            <p className={`font-comfortaa text-white/90 mt-3 ${compact ? "text-base" : "text-lg md:text-xl"}`}>
              {collection.subtitle}
            </p>
          ) : null}
          {collection.description && !compact ? (
            <p className="font-comfortaa text-base md:text-lg text-white/85 mt-8 max-w-xl">{collection.description}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
