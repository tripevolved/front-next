import { HeaderUserMenu, HasTrip, NoProfile, HasProfile } from "@/features";
import type { PainelProps } from "./painel.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TravelerApiService } from "@/services/api/traveler";
import { createTravelerStateSlice } from "@/core/store/traveler";
import { useAppStore } from "@/core/store";
import { TravelerState } from "@/core/types";

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

  const getView = (travelerState: TravelerState) => {
    return !travelerState.travelerProfile ? (
      <NoProfile />
    ) : travelerState.travelerProfile &&
      !travelerState.hasCurrentTrip &&
      !travelerState.hasPastTrip &&
      !travelerState.isActive ? (
      <HasProfile profileType="relax" />
    ) : travelerState.travelerProfile &&
      travelerState.hasCurrentTrip &&
      !travelerState.hasPastTrip &&
      !travelerState.isActive ? (
      <HasTrip />
    ) : null;
  };

  return (
    <div className={cn} {...props}>
      <HeaderUserMenu userName={mockTravelerState.noProfile.name}>
        Te esperamos na sua próxima viagem
      </HeaderUserMenu>
      {getView(mockTravelerState.noProfile)}
    </div>
  );
}
