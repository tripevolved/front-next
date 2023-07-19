import { useAppStore } from "@/core/store";
import { useState, useEffect } from "react";
import { TravelerProfileType } from "@/core/types";
import { ProfileBuilderSection } from "./traveler-profile-builder.section";
import { ProfileSection } from "./traveler-profile.section";
import { ProfileStartSection } from "./traveler-profile-start.section";
import { RegisterCity, TripConfigurationSet, CreateTrip, PageTrip, TripDiscoverSteps } from "@/features";
import { DestinationQuestions } from "./destination-questions.section";
import { TripGoalQuestions } from "./trip-goal-questions.section";
import { StepsProgressBar } from "@/ui";

type TripDiscoverStep = "none" | "build-profile" | "profile" | "register-city" | "destinations" | "configuration" | "trip-goal" | "finish";

export const TripDiscoverPage = () => {
  return (
    <PageTrip seo={{ title: "Descubra sua trip" }}>
      <TripDiscoverSteps />
    </PageTrip>
  )
}

const TripDiscoverSteps2 = () => {
  const { id, hasValidAddress, travelerProfile = "relax" } = useAppStore(state => state.travelerState);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [total, setTotal] = useState(10);

  return (
    <div className="trip-discover-steps">
      <StepsProgressBar position={currentIndex} total={total} />
    </div>
  )
}

const TripDiscoverPage2 = () => {
  const { travelerState } = useAppStore();

  const [step, setStep] = useState<TripDiscoverStep>("none");
  const [travelerId, setTravelerId] = useState("");
  const [travelerProfile, setTravelerProfile] = useState<TravelerProfileType>("relax");

  useEffect(() => {
    setTravelerProfile(!travelerState.travelerProfile ? "relax" : travelerState.travelerProfile);
    setTravelerId(travelerState.id);
  }, [travelerState]);

  const setNextStep = (nextStep: TripDiscoverStep) => {
    if (nextStep === "build-profile" && travelerState.travelerProfile) nextStep = "profile";
    if (nextStep === "register-city" && travelerState.hasValidAddress) nextStep = "destinations";

    setStep(nextStep);
  }

  if (step === "build-profile") return (<ProfileBuilderSection travelerId={travelerId} onSubmit={() => setNextStep("profile")} />);
  if (step === "profile") return (<ProfileSection travelerProfile={travelerProfile} onSubmit={() => setNextStep("register-city")} />);
  if (step === "register-city") return (<RegisterCity travelerId={travelerId} onFinish={() => setNextStep("destinations")} />);
  if (step === "destinations") return (<DestinationQuestions travelerId={travelerId} onSubmit={() => setNextStep("configuration")} />);
  if (step === "configuration") return (<TripConfigurationSet onSubmit={() => setNextStep("trip-goal")} />);
  if (step === "trip-goal") return (<TripGoalQuestions travelerId={travelerId} onSubmit={() => setNextStep("finish")} />);
  if (step === "finish") return (<CreateTrip redirectTo={"/app/viagens/descobrir/destinos/"} />);

  return (
    <ProfileStartSection
      title={!travelerState.travelerProfile ? undefined : "Descubra nossas recomendações de destinos!"}
      subtitle={!travelerState.travelerProfile ? undefined : "Vamos fazer algumas perguntas para entender o que você precisa e quer em sua viagem para construir tudo, personalizado para você."}
      onSubmit={() => setNextStep("build-profile")}
    />);
}
