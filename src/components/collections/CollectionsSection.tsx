"use client";

import type { TravelerType } from "@/clients/collections";
import { CollectionsBrowseList } from "@/components/collections/CollectionsBrowseList";

interface CollectionsSectionProps {
  travelerType?: TravelerType;
}

export default function CollectionsSection({ travelerType = "COUPLE" }: CollectionsSectionProps) {
  return (
    <CollectionsBrowseList
      travelerType={travelerType}
      title="Coleções para encontrar sua próxima jornada"
      subtitle="Hospedagens selecionadas a dedo para sua viagem."
    />
  );
}
