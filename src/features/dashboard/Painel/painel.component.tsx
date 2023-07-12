import { HeaderUserMenu, NoProfile, HasProfile } from "@/features";
import type { PainelProps } from "./painel.types";

import { makeCn } from "@/utils/helpers/css.helpers";
import { TravelerProfileType, TravelerState } from "@/core/types";
import { useAppStore } from "@/core/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
  
  const [noProfile, setNoProfile] = useState(false);
  const [travelerProfile, setTravelerProfile] = useState<TravelerProfileType>("relax");
  const [name, setName] = useState("");
  const router = useRouter();

  const hasTrip = travelerState.hasCurrentTrip || travelerState.hasPastTrip;
  const redirectToTrip = '/app/viagens';

  useEffect(() => {
    setNoProfile(!travelerState.travelerProfile);
    setTravelerProfile(!travelerState.travelerProfile ? "relax" : travelerState.travelerProfile);
    setName(travelerState.name);

    if (hasTrip)
    {
      router.replace(redirectToTrip);
    }
  }, [travelerState, hasTrip, router]);
  

  return (
    <div className={cn} {...props}>
      <HeaderUserMenu userName={name}>
        Te esperamos na sua próxima viagem
      </HeaderUserMenu>
      {noProfile ? <NoProfile /> : <HasProfile profileType={travelerProfile} />}
    </div>
  );
}
