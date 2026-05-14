"use client";

import { useState } from "react";

import { useAppStore } from "@/core/store";
import { SupportWhatsAppCard } from "@/components/app/SupportWhatsAppCard";
import { SubscriptionTravelersPromptCard } from "@/components/app/SubscriptionTravelersPromptCard";
import { CollectionsCard } from "@/components/app/CollectionsCard";
import { DestinationsExploreCard } from "@/components/app/DestinationsExploreCard";
import { CirculoEvolvedCall } from "@/components/app/CirculoEvolvedCall";
import { TripTimeline } from "@/components/trips/TripTimeline";
import { CollectionsFlowDrawer } from "@/components/collections/CollectionsFlowDrawer";
import { DestinationsExploreFlowDrawer } from "@/components/destinations/DestinationsExploreFlowDrawer";

export default function PainelPage() {
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [destinationsExploreOpen, setDestinationsExploreOpen] = useState(false);
  const travelerState = useAppStore((state) => state.travelerState);
  const subscription = travelerState?.subscription;
  const subscriptionActive = subscription?.status === "Active";
  const showTravelersSetup = subscription != null && subscription.hasTravelers === false;

  return (
    <div className="max-w-4xl mx-auto my-4">
      {subscriptionActive ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {showTravelersSetup ? (
            <SubscriptionTravelersPromptCard />
          ) : (
            <DestinationsExploreCard onOpen={() => setDestinationsExploreOpen(true)} />
          )}
          <CollectionsCard onOpen={() => setCollectionsOpen(true)} />
          <SupportWhatsAppCard />
        </div>
      ) : (
        <CirculoEvolvedCall />
      )}
      <TripTimeline />
      <CollectionsFlowDrawer isOpen={collectionsOpen} onClose={() => setCollectionsOpen(false)} />
      <DestinationsExploreFlowDrawer
        isOpen={destinationsExploreOpen}
        onClose={() => setDestinationsExploreOpen(false)}
      />
    </div>
  );
}
