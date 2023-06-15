import { HeaderUserMenu, NoProfile, PageApp } from "@/features";

type TempExempleState = {
  id: string;
  travelerProfile: null | string;
  hasCurrentTrip: boolean;
  hasPastTrip: boolean;
  isActive: boolean;
};

type MockState = {
  noProfile: TempExempleState;
  hasProfile: TempExempleState;
  hasTrip: TempExempleState;
  hasIncomingTrip: TempExempleState;
  alreadyTraveled: TempExempleState;
};

const mockTravelerState: MockState = {
  noProfile: {
    id: "3k2ujyg48773",
    travelerProfile: null,
    hasCurrentTrip: false,
    hasPastTrip: false,
    isActive: false,
  },
  hasProfile: {
    id: "3k2ujyg48773",
    travelerProfile: "aventureiro",
    hasCurrentTrip: false,
    hasPastTrip: false,
    isActive: false,
  },
  hasTrip: {
    id: "3k2ujyg48773",
    travelerProfile: "aventureiro",
    hasCurrentTrip: true,
    hasPastTrip: false,
    isActive: false,
  },
  hasIncomingTrip: {
    id: "3k2ujyg48773",
    travelerProfile: "aventureiro",
    hasCurrentTrip: true,
    hasPastTrip: false,
    isActive: true,
  },
  alreadyTraveled: {
    id: "3k2ujyg48773",
    travelerProfile: "aventureiro",
    hasCurrentTrip: true,
    hasPastTrip: true,
    isActive: true,
  },
};

export default function DashboardRoute() {
  return (
    <PageApp seo={{ title: "Painel" }}>
      <HeaderUserMenu userName="Mariana">Te esperamos na sua próxima viagem</HeaderUserMenu>
      <NoProfile />
    </PageApp>
  );
}
