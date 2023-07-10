import { useAppStore } from "@/core/store";
import { useState, useEffect } from "react";
import { TravelerProfileType } from "@/core/types";
import { ProfileBuilderSection } from "./traveler-profile-builder.section";
import { ProfileSection } from "./traveler-profile.section";

export const TripDiscoverPage = () => {
  const { travelerState } = useAppStore();

  const [noProfile, setNoProfile] = useState(false);
  const [travelerId, setTravelerId] = useState("");
  const [travelerProfile, setTravelerProfile] = useState<TravelerProfileType>("relax");

  useEffect(() => {
    setNoProfile(!travelerState.travelerProfile);
    setTravelerProfile(!travelerState.travelerProfile ? "relax" : travelerState.travelerProfile);
    setTravelerId(travelerState.id);
  }, [travelerState]);

  return (
    noProfile ? 
      <ProfileBuilderSection travelerId={travelerId} />
      : (
        <ProfileSection travelerProfile={travelerProfile} />
      )
  );
}
