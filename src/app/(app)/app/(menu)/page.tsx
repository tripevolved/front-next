"use client";

import { useAppStore } from "@/core/store";
import { SupportWhatsAppCard } from "@/components/app/SupportWhatsAppCard";
import { SubscriptionTravelersPromptCard } from "@/components/app/SubscriptionTravelersPromptCard";
import { PlanTripCard } from "@/components/app/PlanTripCard";
import { CollectionsCard } from "@/components/app/CollectionsCard";
import { DestinationsExploreCard } from "@/components/app/DestinationsExploreCard";
import { CirculoEvolvedCall } from "@/components/app/CirculoEvolvedCall";
import { TripTimeline } from "@/components/trips/TripTimeline";

export default function PainelPage() {
  const travelerState = useAppStore((state) => state.travelerState);
  const subscription = travelerState?.subscription;
  const subscriptionActive = subscription?.status === "Active";
  const showTravelersSetup = subscription != null && subscription.hasTravelers === false;

  return (
    <div className="max-w-6xl mx-auto my-4 px-4">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
        <div className="min-w-0 flex-1 order-1">
          <TripTimeline />
        </div>
        <hr
          className="lg:hidden order-2 w-full border-0 border-t border-gray-200 m-0 shrink-0"
          aria-hidden
        />

        <div className="w-full lg:w-64 lg:shrink-0 flex flex-col gap-3 order-3 lg:order-2">
          {subscriptionActive ? (
            <>
              {showTravelersSetup ? (
                <SubscriptionTravelersPromptCard />
              ) : (
                <>
                  <PlanTripCard />
                  <DestinationsExploreCard />
                </>
              )}
              <CollectionsCard />
              <SupportWhatsAppCard />
            </>
          ) : (
            <CirculoEvolvedCall />
          )}
        </div>
      </div>
    </div>
  );
}
