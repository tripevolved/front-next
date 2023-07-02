import { HeaderUserMenu, HasTrip, NoProfile, HasProfile, TripDetailsPainel } from "@/features";
import type { PainelProps } from "./painel.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TravelerState } from "@/core/types";
import { useAppStore } from "@/core/store";

type MockState = {
  noProfile: TravelerState;
  hasProfile: TravelerState;
  hasTrip: TravelerState;
  hasIncomingTrip: TravelerState;
  alreadyTraveled: TravelerState;
};

const mockTravelerState: MockState = {
  noProfile: {
    id: "3k2ujyg48773",
    name: "Mariana",
    travelerProfile: null,
    hasCurrentTrip: false,
    hasPastTrip: false,
    isActive: false,
    hasValidAddress: false,
  },
  hasProfile: {
    id: "3k2ujyg48773",
    travelerProfile: "aventureiro",
    name: "Mariana",
    hasCurrentTrip: false,
    hasPastTrip: false,
    isActive: false,
    hasValidAddress: false,
  },
  hasTrip: {
    id: "3k2ujyg48773",
    travelerProfile: "aventureiro",
    name: "Mariana",
    hasCurrentTrip: true,
    hasPastTrip: false,
    isActive: false,
    hasValidAddress: false,
  },
  hasIncomingTrip: {
    // trip-details-painel
    id: "3k2ujyg48773",
    travelerProfile: "aventureiro",
    name: "Mariana",
    hasCurrentTrip: true,
    hasPastTrip: false,
    isActive: true,
    hasValidAddress: false,
  },
  alreadyTraveled: {
    id: "3k2ujyg48773",
    travelerProfile: "aventureiro",
    name: "Mariana",
    hasCurrentTrip: true,
    hasPastTrip: true,
    isActive: true,
    hasValidAddress: false,
  },
};

export function Painel({ className, children, sx, ...props }: PainelProps) {
  const cn = makeCn("painel", className)(sx);

  const { travelerState } = useAppStore();

  console.log("ESTADO DO VIAJANTE", travelerState);

  const getView = (travelerState: TravelerState) => {
    const hasTrip = travelerState.hasCurrentTrip || travelerState.hasPastTrip;

    return !travelerState.travelerProfile ? (
      <NoProfile />
    ) : travelerState.travelerProfile && !hasTrip ? (
      <HasProfile profileType={travelerState.travelerProfile} />
    ) : <TripDetailsPainel />
    ; travelerState.travelerProfile &&
      hasTrip &&
      !travelerState.isActive ? (
      <HasTrip />
    ) : travelerState.travelerProfile &&
      travelerState.hasCurrentTrip &&
      !travelerState.hasPastTrip &&
      travelerState.isActive ? (
      <TripDetailsPainel />
    ) : null;
  };

  return (
    <div className={cn} {...props}>
      <HeaderUserMenu userName={travelerState.name}>
        Te esperamos na sua próxima viagem
      </HeaderUserMenu>
      {getView(travelerState)}
    </div>
  );
}
