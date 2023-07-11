import { EmptyState, GlobalLoader } from "@/ui";
import { useTripBuilder } from "./trip-builder.hook"
import { useState, useEffect } from "react";
import { useAppStore } from "@/core/store";
import { TripBuilderStartSection } from "./trip-builder-start.section";
import { TripGoalQuestions } from "../TripDiscoverPage/trip-goal-questions.section";
import { RegisterCity, TripConfigurationSet, CreateTrip } from "@/features";

type TripBuilderStep = "none" | "register-city" | "configuration" | "trip-goal" | "finish";

export const TripBuilderPage = () => {
  const { travelerState } = useAppStore();
  const { isLoading, data, error } = useTripBuilder();
  
  const [step, setStep] = useState<TripBuilderStep>("none");
  const [travelerId, setTravelerId] = useState("");
  
  useEffect(() => {
    setTravelerId(travelerState.id);
  }, [travelerState]);
  
  const setNextStep = (nextStep: TripBuilderStep) => {
    if (nextStep === "register-city" && travelerState.hasValidAddress) nextStep = "configuration";
    
    setStep(nextStep);
  };
  
  if (error) return <EmptyState />;
  if (isLoading) return <GlobalLoader />;
  
  const props = { destinationId: data?.id };
  const destination = data?.title!;
  
  if (step === "register-city") return (<RegisterCity travelerId={travelerId} onFinish={() => setNextStep("configuration")} />);
  if (step === "configuration") return (<TripConfigurationSet onSubmit={() => setNextStep("trip-goal")} />);
  if (step === "trip-goal") return (<TripGoalQuestions travelerId={travelerId} onSubmit={() => setNextStep("finish")} />);
  if (step === "finish") return (<CreateTrip redirectTo={`/app/viagens/criar/`} />);

  return (
    <TripBuilderStartSection destinationName={destination} onSubmit={() => setNextStep("register-city")} />);
}
